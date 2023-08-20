import '../styles/login.scss'
import backpaper from '../assets/login_page_vector.jpg'
const Login = () => {
    return (
        <div className="form-container">
            
        <div className='backpaper'> 
        <img src={backpaper} alt='background-vector'/>
        </div>
        
        <form> 
        <h1>Argus</h1>
            <div>
            <input type="text"  placeholder='Username'/>
            <input type="password"  placeholder='Password'/>
            <button>Login</button>
            </div>
        </form> 
        </div>
    
    )
}

export default Login
