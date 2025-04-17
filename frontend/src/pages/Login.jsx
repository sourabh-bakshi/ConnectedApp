import React, { useEffect, useState } from 'react'
import logo from './logo.png'
import {FcGoogle} from 'react-icons/fc'
import {FaApple, FaMobileAlt, FaAt, FaLock} from 'react-icons/fa'
import { loginUser } from '../../api/users';
import Loader from './Loader';
import {GoogleOAuthProvider} from '@react-oauth/google';


export default function Login() {
  const [formData, setFormData] = useState({userName:'', password:''});
  const [loading, setloading] = useState(false);

  const handleChange = (e) => {
    setFormData(  {...formData, [e.target.name]: e.target.value}  );
  }

  const submit = async(value) => {
    try {
      value.preventDefault();
      setloading(true);
      
      const loginValidation = await loginUser({identifier:formData.userName, password:formData.password});
      
      if(loginValidation.success)
      {
        console.log('Login Successful',loginValidation.message);
        // alert('Login Successful',loginValidation.message);
        setloading(false);
        window.location.href = '/dashboard';
      }
      else
      {
        console.log('Login Failed',loginValidation.message);
      }
      
    } catch (error) {
      console.error('Login Error',error.message);
      alert('Login Error',error.message);      
      window.location.href = '/';
    }
    finally{
      setloading(false);
    }
  }

  const gLogin = () => {
    window.location.href = 'https://connectedapp.onrender.com/api/user/login/googleAuth';
                           
  }
    
  return (
    loading ? <Loader/> :
    <>    
        <div className='loginBox'>
          <header className='loginHeader'>
            <img src={logo} alt='logo' className='logo'/>            
           <h1 className='logoName'>StayConnected</h1>
           <span>Your gateway to seamless conversations.</span>
           </header>
           
           <form onSubmit={submit}>
            <div className='Wrapper'>
                <input 
                className='loginInput' 
                type='text' 
                name='userName' 
                id='username' 
                value={formData.userName} 
                onChange={handleChange} 
                placeholder='' 
                autoComplete='username' required/>
                
                <label htmlFor='username'>UserName / Email</label>
                
                <FaAt size={20} className='loginIcon'/>

             </div>
            <div className="Wrapper">
                <input 
                className='loginInput' 
                type='password' 
                name='password' 
                id='password' 
                value={formData.password} 
                onChange={handleChange} 
                placeholder='' 
                autoComplete='current-password' required/>

                <label htmlFor='password'>PassWord</label>   
                
                <FaLock size={20} className='loginIcon'/>             
            </div> 
            <button type='submit' className='loginBtn'>Login</button>
            </form>
            <div className='divider'>
              <div className="divider-line"></div>
              OR
              <div className="divider-line"></div>
            </div>
            
            <div className='altLogin'>
                <br></br>
                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <button className='loginBtn' title='Google Sign In' onClick={gLogin}>
                {/* <button className='loginBtn' title='Google Sign In'> */}
                  <FcGoogle size={24} className='loginIcon'/>
                  <p className='p'>Google Login</p>
                  </button>
                  </GoogleOAuthProvider>
                <button className='loginBtn' title='Apple Sign In'>
                  <FaApple size={24} className='loginIcon'/>
                  <p>Apple Login</p>
                  </button> 
                <button className='loginBtn' title='Mobile Sign In'>
                  <FaMobileAlt size={24} className='loginIcon'/>
                  <p>Mobile Login</p>
                </button>
            </div>
        </div>
    
    </>
  )
}
