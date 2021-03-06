import { useCall } from "@usedapp/core"
import { Contract } from '@ethersproject/contracts'

const useCallMethod = (contract: Contract, method: string, args: any[] = []) => {
   const { value } = useCall({
        contract,
        method,
        args
   }) ?? {}

   return value?.[0];
}

export default useCallMethod