import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './CoinPage.css'
import Coin from '../Coin';
import { auth } from '../../firebase';
import { useHistory } from 'react-router-dom';
function CoinPage() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const history=useHistory()
  
    useEffect(() => {
    

        auth.onAuthStateChanged((user)=>{
            if(user){
                axios
                .get(
                  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=150&page=1&sparkline=false'
                )
                .then(res => {
                  setCoins(res.data);
                  console.log(res.data);
                })
                .catch(error => console.log(error));
            }else{
                history.push('/sign-up')
            }
        })

    }, []);
  
    const handleChange = e => {
      setSearch(e.target.value);
    };
  
    const filteredCoins = coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
  
    return (
      <div className='coin-app'>
        <div className='coin-search'>
          <h1 className='coin-text'>Track A Crypto </h1>
          <h3 className='Ct'> Click on The Name Of Crypto To Get The Performance Graph </h3>
          <form>
            <input
              className='coin-input'
              type='text'
              onChange={handleChange}
              placeholder='Search'
            />
          </form>
        </div>
        {filteredCoins.map(coin => {
          return (
            <Coin
              key={coin.id}
              id={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.total_volume}
              volume={coin.market_cap}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />
          );
        })}
      </div>
    );
}

export default CoinPage
