import { NavLink } from "react-router-dom";
import "./Nav.css"

export default function Nav(){
    return(
        <>
            <div className="nav">
                <div className="nav-bar-left">
                    <NavLink to="/">Főoldal/logo</NavLink>
                    <NavLink to="/termekek">Termékek</NavLink>
                    <NavLink to="/rolunk">Rolunk</NavLink>
                    <NavLink to="/kapcsolat">Kapcsolat</NavLink>
                    <NavLink to="/kereses">Kereses</NavLink>
                </div>
                <div className="nav-bar-right">
                    <NavLink to="/#">Bejelentkezés</NavLink>
                    <NavLink to="/#">Regisztráció</NavLink>
                    <NavLink to="/#">Kosár</NavLink>
                </div>
            </div>
        </>
    )
}