import { Typography, Box } from '@mui/material';
import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout';
import QuestionAccordion from '../components/QuestionAccordion';
import {FaqContainer} from '../styles/Faq.styled';

const FaqPage: NextPage = () => {
  return (
    <Layout>
        <Head>
            <title>Toon Survival | FAQ</title>
            <meta name="description" content="Toon Survival NFT" />
        </Head>
        <FaqContainer maxWidth={'md'}>
          <Typography variant="h2" component="h1">
            FAQ
          </Typography>
          <Box sx={{margin: {xs: "1rem"}}}>
            <QuestionAccordion
              question={"When does minting begin?"}
              answer="Initial distribution will begin on April 30, 2022 at 3:00 PM UTC." />
            <QuestionAccordion
              question={"Who can mint?"}
              answer="Anyone" />
            <QuestionAccordion
              question={"What does it cost?"}
              answer="0.1 ETH" />
            <QuestionAccordion
              question={"Where can I will my NFTs?"}
              answer="Just simply connect to your OpenSea account to view your NFTs." />
            <QuestionAccordion
              question={"Why did you make this?"}
              answer="ToonSurvival unlocks the next chapter for our community
              and we believe that this collection will be the one of the best collectible items" />
          </Box>
        </FaqContainer>
    </Layout>
  )
}

export default FaqPage
