import React, {useState}  from "react";
import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout';
import { MintContainer, FullWidthContainer, MintCard } from '../styles/Mint.styled';
import { Button, Typography, TextField, Grid, Snackbar } from '@mui/material';
import { BigNumber, utils } from 'ethers';
import { useEthers } from '@usedapp/core';
import { getCurrentChainId } from '../helpers/Chain';
import { getToonSurvivalContract } from '../helpers/Contract';
import Whitelist from '../helpers/Whitelist';
import useCallMethod from '../hooks/useCallMethod';
import useMint from '../hooks/useMint';
import useWhitelistMint from '../hooks/useWhitelistMint';
import {Stages, getStageName} from '../helpers/Stages';
import {mapErrorMessage} from '../helpers/ErrorMessage';

const MintPage: NextPage = () => {
  const {account, chainId} = useEthers()
  const [amount, setAmount] = useState(1);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isInvalidChain = getCurrentChainId() !== chainId;
  const contract = getToonSurvivalContract(chainId);
  const totalSupply = (useCallMethod(contract, "totalSupply") || BigNumber.from(0)).toNumber();
  const maxSupply = (useCallMethod(contract, "maxSupply") || BigNumber.from(0)).toNumber();
  const maxMintAmount = (useCallMethod(contract, "maxMintAmount") || BigNumber.from(0)).toNumber();
  const maxMintAmountPerTx = (useCallMethod(contract, "maxMintAmountPerTx") || BigNumber.from(0)).toNumber();
  const cost = useCallMethod(contract, "cost") || BigNumber.from(0);
  const stage = useCallMethod(contract, "stage");
  const {mintState, mint, mintResetState} = useMint(contract);
  const {whitelistMintState, whitelistMint, whitelistResetState} = useWhitelistMint(contract);
  const mintStatus = Stages.PreSale === stage ? whitelistMintState?.status : mintState?.status;
  const isWhitelistClaimed = useCallMethod(contract, "whitelistClaimed", [account || '']);
  const isNotWhitelistOrAlreadyClaimed = account && Stages.PreSale === stage
    && (!Whitelist.contains(account) || isWhitelistClaimed);

  if (mintState.errorMessage) {
    setShowError(true);
    setErrorMessage(mapErrorMessage(mintState.errorMessage));
    Stages.PreSale === stage ? whitelistResetState() : mintResetState();
  }

  const handleAmountFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value));
  };

  const clickMint = () => {
    const costInWei = cost.mul(amount);

    if (Stages.PreSale === stage) {
      const merkleProof = Whitelist.getProofForAddress(account || '');

      whitelistMint(amount, merkleProof, {from: account, value: costInWei});
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

  return (
    <Layout showBackdrop={!stage} isInvalidChain={isInvalidChain}>
      <Head>
          <title>Toon Survival | Mint</title>
          <meta name="description" content="Toon Survival NFT" />
      </Head>
      <FullWidthContainer>
        <MintContainer>
          <Grid container alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h4" color="secondary">
                Stage: {getStageName(stage)}
              </Typography>
              <Typography variant="h4" component="h4" color="secondary">
                Cost per NFT: {utils.formatEther(cost)} ETH
              </Typography>
              <Typography variant="h4" component="h4" color="secondary">
                Max mint per address: {maxMintAmount}
              </Typography>
              <Typography variant="h4" component="h4" color="secondary">
                Max mint per transaction: {maxMintAmountPerTx}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{padding:"0 1.5rem"}}>
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
                <Button onClick={clickMint} variant="contained"
                  disabled={isInvalidChain || Stages.Pasued === stage || !account || !stage
                    || isNotWhitelistOrAlreadyClaimed}>
                  Mint
                </Button>

                <Typography variant="body1" component="h6" color="secondary" sx={{marginTop: '1rem'}}>
                  {getMintMessage(mintStatus)}
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
