import '../styles/dashboard.scss'
import DashboardBox from '../components/DashboardBox';
import DataGrid from '../components/DataGrid';
import axiosInstance from "../api/axios";
import { useEffect } from 'react';
import useAuth from "../hooks/useAuth";

const Dashboard = () => {

    const {auth} = useAuth();

    const fetch = async ()=> {
        const response   = await axiosInstance.post('/app',
        JSON.stringify({query:'test'}),

            {
                headers: { 'Content-Type': 'application/json',Authorization: `Bearer ${auth.accessToken}` },
                withCredentials: true, credentials: 'include',
                
            }
        ). then((response) => response.data)

        console.log(response);
    }

    useEffect( ()=>{
        
        fetch();

    },[])

    return (
        <div className='dashboard'>
        <div className='dashboard-box'>
        <DashboardBox/>
        <DashboardBox/>
        <DashboardBox/>
        </div>

		<div className='data-grid'>
        <DataGrid/>
        <DataGrid/>
        </div>

        </div>
    )
}

export default Dashboard
