import { Typography } from '@mui/material';
import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout';

const MintPage: NextPage = () => {
  return (
    <Layout>
        <Head>
            <title>Toon Survival | Mint</title>
            <meta name="description" content="Toon Survival NFT" />
        </Head>
        <Typography variant="h2" component="h2">
            Mint
        </Typography>
    </Layout>
  )
}

export default MintPage
