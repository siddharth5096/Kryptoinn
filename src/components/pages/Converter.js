import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Converter.css'
function Converter() {
    const [coinDropDown,setCoinDropDown]=useState([])
    const [fromCoin,setFromCoin]=useState('Select From')
    const [endCoin,setEndCoin]=useState('Select To')
    const [fromValue,setFromValue]=useState(0)
    const [toValue,setToValue]=useState(0)
    const [loading1,setLoading1]=useState(false)
    const [loading2,setLoading2]=useState(false)
    const [fromInput,setFromInput]=useState('')
    const [result,setResult]=useState('')
    const [converted,setConverted]=useState(false)

    useEffect(()=>{
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=150&page=1&sparkline=false')
        .then((coinData)=>{
            var coinDetails=coinData.data
            console.log(coinDetails)
            var data=[]
            coinDetails.forEach((coin)=>{
                var item={}
                item.id=coin.id
                item.name=coin.name
                data.push(item)
            })
            console.log(data)
            setCoinDropDown(data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const getFromValue=(value)=>{
        setConverted(false)
        setLoading1(true)
        axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${value}&vs_currencies=inr`)
        .then((response)=>{
            console.log(response.data)
            var price=response.data[value].inr
            console.log(price)
            setFromValue(price)
        })
        setLoading1(false)
    }

    const getToValue=(value)=>{
        setConverted(false)
        setLoading2(true)
        axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${value}&vs_currencies=inr`)
        .then((response)=>{
            var price=response.data[value].inr
            setToValue(price)
        })
        setLoading2(false)
    }

    const getResult=()=>{
        console.log(fromCoin,endCoin)
        console.log(fromValue,toValue)
        var result=(fromValue*parseFloat(fromInput))/toValue
        console.log(result)
        setConverted(true)
        setResult(result.toFixed(2))
    }

    return (
        <div className='converter'>
            <select value={fromCoin} onChange={(e)=>{
                setFromCoin(e.target.value)
                getFromValue(e.target.value)
            }} >
                <option value={'Select From'} hidden>Select From</option>
                {
                  coinDropDown.map((coin,index)=>(
                      <option key={index} value={coin.id}>{coin.name}</option>
                  ))  
                }
            </select>
            <input type='text' value={fromInput} onChange={(e)=>{
                setFromInput(e.target.value)
            }}/>
            <select value={endCoin} onChange={(e)=>{
                setEndCoin(e.target.value)
                getToValue(e.target.value)
            }}>
                <option value={'Select To'} hidden>Select To</option>

                {
                  coinDropDown.map((coin,index)=>(
                      <option key={index} value={coin.id}>{coin.name}</option>
                  ))  
                }
            </select>
            <button disabled={(loading1 && loading2)?true:false} onClick={getResult}>Convert</button>
            {
                converted && <h1>{fromInput}{fromCoin}={result}{endCoin}</h1>
            }
            </div>
    )
}

export default Converter
