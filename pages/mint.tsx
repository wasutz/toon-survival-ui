import React, {useState}  from "react";
import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout';
import { MintContainer, FullWidthContainer, MintCard, MintButton } from '../styles/Mint.styled';
import { Typography, TextField, Grid, Snackbar } from '@mui/material';
import { BigNumber, utils, constants } from 'ethers';
import { useEthers } from '@usedapp/core';
import { getCurrentChainId } from '../helpers/Chain';
import { getToonSurvivalContract } from '../helpers/Contract';
import Whitelist from '../helpers/Whitelist';
import useCallMethod from '../hooks/useCallMethod';
import useMint from '../hooks/useMint';
import useWhitelistMint from '../hooks/useWhitelistMint';
import useDutchAuctionMint from '../hooks/useDutchAuctionMint';
import {Stages, getStageName} from '../helpers/Stages';
import {mapErrorMessage} from '../helpers/ErrorMessage';
import {Turnstile} from '@marsidev/react-turnstile'

const MintPage: NextPage = () => {
  const {account, chainId} = useEthers()
  const [amount, setAmount] = useState(1);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const isInvalidChain = Boolean(chainId && getCurrentChainId() !== chainId);
  const contract = getToonSurvivalContract();
  const totalSupply = (useCallMethod(contract, "totalSupply") || BigNumber.from(0)).toNumber();
  const maxSupply = (useCallMethod(contract, "maxSupply") || BigNumber.from(0)).toNumber();
  const maxMintAmount = (useCallMethod(contract, "maxMintAmount") || BigNumber.from(0)).toNumber();
  const maxMintAmountPerTx = (useCallMethod(contract, "maxMintAmountPerTx") || BigNumber.from(0)).toNumber();
  const cost = useCallMethod(contract, "cost") || BigNumber.from(0);
  const auctionCost = useCallMethod(contract, "dutchAuctionPrice") || BigNumber.from(0);
  const stage = useCallMethod(contract, "stage");
  const {mintState, mint, mintResetState} = useMint(contract);
  const {whitelistMintState, whitelistMint, whitelistResetState} = useWhitelistMint(contract);
  const {auctionMintState, auctionMint, auctionMintResetState} = useDutchAuctionMint(contract);
  const isWhitelistClaimed = useCallMethod(contract, "whitelistClaimed", [account || constants.AddressZero]);
  const isNotWhitelistOrAlreadyClaimed = account && Stages.PreSale === stage
    && (!Whitelist.contains(account) || isWhitelistClaimed);
  const isShowBackdrop = stage === undefined && !isInvalidChain;
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const getMintStatus = () => {
    if (Stages.PreSale === stage) {
      return whitelistMintState?.status;
    }

    if (Stages.DutchAuction === stage) {
      return auctionMintState?.status;
    }

    return mintState?.status;
  }

  const resetMintState = () => {
    if (Stages.PreSale === stage) {
      return whitelistResetState();
    }

    if (Stages.DutchAuction === stage) {
      return auctionMintResetState();
    }

    return mintResetState();
  };

  if (mintState.errorMessage) {
    setShowError(true);
    setErrorMessage(mapErrorMessage(mintState.errorMessage));
    resetMintState();
  }

  const handleAmountFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value));
  };

  const getCost = () => {
    if (Stages.DutchAuction === stage) {
      return auctionCost;
    }

    return cost;
  }

  const verifyTurnstile = async () => {
    try {
      if (!turnstileSiteKey) {
        return {
          json: () => {
            return {
              success: true
            }
          }
        }
      }

      return fetch('/api/verifyTurnstile', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: turnstileToken
        })
      })
    } catch (error) {
      return {
        json: () => {}
      };
    }
  }

  const clickMint = async () => {
    const costInWei = getCost().mul(amount);

    const response = await (await verifyTurnstile()).json();
    if (!response?.success) {
      setShowError(true);
      setErrorMessage('Invalid signature');
      resetMintState();
      return;
    }

    if (Stages.PreSale === stage) {
      const merkleProof = Whitelist.getProofForAddress(account || '');

      whitelistMint(amount, merkleProof, {from: account, value: costInWei});
    } else if (Stages.DutchAuction === stage) {
      auctionMint(amount, {from: account, value: costInWei});
    } else {
      mint(amount, {from: account, value: costInWei});
    }
  }

  const getMintMessage = (status: string): string => {
    if (!account) {
      return 'Please connect your wallet';
    }

    if (isNotWhitelistOrAlreadyClaimed) {
      return 'You are not in the whitelist or already claimed';
    }

    switch (status) {
      case 'PendingSignature':
        return 'Pending for signature';
      case 'Mining':
        return 'Minting...'
      case 'Success':
        return 'Mint successfully'
      default:
        return '';
    }
  }

  const onSuccessTurnStile = (token: string) => {
    setTurnstileToken(token);
  }

  return (
    <Layout showBackdrop={isShowBackdrop} isInvalidChain={isInvalidChain}>
      <Head>
          <title>Toon Survival | Mint</title>
          <meta name="description" content="Toon Survival NFT" />
      </Head>
      <FullWidthContainer>
        <MintContainer>
          <Grid container alignItems="center">
            <Grid item xs={12} md={6} className={'animate__animated animate__fadeInLeft'}>
              <Typography variant="h4" component="h4" color="secondary">
                Stage: {getStageName(stage)}
              </Typography>
              <Typography variant="h4" component="h4" color="secondary">
                Cost per NFT: {utils.formatEther(getCost())} ETH
              </Typography>
              <Typography variant="h4" component="h4" color="secondary">
                Max mint per address: {maxMintAmount}
              </Typography>
              <Typography variant="h4" component="h4" color="secondary">
                Max mint per transaction: {maxMintAmountPerTx}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{padding:"0 2.5rem"}}
              className={'animate__animated animate__fadeInRight'}>
              <MintCard>
                <Typography variant="h2" component="h2" color="secondary">
                  {totalSupply}/{maxSupply}
                </Typography>
                <TextField defaultValue={1}
                  sx={{margin: '1.25rem 0'}}
                  InputProps={{ inputProps: { min: 1, max: maxMintAmountPerTx } }}
                  hiddenLabel
                  onChange={handleAmountFieldChange}
                  variant="filled"
                  size="small"
                  type="number" />

                {turnstileSiteKey && (
                  <Turnstile siteKey={turnstileSiteKey} onSuccess={onSuccessTurnStile} />
                )}
                <MintButton onClick={clickMint} variant="contained"
                  disabled={isInvalidChain || Stages.Pasued === stage || !account || !stage
                    || isNotWhitelistOrAlreadyClaimed
                    || (turnstileSiteKey && !turnstileToken)}>
                  Mint
                </MintButton>

                <Typography variant="body1" component="h6" color="secondary" sx={{marginTop: '1rem'}}>
                  {getMintMessage(getMintStatus())}
                </Typography>
              </MintCard>
            </Grid>
          </Grid>
        </MintContainer>
        <Snackbar
          open={showError}
          autoHideDuration={3500}
          onClose={() => setShowError(false)}
          message={errorMessage}
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} />
      </FullWidthContainer>
    </Layout>
  )
}

export default MintPage
