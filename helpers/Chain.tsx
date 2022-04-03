import { Mainnet, Rinkeby } from '@usedapp/core';

const getCurrentChainId = (): number => {
    const CURRENT_CHAIN = process.env.REACT_APP_CHAIN;
    const isMainnet = CURRENT_CHAIN?.toLowerCase() === Mainnet.chainName.toLowerCase();

    return isMainnet ? Mainnet.chainId : Rinkeby.chainId;
}

export {getCurrentChainId};