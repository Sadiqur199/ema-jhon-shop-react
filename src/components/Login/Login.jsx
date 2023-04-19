import React from 'react';
import './Login.css'
import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <div className='form-container'>
      <p className='form-title'>Login Form</p>
      <form>
         <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" required placeholder='Enter Your mail' />
         </div>
         <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="" required placeholder='Enter Your pass' />
         </div>

         <input className='btn-submit' type="submit" value="Login" />
      </form>
      <p><small>New to Ema-John?<Link to="/singup">Create an account</Link> </small></p>
    </div>
  );
};

export default Login;