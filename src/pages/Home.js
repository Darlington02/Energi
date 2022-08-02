import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import Currency from 'react-currency-formatter';

import MiniNavbar from '../components/MiniNavbar'

const Home = () => {

  const [ data, setData ] = useState("")
  useEffect(() => {

    //  fetch json data
    const fetchData = async () => {
      const response = await fetch(
        `https://api.energiswap.exchange/v1/assets`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      setData(data)
      console.log(data)
    };

    fetchData()

  }, [])

  // convert json object to an array
  const arr = []
  Object.keys(data).forEach(key => arr.push({key: key, value: data[key]}))
  
  return (
   <div>
     <Container>
      <MiniNavbar />
    
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Symbol</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {arr.sort((a, b) => a.value.last_price < b.value.last_price ? 1 : -1).map(item =>
                  <tr>
                    <td>{item.value.name}</td>
                    <td>{item.value.symbol}</td>
                    <td>
                      <Currency
                        quantity={item.value.last_price}
                        currency="USD"
                        decimalScale={2}
                      />
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
    </Container>
   </div>
  )
}

export default Home


const Container = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;

    table, td{
      border: 1px solid green;
    }

    table {
      width: 85vw;
      margin-top: 20px;
      border-radius: 20px;
    }

    td, th {
      padding: 20px;
    }
`