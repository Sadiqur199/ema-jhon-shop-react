import React, { useContext, useState } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {
  const [show , setShow] =useState(false)
  const [error ,setError] = useState('')
  const [success,setSuccess] = useState('')
  const {singIn} = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location)
  const from = location.state?.from?.pathname || '/';

const handelSingin = event =>{
  event.preventDefault();
  const form = event.target
  const email = form.email.value
  const password = form.password.value
  singIn(email,password)
  .then(result=>{
    const loggedUser = result.user
    console.log(loggedUser)
    setSuccess('successfully')
    form.reset()
    navigate(from,{replace:true})
  })
  .catch(error=>{
    setError(error.message)
  })
}

  return (
    <div className='form-container'>
      <p className='form-title'>Login Form</p>
      <p><small>{error}</small></p>
      <p><small>{success}</small></p>
      <form onSubmit={handelSingin}>
         <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" required placeholder='Enter Your mail' />
         </div>
         <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type={show?"text" : "password"} name="password" id="" required placeholder='Enter Your pass' />
          <h6 className='show-pass' onClick={() =>setShow(!show)}><small>
            {
              show ? <span>Hide Password</span> : <span>Show Password</span>
            }
            </small></h6>
         </div>

         <input className='btn-submit' type="submit" value="Login" />
      </form>
      <p><small>New to Ema-John?<Link to="/singup">Create an account</Link> </small></p>
    </div>
  );
};

export default Login;