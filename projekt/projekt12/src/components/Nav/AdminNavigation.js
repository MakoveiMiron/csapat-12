import { NavLink } from "react-router-dom";


export default function AdminNavigation(){
    return(
        <>
            <NavLink to="/admin/">Admin</NavLink>
            <NavLink to="/admin/termek-felvetel">Termék felvétel</NavLink>
            <NavLink to="/admin/termekek">Termékek</NavLink>
            <NavLink to="/">Főoldal</NavLink>
        </>
    )
}