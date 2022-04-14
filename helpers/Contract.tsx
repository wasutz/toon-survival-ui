import { Contract } from '@ethersproject/contracts';
import { utils, constants } from 'ethers';
import ToonSurvival from '../abi/ToonSurvival.json';

const getToonSurvivalContract = (): Contract => {
    const tsvInterface = new utils.Interface(ToonSurvival.abi)
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || constants.AddressZero;

    return new Contract(contractAddress, tsvInterface)
}

export {getToonSurvivalContract};