import React from 'react';
import { useEthers } from '@usedapp/core';
import Button from '@mui/material/Button';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

const ConnectWalletButton = () => {
    const {activate} = useEthers();
    const activateProvider = async () => {
        const providerOptions = {
            injected: {
                display: {
                    name: 'Metamask',
                    description: 'Connect with the provider in your Browser',
                },
                package: null,
            },
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    bridge: 'https://bridge.walletconnect.org',
                    infuraId: '0f50585e04274bcf95af1213c883e09d',
                }
            }
        }

        const web3Modal = new Web3Modal({
            providerOptions,
        });

        try {
            const provider = await web3Modal.connect();
            await activate(provider);
        } catch (ex) {
            console.debug('User rejected');
        }
    }

    return (
        <Button onClick={activateProvider} variant="contained" color="secondary" sx={{ my: 1, mx: 2 }}>
            Connect wallet
        </Button>
    );
}

export default ConnectWalletButton;