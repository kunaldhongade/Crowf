import React from 'react';
import styled from 'styled-components';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';
import { App } from '../Layout'
import { useContext } from 'react';
import Wallet from './Wallet.js'


const HeaderRight = () => {
    const ThemeToggler = useContext(App);

    return (
        <HeaderRightWrapper>
            <Wallet />
            <ThemeToggle>
                {ThemeToggler.theme === 'light' ? <NightsStayIcon onClick={ThemeToggler.changeTheme} /> : <LightModeIcon onClick={ThemeToggler.changeTheme} />}

            </ThemeToggle>
        </HeaderRightWrapper>
    )
}

const HeaderRightWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
    height: 50%;
`;

const ThemeToggle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.bgDiv};
    padding: 5px;
    height: 40px;
    width: 45px; 
    border-radius: 12px;
    cursor: pointer;
`;

export default HeaderRight;