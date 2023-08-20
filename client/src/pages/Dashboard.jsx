import '../styles/dashboard.scss'
import Bclogin_chart from '../components/Bclogin_chart'
import Txn_Barchart from '../components/Txn_BarChart'
import { useState } from 'react'

const data = [{ name: "Active Bcs", value: 100 },
{ name: "Todays Active", value: 70},
]

const txn_data = [
	{name: 'on_old',
	sucess: 121938,
	failure: 41657},
	
	{name: 'acq_old',
	sucess: 14336,
	failure: 6306},
	
	{name: 'tpd_old',
	sucess: 19145,
	failure: 1769},
	
	{name: 'enrl_old',
	sucess: 3200,
	failure: 1},
	
	{name: 'on',
	sucess: 121938,
	failure: 41657},
	
	{name: 'acq',
	sucess: 14336,
	failure: 6306},
	
	{name: 'tpd',
	sucess: 19145,
	failure: 1769},
	
	{name: 'enrl',
	sucess: 3200,
	failure: 1},
	
  ]

const Dashboard = () => {

	const [menu,setMenu] = useState('BM');

	
    return (
        <div className='dashbaord'>
			<div className='heading'>
				<span className={menu=='BM' ? 'active-menu' : ''} onClick={()=> setMenu('BM')}>Bc Monitoring</span>
				<span className={menu == 'TM' ? 'active-menu' : ''} onClick={()=> setMenu('TM')}>Transaction Monitoring</span>
			</div>

			<div className='charts'>
            { menu=='BM' ? <span>
            <Bclogin_chart data={data}/>
            <p className='pie-text'> Total Bcs : 150</p>
            </span> : <span>
                <Txn_Barchart data={txn_data}/>
                <p className='bar-text'> Transaction Data</p>
            </span> }
            </div>
            
        </div>
    )
}

export default Dashboard
