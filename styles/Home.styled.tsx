import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';

const HeroSection = styled.section`
    min-height: calc(100vh - 70px);
    width: 100%;
    flex: 1;
    display: flex;
    position: relative;
    align-items: center;
`

const JoinButton =  styled(Button)`
    border-radius: 25px;
    margin: 1rem 0;
    padding: 0.75rem 1.5rem;
`

const GreyText = styled(Typography)`
    color: #78909c;
    margin: 1rem 0;
    font-size: 1.25rem;
`

export {HeroSection, JoinButton, GreyText};