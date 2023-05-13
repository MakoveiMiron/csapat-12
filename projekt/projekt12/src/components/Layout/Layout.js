import { Outlet } from "react-router-dom";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import { useEffect, useContext } from "react";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
export default function Layout(){

    const [user, setUser] = useContext(LoggedInUserContext)
    

    


    return(
        <>
            <Nav/>
            <Outlet />
            <Footer />
        </>
    )
}