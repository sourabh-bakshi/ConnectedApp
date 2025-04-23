import React, { useEffect, useState } from 'react'
import { logoutUser } from '../../api/users';

export default function Dashboard() {
  const [loading, setloading] = useState(false);

  const handleclick = async() => {
    
    try {
      setloading(true);
      const logout = await logoutUser();
      
      if(logout.success)
      {
        setloading(false);
        window.location.href = '/';      
      }
      else
      {
        setloading(false);
        alert('Logout Failed',logout.message);       
      }

    } catch (error) {
      setloading(false);
      console.log(error.message);
      alert('Logout Error',error.message);
      window.location.href = '/';
      
    }
    
  }
  
  return (
    <>
    <button onClick={handleclick} className='logoutBtn'>Logout</button>
    <div>Dashboard</div>
    </>
  )
}
