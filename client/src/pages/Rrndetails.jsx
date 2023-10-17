import { useState } from 'react';
import '../styles/rrndetails.scss'
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import useFetch from '../hooks/useFetch';

const rows  = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    ];
    
    const columns  = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
    ];


const Rrndetails = () => {

    const [rrns,setRrns] = useState([]);
    const [rrn,setRrn] = useState('');
    const [selectedValue,setSelectedValue] = useState('Tcs1');
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
        if(!rrns.length && !rrn) return;
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
            console.log(data);
        })

    }

    const handleDelete = (index) => {
        setRrns([...rrns.slice(0,index),...rrns.slice(index+1,rrns.length)]);
    }

    return (
        <div className='rrndetails'>
        
        <form >
        <select name='dataOption' defaultValue= {selectedValue} onChange={(e)=>setSelectedValue(e.target.value)}>
            <optgroup label="TCS Historical">
            <option value='Tcs1'>Tcs 1</option>
            <option value='tcs2'>Tcs 2</option>
            </optgroup>
            <optgroup label="Integra Historical">
            <option value='Integra1'>Integra 1</option>
            <option value='Integra2'>Integra 2</option>
            </optgroup>
        </select>
        <div>
        {rrns.map((value,index)=> <span key={index}>
        {value}  <span className='delete-rrn' onClick={()=>handleDelete(index)}>X</span>
        </span>)}
        <input type='number'  placeholder = {rrns.length>0 ? '' : 'Enter RRN Number here'} required={rrns.length>0 ? false : true} value={rrn} onChange={(e)=>setRrn(e.target.value)} onKeyDown={onEnter}/>
        </div>
        <button onClick={onSubmit}>search</button>
        </form>
        <div style={{ height: 300, width: '95%' }}>
        <DataGrid rows={rows} columns={columns} slots={{ toolbar: GridToolbar }} />
        </div>

        </div>
    )
}

export default Rrndetails
