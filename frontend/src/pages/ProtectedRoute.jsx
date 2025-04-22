import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/users';
import Loader from './Loader';

export default function ProtectedRoute({children}) {
    const [userData ,setUserData] = useState(null);

    const verfiyUser = async() => {
        try {
          const user = await getUser();
          
          if(user.success)
          {
            setUserData(user.verifiedUser);            
          }
          else
          {
            alert('Invalid Credentials',user.message);   
            window.location.href = '/';                           
          }
        } catch (error) {
          
          alert('User Verification Error',error.message);   
          window.location.href = '/';         
        }
        
      }
      useEffect(() => {
        verfiyUser();
      },[]);  

  return (
    userData ? children : <Loader/>
  )
}
