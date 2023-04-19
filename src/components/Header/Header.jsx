import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Header = () => {
    const {user,logOut} = useContext(AuthContext)

    const handellogOut = event =>{
        event.preventDefault();
        logOut()
        .then(result=>{
            const loggedUser = result.user
            console.log(loggedUser)
        })

        .catch(error=>{
            console.log(error.message)
        })

    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/singup">SingUp</Link>
                {
                    user && 
                    <span className='text-color'>{user.email} <button onClick={handellogOut}>Sing out</button></span>
                }
            </div>
        </nav>
    );
};

export default Header;