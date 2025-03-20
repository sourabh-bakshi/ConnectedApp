import React, { useEffect } from 'react'

export default function Login() {
    useEffect(() => {
        console.log('Login Component Mounted');
        
    })
    
  return (
    <>
    
        <div className='loginBox'>
           <h2>Welcome To StayConnected</h2>
           <span>Your gateway to seamless conversations.</span>
           <form>
            <div className='Wrapper'>
                <input type='text' id='username' placeholder='' required/>
                <label htmlFor='username'>UserName</label>
             </div>
            <div className="Wrapper">
                <input type='password' id='password' placeholder='  ' required/>
                <label htmlFor='password'>PassWord</label>
            </div> 
             <button>Login</button>
           </form>
        </div>
    
    </>
  )
}
