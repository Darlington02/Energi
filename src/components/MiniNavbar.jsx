import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom"

const MiniNavbar = () => {
  return (
    <div>
        <Content>
            <Navigation>
                <Link to="/">
                    <button id="name">Home</button>
                </Link>
                <Link to="/wallet">
                    <button id="wallet">Wallet</button>
                </Link>
            </Navigation>
        </Content>
    </div>
  )
}

export default MiniNavbar

const Content = styled.div `
    display: flex;
    align-items: center;
    
    p {
        font-weight: bold;
        margin: 20px 10px 10px 10px;
        color: green;
        cursor: pointer;
    }
`

const Navigation = styled.div `
    display: flex;
    flex-direction: row;

    button {
      width: 200px;
      height: 45px;
      justify-content: flex-end;
      border-radius: 7px;
      padding: 10px;
      margin-right: 15px;
      border: none;
      cursor: pointer;
  }

  #wallet {
    background: #00AA58;
  }

  #home {
    background: whitesmoke;
  }
`