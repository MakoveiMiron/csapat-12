import { Outlet } from "react-router-dom";
import AdminNavigation from "../Nav/AdminNavigation";
import { useContext } from "react";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
export default function AdminLayout(){

    const [user,setUser] = useContext(LoggedInUserContext);

    return(
        <>
        {user.uid === 'KqiGKLztHcVTxJukIfzbmUMgD8E3' ? <>
                <AdminNavigation />
                <Outlet/>
                </> 
                : 
                "Ez csak az admin számára elérhető!"
        }
        </>
    )
}