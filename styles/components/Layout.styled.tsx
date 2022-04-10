import styled from '@emotion/styled';
import { Box, Backdrop } from '@mui/material';

const MyContainr = styled(Box)`
    position: relative;
    width: 100%;
    height: 100%;
`

const MyBackdrop = styled(Backdrop)(({theme}) => {
    return {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.common.white,
        position: 'absolute'
    };
});

export {MyContainr, MyBackdrop};