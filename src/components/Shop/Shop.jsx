import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    console.log(cart)

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(()=>{
        const shortedCart = getShoppingCart()
         const saveCart = [];

       //get id
       for(const id in shortedCart){

        // get the product using id
        const addedProduct = products.find(product => product.id === id)
         console.log(addedProduct)
         if(addedProduct){
         //quantity identify

            const quantity = shortedCart[id];
            addedProduct.quantity = quantity
            //added product to save cart
            saveCart.push(addedProduct)

         }

       }
       //set the cart
       setCart(saveCart)
    },[products])
    
    //   button clicked function 
        const handleAddToCart = (product)=>{
            console.log(product);
            const newCart=[...cart, product];
            setCart(newCart);
            addToDb(product.id);
    }

    const removeChart = ()=>{

        setCart([]);
        deleteShoppingCart();
      }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart
                 cart={cart}
                 removeChart ={removeChart}
                 >
                  <Link className='proced-link' to="/orders">
                    <button className='btn-procced'>Review order 
                    <FontAwesomeIcon  icon={faTrashAlt} />
                    </button>
                  </Link>
                 </Cart>
            </div>
        </div>
    );
};

export default Shop;