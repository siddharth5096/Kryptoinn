import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Articles Related to Some Famous Crypto's </h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='Articles related to Bitcoins'
              label='Bitcoin'
              path='https://www.moneycontrol.com/news/tags/bitcoin.html/news/'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Articles related to Ethereum'
              label='Ethereum'
              path='https://www.moneycontrol.com/news/tags/ethereum.html/news/'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Articles related to Cardano'
              label='Cardano'
              path='https://www.moneycontrol.com/news/business/cryptocurrency/cardano-most-actively-developed-cryptocurrency-in-2018-bitcoin-not-even-in-top-50-3350361.html'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Articles related to Dogecoin'
              label='Dogecoin'
              path='https://www.moneycontrol.com/news/tags/dogecoin.html/news/'
            />
            <CardItem
              src='images/img-8.jpg'
              text='Articles related to Ripple XPR'
              label='Ripple XPR'
              path='https://www.moneycontrol.com/news/tags/ripple.html/news/'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;