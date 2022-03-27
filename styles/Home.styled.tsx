import styled from '@emotion/styled';
import { Button } from '@mui/material';

const HeroSection = styled.section`
    min-height: calc(100vh - 70px);
    width: 100%;
    flex: 1;
    display: flex;
`

const JoinButton =  styled(Button)`
    border-radius: 25px;
    margin: 1rem 0;
    padding: 0.75rem 1.5rem;
`

export {HeroSection, JoinButton};