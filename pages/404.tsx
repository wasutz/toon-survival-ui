import { Typography, Box } from '@mui/material';
import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout';

const Custom404: NextPage = () => {
  return (
    <Layout>
        <Head>
            <title>Toon Survival | 404</title>
            <meta name="description" content="Toon Survival NFT 404 page" />
        </Head>
        <Box sx={{
            display: 'flex',
            height: '85vh',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems:'center'
        }}>
          <Typography variant="h4" component="h1">
            404 - This page could not be found.
          </Typography>
        </Box>
    </Layout>
  )
}

export default Custom404
