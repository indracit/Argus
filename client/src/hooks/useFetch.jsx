import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axiosInstance from "../api/axios";

const useFetch = (url,payload) => {

    const {auth} = useAuth();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchdata = async (url,payload) => {
        const response   = await axiosInstance.post(url,JSON.stringify(payload),{
                headers: { 'Content-Type': 'application/json',Authorization: `Bearer ${auth.accessToken}` },
                withCredentials: true, credentials: 'include',}). then((response) => response.data);
            return response;
    }

    useEffect( ()=>{
        setLoading(true);
        fetchdata(url,payload).then((data) => { 
                setLoading(false);
                setData(data)
                }).catch((err)=>{
                setLoading(false);
                setError(err);
            })

    },[])

    return [loading,error,data];
}

export default useFetch