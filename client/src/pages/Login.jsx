import '../styles/login.scss'
import backpaper from '../assets/login_page_vector.jpg'
import { useState } from 'react'
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setAuth} = useAuth() ;
    const navigate = useNavigate();

    const handleSubmit = async  (e) => {

        e.preventDefault();

        const response   = await axiosInstance.post('/auth/login ',
        {username:username,password:password},

            {
                headers: { 'Content-Type': 'application/json' },
            }
        ). then((response) => response.data)
        
        if(response.accessToken){
            setAuth(response)
            navigate('/dashboard')
            console.log(response);
            
        }
    }


    return (
        <div className="form-container">
            
        <div className='backpaper'> 
        <img src={backpaper} alt='background-vector'/>
        </div>
        
        <form onSubmit={ handleSubmit}> 
        <h1>Argus</h1>
            <div>
            <input type="text"  placeholder='Username' 
            value={username}  
            onChange={(e)=>setUsername(e.target.value)} 
            required/>
            <input type="password"  placeholder='Password' 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
            required/>
            <button type="submit">Login</button>
            </div>
        </form> 
        </div>
    
    )
}

export default Login
