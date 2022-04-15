import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from "next-themes";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'animate.css';

import createEmotionCache from '../utility/createEmotionCache';
import MUIThemeProvider from '../components/MUIThemeProvider';
import Head from "next/head";
import { DAppProvider, Mainnet, Rinkeby } from '@usedapp/core';
import { getDefaultProvider } from 'ethers'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();
const CURRENT_CHAIN = process.env.NEXT_PUBLIC_CHAIN;
const isMainnet = CURRENT_CHAIN?.toLowerCase() === Mainnet.chainName.toLowerCase();

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <ThemeProvider defaultTheme={'light'}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <DAppProvider config={{
          readOnlyChainId: isMainnet ? Mainnet.chainId : Rinkeby.chainId,
          readOnlyUrls: {
            [Mainnet.chainId]: process.env.NEXT_PUBLIC_MAINNET_NODE || getDefaultProvider('mainnet'),
            [Rinkeby.chainId]: process.env.NEXT_PUBLIC_RINKEBY_NODE || getDefaultProvider('rinkeby')
          },
          networks: [isMainnet ? Mainnet : Rinkeby]
        }}>
          <MUIThemeProvider>
            <Component {...pageProps} />
          </MUIThemeProvider>
        </DAppProvider>
      </CacheProvider>
    </ThemeProvider>
  );
};

export default MyApp;