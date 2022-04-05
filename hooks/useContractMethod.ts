import { useCall } from "@usedapp/core"
import { Contract } from '@ethersproject/contracts'

const useContractMethod = (contract: Contract, method: string) => {
   const { value } = useCall({
        contract,
        method,
        args: []
   }) ?? {}

   return value?.[0];
}

export default useContractMethod