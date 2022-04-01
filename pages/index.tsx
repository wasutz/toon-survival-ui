import { Container, Typography, Grid } from '@mui/material';
import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout';
import HeroImage from '../components/HeroImage';
import {HeroSection, JoinButton, GreyText}  from '../styles/Home.styled';
import Typewriter from 'typewriter-effect';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Toon Survival</title>
        <meta name="description" content="Toon Survival NFT" />
      </Head>
      <HeroSection>
        <Container>
          <Grid container alignItems="center">
            {/* Image for mobile */}
            <Grid item xs={12} md={6} textAlign={"center"} sx={{ display: { xs: 'block', md: 'none', lg: 'none' } }}>
              <HeroImage width={256} height={264}/>
            </Grid>
            <Grid item xs={12} md={6} sx={{textAlign: {xs: 'center', md: 'left'}}}>
              <Typography variant="h2" component="h2" sx={{fontSize: {lg: 45, md: 39, xs: 33}}}>
                A new wave of
              </Typography>
              <Typography variant="h2" component="h2" color="secondary" sx={{fontSize: {lg: 45, md: 39, xs: 33}}}>
                <Typewriter
                    options={{
                      strings: ['NFTS', 'COLLECTIBLES'],
                      autoStart: true,
                      loop: true,
                    }}
                  />
              </Typography>
              <Typography variant="h2" component="h2" sx={{fontSize: {lg: 45, md: 39, xs: 33}}}>
                is about to hit the blockchain.
              </Typography>
              <GreyText>
                Let&apos;s join our community
              </GreyText>
              <JoinButton size="large" variant="contained" color="secondary">Join Discord</JoinButton>
            </Grid>

            {/* Image for desktop */}
            <Grid item xs={12} md={6}	textAlign={"center"} sx={{ display: { xs: 'none', md: 'block', lg: 'block' } }}>
              <HeroImage width={384} height={392} />
            </Grid>
          </Grid>
        </Container>
      </HeroSection>
    </Layout>
  )
}

export default HomePage
