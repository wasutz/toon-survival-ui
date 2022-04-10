import Navbar from './Navbar'
import { FC } from "react";
import { MyContainr, MyBackdrop } from '../styles/components/Layout.styled';
import { Alert, CircularProgress } from '@mui/material';

const Layout: FC<{
    children: React.ReactNode,
    showBackdrop?: boolean,
    isInvalidChain?: boolean
}> = ({ children, showBackdrop = false, isInvalidChain = false}) => {
    return (
        <>
            <Navbar />
            <MyContainr>
                {isInvalidChain && (
                    <Alert severity="error">
                        Unsupported Chain Id Error - Please check your chain Id.
                    </Alert>
                )}
                {children}
                <MyBackdrop open={showBackdrop}>
                    <CircularProgress color="inherit" size={56} thickness={4} />
                </MyBackdrop>
            </MyContainr>
        </>
    );
}

export default Layout;