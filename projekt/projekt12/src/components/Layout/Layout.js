import { Outlet } from "react-router-dom";
import Nav from "../Nav/Nav";
import LoggedInNav from "../Nav/LoggedInNav";
import Footer from "../Footer/Footer";
import { useEffect, useContext } from "react";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
export default function Layout(){

    const [user, setUser] = useContext(LoggedInUserContext)
    

    


    return(
        <>
            <LoggedInNav/>
            <Outlet />
            <Footer />
        </>
    )
}