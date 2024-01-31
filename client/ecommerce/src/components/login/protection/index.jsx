import React, { useEffect, useState } from "react";
import Dashboard from "../../Dashboard";
import { useNavigate ,Outlet} from "react-router-dom";


function P() {

    const navigate = useNavigate();
    const [auth, setAuth] = useState(true);

    useEffect(() => { 
        if(!auth) {
            navigate('/signIn');
        }

    }, [auth,navigate])


    return (
        <>{auth ? <Dashboard  ui={<Outlet/>} />: navigate("/signIn")} </>
    )
}
export default P;
