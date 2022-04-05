import { Mainnet } from '@usedapp/core';
import Config from '../configs/Config';
import { Contract } from '@ethersproject/contracts';
import { utils } from 'ethers';
import ToonSurvival from '../abi/ToonSurvival.json';

const getContractAddress = (chainId?: number): string => {
    const isMainnet = Mainnet.chainId === chainId;
    const {address} = Config;

    return isMainnet ? address.mainnet : address.rinkeby;
}

const getToonSurvivalContract = (chainId?: number): Contract => {
    const tsvInterface = new utils.Interface(ToonSurvival.abi)
    const contractAddress = getContractAddress(chainId);

    return new Contract(contractAddress, tsvInterface)
}

export {getContractAddress, getToonSurvivalContract};