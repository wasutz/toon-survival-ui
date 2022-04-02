import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from "next-themes";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../utility/createEmotionCache';
import MUIThemeProvider from '../components/MUIThemeProvider';
import Head from "next/head";
import { DAppProvider, Mainnet, Rinkeby } from '@usedapp/core';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();
const CURRENT_CHAIN = process.env.REACT_APP_CHAIN;
const isMainnet = CURRENT_CHAIN?.toLowerCase() === Mainnet.chainName.toLowerCase();

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <ThemeProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <DAppProvider config={{
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