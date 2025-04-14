import React, { useEffect } from 'react'

export default function Dashboard() {

  const verfiyUser = async() => {
      try {
        const user = await getUser();
        if(user.success)
        {
          console.log('User Verified',user.message);
          alert('User Verified',user.message);
        }
      } catch (error) {
        console.error('User Verification Error',error.message);
        alert('User Verification Error',error.message);            
      }
      
    }

    useEffect(() => {
      verfiyUser();
    });

  return (
    <div>Dashboard</div>
  )
}
