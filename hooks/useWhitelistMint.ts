import { useContractFunction } from "@usedapp/core"
import { Contract } from '@ethersproject/contracts'

const useWhitelistMint = (contract: Contract) => {
    const {state, send} = useContractFunction(
        contract,
        'whitelistMint',
        { transactionName: 'Whitelist Mint'}
    );

   return {whitelistMintState: state, whitelistMint: send};
}

export default useWhitelistMint