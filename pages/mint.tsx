import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout';
import { MintContainer, MintCard } from '../styles/Mint.styled';
import { Button, Typography, TextField, Alert } from '@mui/material';
import React, {useState}  from "react";
import { utils, BigNumber } from 'ethers';
import { useEthers } from '@usedapp/core';
import { getCurrentChainId } from '../helpers/Chain';
import { getToonSurvivalContract } from '../helpers/Contract';
import useContractMethod from '../hooks/useContractMethod';

const MintPage: NextPage = () => {
  const {account, chainId} = useEthers()
  const [amount, setAmount] = useState(1);
  const isInvalidChain = getCurrentChainId() !== chainId;
  const contract = getToonSurvivalContract(chainId);
  const totalSupply = (useContractMethod(contract, "totalSupply") || BigNumber.from(0)).toNumber();
  const maxSupply = (useContractMethod(contract, "maxSupply") || BigNumber.from(0)).toNumber();
  const cost = utils.formatEther(useContractMethod(contract, "cost") || 0);

  const handleAmountFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value));
  };

  const mint = () => {
    console.log(`Mint amount: ${amount} with cost: ${cost} by account ${account}`)
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
            <Button onClick={mint} variant="contained" disabled={isInvalidChain}>
              Mint
            </Button>
          </MintCard>
        </MintContainer>
    </Layout>
  )
}

export default MintPage
