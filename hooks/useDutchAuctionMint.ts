import { useContractFunction } from "@usedapp/core"
import { Contract } from '@ethersproject/contracts'

const useDucthAuctionMint = (contract: Contract) => {
    const {state, send, resetState} = useContractFunction(
        contract,
        'dutchAuctionMint',
        { transactionName: 'Dutch Auction Mint'}
    );

   return {auctionMintState: state, auctionMint: send, auctionMintResetState: resetState};
}

export default useDucthAuctionMint;