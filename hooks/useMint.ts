import { useContractFunction } from "@usedapp/core"
import { Contract } from '@ethersproject/contracts'

const useMint = (contract: Contract) => {
    const {state, send} = useContractFunction(
        contract,
        'mint',
        { transactionName: 'Mint'}
    );

   return {mintState: state, mint: send};
}

export default useMint