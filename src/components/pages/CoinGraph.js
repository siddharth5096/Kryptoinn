import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './CoinGraph.css'
import { Line } from 'react-chartjs-2';
function CoinGraph() {
    let {id}=useParams()
   const [graphData,setGraphData]=useState([])
    useEffect(()=>{
        axios.get(`https://api.coingecko.com/api/v3/coins/${id.toLowerCase()}/market_chart?vs_currency=inr&days=15`)
        .then(response=>{
            console.log(response.data.prices)
            var prices=response.data.prices
           
            console.log(prices)
            prices.forEach((value)=>{
                value[0]=moment(value[0]).format('DD-MM-YYYY')
            })
            var uniqueDates=[]
            var newGraphData=[]
            prices.forEach((value)=>{
                if(!uniqueDates.includes(value[0])){
                   newGraphData.push(value)
                   uniqueDates.push(value[0])
                }
            })
            console.log(newGraphData)
            setGraphData(newGraphData)
        }).catch(err=>{
            console.log(err)
        })
    },[])
    const data = {
      
        datasets: [
          {
            label: 'Price',
            data: graphData,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      };
      
      const options = {
        scales: {
            xAxes:[
                {
                    type:"time",
                    time:{
                        format:"MM/DD/YY",
                        tooltipFormat:"ll",
                    },
                    ticks:{
                        display:true,
                    }
                }
            ],
          yAxes: [
            {
              ticks: {
                display:false
              
              },
            },
          ],
        },
      };
      
    return (
        <div className='coinGraph'>
            <div className='coinGraphContainer'>
                <Line data={data} options={options} width={100} height={50} />
            </div>
        </div>
    )
}

export default CoinGraph
