import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout';
import { MintContainer, MintCard } from '../styles/Mint.styled';
import { Button, Typography, TextField, Alert } from '@mui/material';
import React, {useState}  from "react";
import { BigNumber } from 'ethers';
import { useEthers } from '@usedapp/core';
import { getCurrentChainId } from '../helpers/Chain';
import { getToonSurvivalContract } from '../helpers/Contract';
import useCallMethod from '../hooks/useCallMethod';
import useMint from '../hooks/useMint';

const MintPage: NextPage = () => {
  const {account, chainId} = useEthers()
  const [amount, setAmount] = useState(1);
  const isInvalidChain = getCurrentChainId() !== chainId;
  const contract = getToonSurvivalContract(chainId);
  const totalSupply = (useCallMethod(contract, "totalSupply") || BigNumber.from(0)).toNumber();
  const maxSupply = (useCallMethod(contract, "maxSupply") || BigNumber.from(0)).toNumber();
  const cost = useCallMethod(contract, "cost") || BigNumber.from(0);
  const {mintState, mint} = useMint(contract);
  const mintStatus = mintState?.status;

  const handleAmountFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value));
  };

  const clickMint = () => {
    const costInWei = cost.mul(amount);

    mint(amount, {from: account, value: costInWei})
  }

  const getMintMessage = (status: string): string => {
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
    <Layout>
        <Head>
            <title>Toon Survival | Mint</title>
            <meta name="description" content="Toon Survival NFT" />
        </Head>
        {isInvalidChain && (
          <Alert severity="error">
            Unsupported Chain Id Error - Please check your chain Id.
          </Alert>
        )}

        <MintContainer>
          <MintCard>
            <Typography variant="h2" component="h2" color="secondary">
              {totalSupply}/{maxSupply}
            </Typography>
            <TextField defaultValue={1}
              sx={{margin: '1.25rem 0'}}
              InputProps={{ inputProps: { min: 1, max: 10 } }}
              hiddenLabel
              onChange={handleAmountFieldChange}
              variant="filled"
              size="small"
              type="number" />
            <Button onClick={clickMint} variant="contained" disabled={isInvalidChain}>
              Mint
            </Button>

            <Typography variant="body1" component="h6" color="secondary" sx={{marginTop: '1rem'}}>
              {getMintMessage(mintStatus)}
            </Typography>
          </MintCard>
        </MintContainer>
    </Layout>
  )
}

export default MintPage
