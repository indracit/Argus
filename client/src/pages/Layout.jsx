import { Outlet } from "react-router-dom"
import '../styles/layout.scss'
import { Link } from 'react-router-dom';
import { useLocation ,useNavigate} from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import {LuLogOut} from "react-icons/lu";
import {HiOutlineDocumentReport} from "react-icons/hi";
import axiosInstance from '../api/axios';
import useAuth from "../hooks/useAuth";


const Layout = () => {
    let location = useLocation();
    const navigate = useNavigate();
    const {setAuth} = useAuth();

    const handleLogout = async() => {
        navigate('/');
        setAuth({})
        const response   = await axiosInstance.post('/logout',{},{ withCredentials: true, credentials: 'include' })
                            . then((response) => response.data);
        console.log(response);

    }

    
    return (
        <section>

            <div className="sidebar">
            <h1>Argus</h1>
            <div className="menu">
            <div>
            <Link to='/dashboard' className="link">
            <h4 className={location.pathname=='/dashboard' ? 'menu-active' : ''}>
                <MdOutlineDashboard style={{fontSize:"1.3rem" }}/>
                <span>Dashboard</span>
            </h4>
            </Link>

            <Link to='/reports' className="link">
            <h4 className={location.pathname=='/reports' ? 'menu-active' : ''}>
                <HiOutlineDocumentReport style={{fontSize:"1.3rem" }}/>
                <span>Reports</span>
            </h4>
                </Link>
                
            </div>
            <h4 onClick={handleLogout}>
                <LuLogOut style={{fontSize:"1.3rem" }}/>
                <span>Logout</span>
            </h4>
            </div>
            </div>

            <div>
            <Outlet/>
            </div>

        </section>
    )
}

export default Layout
