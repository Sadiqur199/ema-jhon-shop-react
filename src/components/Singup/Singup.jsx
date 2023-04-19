import React, { useState } from 'react';
import './Singup.css'
import { Link } from 'react-router-dom';
const Singup = () => {
 const [error ,setError] = useState('')
  const handleSingUp = (event) =>{
    event.preventDefault()
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value
    console.log(email,password,confirm)
    if(password !== confirm)
    {
       setError('Your password not match');
       return 
    }
    else if(password.length<6){
      setError('Must be 6 characters or longer');
      return
    }

  }

  return (
    <div className='form-container'>
      <p className='form-title'>Sing Up Form</p>
      <p><small className='text-error'>{error}</small></p>
      <form onSubmit={handleSingUp}>
         <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" required placeholder='Enter Your mail' />
         </div>
         <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="" required placeholder='Enter Your pass' />
         </div>
         <div className="form-control">
          <label htmlFor="confirm">Confirm Password</label>
          <input type="password" name="confirm" id="" required placeholder='Enter Your pass' />
         </div>

         <input className='btn-submit' type="submit" value="Sing Up" />
      </form>
      <p><small>Already have an account??<Link to="/login">Login</Link> </small></p>
    </div>
  );
};

export default Singup;