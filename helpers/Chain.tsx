import { Mainnet, Goerli } from '@usedapp/core';

const getCurrentChainId = (): number => {
    const CURRENT_CHAIN = process.env.NEXT_PUBLIC_CHAIN;
    const isMainnet = CURRENT_CHAIN?.toLowerCase() === Mainnet.chainName.toLowerCase();

    return isMainnet ? Mainnet.chainId : Goerli.chainId;
}

export {getCurrentChainId};