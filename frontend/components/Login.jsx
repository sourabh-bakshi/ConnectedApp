import React, { useEffect } from 'react'
import logo from './logo.png'
import {FcGoogle} from 'react-icons/fc'
import {FaApple, FaMobileAlt, FaAt, FaLock} from 'react-icons/fa'

export default function Login() {
    useEffect(() => {
        console.log('Login Component Mounted');
        
    })
    
  return (
    <>
    
        <div className='loginBox'>
          <header className='loginHeader'>
            <img src={logo} alt='logo' className='logo'/>            
           <h1 className='logoName'>StayConnected</h1>
           <span>Your gateway to seamless conversations.</span>
           </header>
           
           <form>
            <div className='Wrapper'>
                <input className='loginInput' type='text' id='username' placeholder='' required/>
                <label htmlFor='username'>UserName</label>
                <FaAt size={20} className='loginIcon'/>
             </div>
            <div className="Wrapper">
                <input className='loginInput' type='password' id='password' placeholder='' required/>
                <label htmlFor='password'>PassWord</label>   
                <FaLock size={20} className='loginIcon'/>             
            </div> 
            </form>
            <div className='divider'>
              <div className="divider-line"></div>
              OR
              <div className="divider-line"></div>
            </div>
            
            <div className='altLogin'>
                <br></br>
                <button className='loginBtn' title='Google Sign In'>
                  <FcGoogle size={24} className='loginIcon'/>
                  <p className='p'>Google Login</p>
                  </button>
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
