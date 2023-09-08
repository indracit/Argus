import '../styles/dashboard.scss'
import DashboardBox from '../components/DashboardBox';
import DataGrid from '../components/DataGrid';
import useFetch from '../hooks/useFetch';
import { useEffect } from 'react';

const Dashboard = () => {

    const [loading,error,data] = useFetch('/app',{query:'test'});

    useEffect(()=>{
        console.log(loading);
        console.log(loading);
        console.log(data);  
    })

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
