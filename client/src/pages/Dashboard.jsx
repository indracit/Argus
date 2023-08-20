import '../styles/dashboard.scss'
import Bclogin_chart from '../components/Bclogin_chart'
import Txn_Barchart from '../components/Txn_BarChart'

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
    return (
        <div className='dashbaord'>
            <span>
            <Bclogin_chart data={data}/>
            <p> Total bcs : 150</p>
            </span>
            
            <span>
                <Txn_Barchart data={txn_data}/>
                <p> Txn data</p>
            </span>
        </div>
    )
}

export default Dashboard
