import styled from '@emotion/styled';
import { Container, Typography, CircularProgress } from '@mui/material';

const MyItemsContainer = styled(Container)`
    text-align: center;
    margin-top: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`

const NoItemsText = styled(Typography)`
    color: grey;
    margin-top: 3.5rem;
`

const Progress = styled(CircularProgress)`
    margin-top: 5rem;
`

export {MyItemsContainer, NoItemsText, Progress};