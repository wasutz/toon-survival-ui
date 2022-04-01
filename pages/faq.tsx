import { Typography } from '@mui/material';
import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout';

const FaqPage: NextPage = () => {
  return (
    <Layout>
        <Head>
            <title>Toon Survival | FAQ</title>
            <meta name="description" content="Toon Survival NFT" />
        </Head>
        <Typography variant="h2" component="h2">
            FAQ
        </Typography>
    </Layout>
  )
}

export default FaqPage
