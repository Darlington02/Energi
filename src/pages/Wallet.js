import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import Web3Modal from "web3modal"
import { ethers, providers } from 'ethers'
import Currency from 'react-currency-formatter';

import metamask from "../images/metamask.png"
import MiniNavbar from "../components/MiniNavbar"
import energi from '../images/icons/NRG.svg'

const Wallet = () => {

    // set states
    const [web3Modal, setWeb3Modal] = useState(null)
    const [address, setAddress] = useState("")
    const [balance, setBalance] = useState("")
    const [ energiPrice, setEnergiPrice ] = useState("")

    //  fetch json data
    useEffect(() => {
        const fetchData = async () => {
        const response = await fetch(
            `https://api.energiswap.exchange/v1/assets`,
            {
            method: "GET",
            }
        );

        const data = await response.json();
        const energiPrice = data["0xA55F26319462355474A9F2c8790860776a329aA4"]["last_price"]

        setEnergiPrice(energiPrice)
        console.log(data)
        };

        fetchData()

    }, [])

    // fetch and set web3modal state
    useEffect(() => {
        const newWeb3Modal = new Web3Modal({
            cacheProvider: true
        });
    
        setWeb3Modal(newWeb3Modal)
    }, [])

    // connect wallet 
    async function connectWallet() {
        const provider = await web3Modal.connect();
        const ethersProvider = new providers.Web3Provider(provider)
        const userAddress = await ethersProvider.getSigner().getAddress()
        setAddress(userAddress)
        const userBalance = await ethersProvider.getBalance(userAddress)
        const accountBalance = ethers.utils.formatEther(userBalance)
        setBalance(accountBalance)
    }

    // connect automatically and without a popup if user is already connected
    useEffect(() => {
        if(web3Modal && web3Modal.cachedProvider){
          connectWallet()
        }
    }, [web3Modal])
    
    // convert account balance to USD
    const priceInUsd = energiPrice * balance

  return (
    <Container>
        <MiniNavbar />

        <Section>
            {
                address ? 
                <Account>
                    <div className="address">
                        <p>Address: {address.slice(0, 8)}...{address.slice(30)}</p>
                    </div>
                    
                    <div className="balance">
                        <div className="amount">
                            <img src={energi} alt="Energi" />
                            <p>{balance} NRG</p>
                        </div>

                        <div className="amountInUSD">
                            <h3>
                                <Currency
                                    quantity={priceInUsd}
                                    currency="USD"
                                    decimalScale={2}
                                />
                            </h3>
                        </div>
                    </div>
                </Account>
                :
                    <>
                        <img src={metamask} alt="metamask" />
                        <button onClick={connectWallet}>Wallet connect</button>
                    </>
            }
        </Section>
    </Container>
  )
}

export default Wallet

const Container = styled.div `
    display: flex;
    margin-top: 70px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Section = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid rgb(33,33,33);
    border-radius: 15px;
    height: 60vh;
    width: 85vw;
    margin-top: 20px;

    img {
        margin-top: 50px;
        width: 200px;
    }

    button {
        width: 200px;
        height: 45px;
        background: #00AA58;
        border-radius: 7px;
        padding: 10px;
        margin-right: 15px;
        border: none;
        cursor: pointer;
    }
`

const Account = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 70%;
    
    .address, .balance {
        border: 2px solid #00AA58;
        border-radius: 10px;
        padding: 10px;
        margin-top: 20px;
    }

    .balance {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        .amount {
            display: flex;
            align-items: center;
            justify-content center;

            img {
                width: 40px;
                margin-right: 15px;
            }

            p{
                font-size: 30px;
                margin-top: 4.5rem;
            }
        }
    }

`