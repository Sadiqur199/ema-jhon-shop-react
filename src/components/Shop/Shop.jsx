import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './Shop.css';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [itemPerPage, setItemPerPage] = useState(10)

    const { totalProducts } = useLoaderData()
    // const itemPerPage = 10;
    const totalPage = Math.ceil(totalProducts / itemPerPage)
    const pageNumbers = [...Array(totalPage).keys()]


    /**
     * 1.Determine total number of items
     * 2.decided the number of item per page
     * 3.calculate the total number of page
     * 4.Determine the current page
     */

    useEffect(() => {
     async function fetchData(){
       const response = await fetch(`http://localhost:5000/products?page=${currentPage} &limit=${itemPerPage}`)
       const data = await response.json()
       setProducts(data)
     }
     fetchData();
    }, [currentPage,itemPerPage]);

    
    useEffect(() => {
        const shortedCart = getShoppingCart()
        const saveCart = [];

        //get id
        for (const id in shortedCart) {

            // get the product using id
            const addedProduct = products.find(product => product._id === id)
            console.log(addedProduct)
            if (addedProduct) {
                //quantity identify

                const quantity = shortedCart[id];
                addedProduct.quantity = quantity
                //added product to save cart
                saveCart.push(addedProduct)

            }

        }
        //set the cart
        setCart(saveCart)
    }, [products])

    //   button clicked function 
    const handleAddToCart = (product) => {
        console.log(product);
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product._id);
    }

    const removeChart = () => {

        setCart([]);
        deleteShoppingCart();
    }


    const options = [5, 10, 20]
    function handleSelectChange(event){
     setItemPerPage(parseInt(event.target.value));
     setCurrentPage(0)
    }


    return (
        <>
            <div className='shop-container'>
                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart
                        cart={cart}
                        removeChart={removeChart}
                    >
                        <Link className='proced-link' to="/orders">
                            <button className='btn-procced'>Review order
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                        </Link>
                    </Cart>
                </div>
            </div>
            {/* Pagination */}
            <div className='pagination'>
                <p>Current Page:{currentPage} and Item Per Page : {itemPerPage}</p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        className={currentPage === number ?'selected':''}
                        onClick={() => setCurrentPage(number)}
                    >{number}</button>)
                }

                <select value={itemPerPage} onChange={handleSelectChange}>
                   {
                    options.map(option=>(
                        <option key={option} value={option}>
                           {option}
                        </option>
                    ))
                   }
                </select>
            </div>
        </>
    );
};

export default Shop;