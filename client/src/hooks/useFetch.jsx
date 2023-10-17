import useAuth from "./useAuth";
import axiosInstance from "../api/axios";

const useFetch = () => {

    const {auth} = useAuth();

    const fetch = async (url,payload) => {
        const response   = await axiosInstance.post(url,JSON.stringify(payload),{
                headers: { 'Content-Type': 'application/json',Authorization: `Bearer ${auth.accessToken}` },
                withCredentials: true, credentials: 'include',}). then((response) => response.data);
            return response;
    }

    return [fetch];
}

export default useFetch