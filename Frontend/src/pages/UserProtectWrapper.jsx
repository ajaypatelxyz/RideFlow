import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserProtectWrapper = ({ children }) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const {user, setUser} = useContext(UserDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token])

    axios.get('http://localhost:3000/api/auth/user/profile', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200){
            const data = response.data
            setUser(data.user)
            setIsLoading(false)
        }
    }).catch((error) => {
        localStorage.removeItem('token')
        navigate('/login')
    })

    if(isLoading){
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper
