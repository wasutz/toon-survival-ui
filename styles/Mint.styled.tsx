import styled from '@emotion/styled';
import { Container, Card } from '@mui/material';

const MintContainer = styled(Container)`
    min-height: calc(100vh - 70px);
    width: 100%;
    flex: 1;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
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

export {MintContainer, MintCard};