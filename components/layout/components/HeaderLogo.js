import React from 'react'
import styled from 'styled-components';

const HeaderLogo = () => {
  return (
    <Logo>CrowF</Logo>
  )
}

const Logo = styled.h1`
  font-family: 'Russo One', sans-serif;
  font-weight: bold;
  font-size: 30px;
  margin-left: 10px;
`;

export default HeaderLogo;