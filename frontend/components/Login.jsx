import React from 'react'

export default function Login() {
  return (
    <>
        <div className='loginBox'>
           <h2>Welcome To StayConnected</h2>
           <span>Your gateway to seamless conversations.</span>
           <form>
             <input type='text' placeholder='Username' />
             <input type='password' placeholder='Password' />
             <button>Login</button>
           </form>
        </div>
    </>
  )
}
