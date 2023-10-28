import { useState } from 'react';
import '../styles/rrndetails.scss'
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import useFetch from '../hooks/useFetch';
import Loader from '../components/Loader';


    const columns  = [
    { field: 'TXN_ID', headerName: 'TXN_ID', width: 150 },
    { field: 'RRN_REQ', headerName: 'RRN_REQ', width: 150 },
    { field: 'FROM_ACCOUNT', headerName: 'FROM_ACCOUNT', width: 150 },
    { field: 'TXN_SERVICE', headerName: 'TXN_SERVICE', width: 150 },
    { field: 'TXN_DATE', headerName: 'TXN_DATE', width: 150 },
    { field: 'TXN_TIME', headerName: 'TXN_TIME', width: 150 },
    { field: 'AMOUNT', headerName: 'AMOUNT', width: 150 },
    { field: 'BANK_NAME', headerName: 'BANK_NAME', width: 150 },
    { field: 'ACQ_BANK_ID', headerName: 'ACQ_BANK_ID', width: 150 },
    { field: 'ACQ_ID', headerName: 'ACQ_ID', width: 150 },
    { field: 'TERMINALID', headerName: 'TERMINALID', width: 150 },
    { field: 'LOCATION', headerName: 'LOCATION', width: 150 },
    { field: 'STATUS', headerName: 'STATUS', width: 150 },
    ];


const Rrndetails = () => {

    const [rrns,setRrns] = useState([]);
    const [rrn,setRrn] = useState('');
    const [respData,setRespData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [selectedValue,setSelectedValue] = useState('TCS(22/07/23 - 25/09/23) - Issuer');
    const [fetch] = useFetch();

    const onEnter = (e) =>{
        
        if(e.key==' ') {
            if(rrn=='' || rrn==null){
                return 
            }
            setRrns([...rrns,rrn]);
            setRrn('');
        }
    }

    const onSubmit = async(e) =>{
        setLoading(true);
        if(!rrns.length && !rrn) return setLoading(false);
        e.preventDefault();

        let body = [];
        if(rrn && rrns.length) {
            body = [...rrns,rrn]
        } 
        if(rrns.length && !rrn){
            body = [...rrns]
        }
        if(rrn && !rrns.length){
            body = [rrn]
        }
        
        fetch('/app',{selectedValue,query:body}).then((data)=>{

            // console.log(data.result);
            if(data.result.length > 0){
                setLoading(false);
                setRespData(data.result);
            }
            else{
                setLoading(false);
                alert('No data Found!');
            }
        })
        
        setRrn('');
        setRrns([]);

    }

    const handleChange = ( value ) => {
        setRespData([]);
        setRrn(value);
    }
    const handleDelete = (index) => {
        setRrns([...rrns.slice(0,index),...rrns.slice(index+1,rrns.length)]);
    }

    return (
        <div className='rrndetails'>
        
        <form >
        <select name='dataOption' defaultValue= {selectedValue} onChange={(e)=>setSelectedValue(e.target.value)}>
            <optgroup label="TCS Historical">
            <option value='TCS(22/07/23 - 25/09/23) - Issuer'>TCS(22/07/23 - 25/09/23) - Issuer</option>
            <option value='TCS(29/11/22 - 22/07/23) - Issuer'>TCS(29/11/22 - 22/07/23) - Issuer</option>
            </optgroup>
            <optgroup label="Integra Historical">
            <option value='Integra - Issuer'>Integra-Issuer</option>
            </optgroup>
        </select>
        <div>
        {rrns.map((value,index)=> <span key={index}>
        {value}  <span className='delete-rrn' onClick={()=>handleDelete(index)}>X</span>
        </span>)}
        <input type='number'  placeholder = {rrns.length>0 ? '' : 'Enter RRN Number here'} required={rrns.length>0 ? false : true} value={rrn} onChange={(e)=>handleChange(e.target.value)} onKeyDown={onEnter}/>
        </div>
        <button onClick={onSubmit}>search</button>
        </form>
        {loading? <Loader/> :'' }
        
        {
            respData.length ? 
        <div style={{ height: 300, width: '90%' }}>
        <DataGrid rows={respData} columns={columns} slots={{ toolbar: GridToolbar }} />
        </div> : ''
        }


        </div>
    )
}

export default Rrndetails
