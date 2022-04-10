import { useContractFunction } from "@usedapp/core"
import { Contract } from '@ethersproject/contracts'

const useWhitelistMint = (contract: Contract) => {
    const {state, send, resetState} = useContractFunction(
        contract,
        'whitelistMint',
        { transactionName: 'Whitelist Mint'}
    );

   return {whitelistMintState: state, whitelistMint: send, whitelistResetState: resetState};
}

export default useWhitelistMint