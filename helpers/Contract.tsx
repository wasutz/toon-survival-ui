import { Mainnet } from '@usedapp/core';
import Config from '../configs/Config';

const getContractAddress = (chainId?: number): string => {
    const isMainnet = Mainnet.chainId === chainId;
    const {address} = Config;

    return isMainnet ? address.mainnet : address.rinkeby;
}

export {getContractAddress};