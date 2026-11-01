import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    axios.get('http://localhost:3000/api/auth/captain/logout', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200){
            localStorage.removeItem('token')
            navigate('/captain-login')
        }
    })

  return (
    <div>
      
    </div>
  )
}

export default CaptainLogout
