import { Typography, Box, Grid } from '@mui/material';
import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout';
import { MyItemsContainer, NoItemsText, Progress } from '../styles/MyItems.styled';
import { BigNumber, constants} from 'ethers';
import { useEthers } from '@usedapp/core';
import { getCurrentChainId } from '../helpers/Chain';
import { getToonSurvivalContract } from '../helpers/Contract';
import useCallMethod from '../hooks/useCallMethod';
import NftItem from '../components/NftItem';

const MyItemsPage: NextPage = () => {
    const {account, chainId} = useEthers();
    const isInvalidChain = Boolean(chainId && getCurrentChainId() !== chainId);
    const contract = getToonSurvivalContract();
    const tokenIds = useCallMethod(contract, "walletOfOwner", [account || constants.AddressZero]);

    return (
        <Layout isInvalidChain={isInvalidChain}>
            <Head>
                <title>Toon Survival | My Items</title>
                <meta name="description" content="Toon Survival Items" />
            </Head>
            <MyItemsContainer maxWidth={'md'} className={'animate__animated animate__fadeIn'}>
                <Typography variant="h2" component="h1">
                    My Items
                </Typography>
                {!tokenIds && (
                    <Progress />
                )}
                {tokenIds?.length <= 0 && (
                    <NoItemsText variant="h5">
                        You don&apos;t have any items
                    </NoItemsText>
                )}
                <Box mt={2}>
                    <Grid container alignItems="center">
                        {tokenIds && tokenIds.map((tokenId: BigNumber) => (
                            <Grid item xs={12} md={4} key={tokenId.toNumber()}>
                                <NftItem
                                    contract={contract}
                                    tokenId={tokenId.toNumber()} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </MyItemsContainer>
        </Layout>
    )
}

export default MyItemsPage
