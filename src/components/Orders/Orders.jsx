import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Order.css';
import { removeFromDb } from '../../utilities/fakedb';
const Orders = () => {
  const savecart = useLoaderData();
  const [cart , setCart] = useState(savecart);
  
    const handelRemoveCart = (id)=>{
    //  console.log(id)
    const remaning = cart.filter((product) => product.id !== id)
      setCart(remaning);
      removeFromDb(id)
    
    }

  return (
    <div className='shop-container'>
      <div className="review-container">
        {
          cart.map(product => <ReviewItem
          key = {product.id}
          product = {product}
          handelRemoveCart = {handelRemoveCart}
          ></ReviewItem>)
        }
      </div>

      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>

    </div>
  );
};

export default Orders;