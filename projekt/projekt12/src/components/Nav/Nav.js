import { NavLink } from "react-router-dom";

export default function Nav(){
    return(
        <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/termekek">Termékek</NavLink>
        </>
    )
}