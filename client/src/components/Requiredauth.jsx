import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth"

const Requiredauth = () => {

    const {auth} = useAuth();



    return (
    <div>
        {   
            auth ? <Outlet/> : <h1> Unauthorized Access</h1>
        }

    </div>
    )
}

export default Requiredauth
