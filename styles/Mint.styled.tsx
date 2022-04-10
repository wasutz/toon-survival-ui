import styled from '@emotion/styled';
import { Container, Backdrop } from '@mui/material';

const MintContainer = styled(Container)`
    min-height: calc(100vh - 70px);
    width: 100%;
    flex: 1;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
`

const FullWidthContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

const MintCard = styled.section(({theme}) => {
    return {
        borderRadius: '25px',
        border: `5px solid ${theme.palette.secondary.main}`,
        color: '#fff',
        padding: '2.5rem 3.5rem',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    };
});

const MintBackdrop = styled(Backdrop)(({theme}) => {
    return {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.common.white,
        position: 'absolute'
    };
});

export {MintContainer, FullWidthContainer, MintCard, MintBackdrop};