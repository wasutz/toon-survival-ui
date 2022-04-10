const mapErrorMessage = (errorMessage: string) => {
    if (errorMessage.startsWith('err: insufficient funds')) {
        return  'You have insufficient funds, please check your wallet';
    }

    if (errorMessage === 'MetaMask Tx Signature: User denied transaction signature.') {
        return 'User rejected the transaction';
    }

    return 'Something went wrong';
}

export {mapErrorMessage};