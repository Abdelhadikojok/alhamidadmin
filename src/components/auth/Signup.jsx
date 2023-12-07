import React from "react";
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { signUpAsync } from '../../Redux/Slices/UserSlice';

import { useDispatch, useSelector } from 'react-redux';

export default function Signup() {
  const [formData,setFormData] = useState({})
  const {loading , error } = useSelector((state) => state.user)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signUpAsync(formData));
      if(!error){
        navigate("/login");
      }
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };
  

  const handleChange = (e)=>{
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  return <div >
  <h1>Sign In</h1>
  <form onSubmit={handleSubmit} >
    <input
      type='text'
      placeholder='name'
      id='name'
      onChange={handleChange}
    />
    <input
      type='email'
      placeholder='Email'
      id='email'
      onChange={handleChange}
    />
    <input
      type='password'
      placeholder='Password'
      id='password'
      onChange={handleChange}
    />
    <button
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Sign In'}
    </button>
  </form>
  <div>
    <p>Have an account?</p>
    <Link to='/sign-up'>
      <span>Sign Up</span>
    </Link>
  </div>
  <p>
    {error ? error.message || 'Something went wrong!' : ''}
  </p>
</div>
}
