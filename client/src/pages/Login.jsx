import '../styles/login.scss'
import backpaper from '../assets/login_page_vector.jpg'
import { useState } from 'react'
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
// import Loader from '../components/Loader';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setAuth} = useAuth() ;
    // const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async  (e) => {
        // setLoading(true);
        e.preventDefault();

        const response   = await axiosInstance.post('/login',
        JSON.stringify({username:username,password:password}),

            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true, credentials: 'include'
            }
        ). then((response) => {
            
            return response.data})

            if(response.message){
                alert(response.message);
            }
        if(response.accessToken){
            setAuth(response)
            navigate('/rrndetails')
            // console.log(response);
            
        }
        // setLoading(false)
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
