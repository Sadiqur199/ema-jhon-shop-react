import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './Order.css';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
const Orders = () => {
  const savecart = useLoaderData();
  const [cart , setCart] = useState(savecart);
  
    const handelRemoveCart = (id)=>{
    //  console.log(id)
    const remaning = cart.filter((product) => product.id !== id)
      setCart(remaning);
      removeFromDb(id)
    
    }

    const removeChart = ()=>{

      setCart([]);
      deleteShoppingCart();
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
        <Cart 
        cart={cart}
        removeChart = {removeChart}
        >
          <Link className='proced-link' to="/checkout">
            <button className='btn-procced'>Procced Checkout
            <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </Link>
        </Cart>
      </div>

    </div>
  );
};

export default Orders;