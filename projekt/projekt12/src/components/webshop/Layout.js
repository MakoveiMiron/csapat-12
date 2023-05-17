import { Outlet } from "react-router-dom";
import Nav from "../webshop/nav/Nav";
import Footer from "../footer/Footer";
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