import React, { useEffect, useState } from 'react'

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
    <div className="logout" onClick={handleclick}>Logout</div>
    <div>Dashboard</div>
    </>
  )
}
