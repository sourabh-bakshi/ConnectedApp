import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/users';
import Loader from './Loader';

export default function ProtectedRoute({children}) {
    const [userData ,setUserData] = useState(null);

    const verfiyUser = async() => {
        try {
          const user = await getUser();
          console.log('User Verification',user);
          if(user.success)
          {
            console.log('User Verified',user.message);
            setUserData(user.verifiedUser);
          }
          else
          {
            alert('Invalid Credentials',user.message);   
                     
          }
        } catch (error) {
          
          console.error('User Verification Error',error.message);
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
