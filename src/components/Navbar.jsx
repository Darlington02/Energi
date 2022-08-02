import React, { useState } from 'react'
import styled from "styled-components"
import logo from "../images/logo.svg"

import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./pageThemes/GlobalStyles";
import { lightTheme, darkTheme } from "./pageThemes/Themes"

const Navbar = () => {

  const [theme, setTheme] = useState('dark');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <div>
    <GlobalStyles/>
        <Container>
            <First>
                <img src={logo} width="150" alt="" />
                <a href="https://app.energiswap.exchange/#/swap" target="_blank">Swap</a>
                <a href="https://app.energiswap.exchange/#/pool" target="_blank">Pool</a>
                <a href="https://app.energiswap.exchange/#/ref" target="_blank">Affiliate</a>
                <a href="https://app.energiswap.exchange/#/farming" target="_blank">Farming</a>
                <a href="https://info.energiswap.exchange/" target="_blank">Analytics</a>
                <a href="https://bridge.energi.network/" target="_blank">Bridge</a>
            </First>
            
            <Second>
                <i class="fas fa-sun" onClick={themeToggler}></i>
            </Second>
        </Container>
    </div>
    </ThemeProvider>
  )
}

export default Navbar

const Container = styled.div `
    display: flex;
    background: rgb(33,33,33);
    height: 40px;
    justify-content: space-between;
    color: white;
    align-items: center;
    padding: 20px;

    a {
        text-decoration: none;
        color: whitesmoke;
    }

    @media (max-width: 670px) {
        a {
            display: none;
        }
    }
`

const First = styled.div `
    display: flex;
    align-items: center;
    
    img {
        margin-right: 30px;
    }

    a {
        margin-right: 10px;
    }
`

const Second = styled.div `
    button {
        background: #00AA58;
        border-radius: 7px;
        padding: 10px;
        margin-right: 15px;
        border: none;
    }

    i {
        cursor: pointer;
    }
`