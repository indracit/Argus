import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth"

const Requiredauth = () => {

    const {auth} = useAuth();



    return (
    <div>
        {   
            auth ? <Outlet/> : 'Unauthorized Access'
        }

    </div>
    )
}

export default Requiredauth
