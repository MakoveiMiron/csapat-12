import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import "./Nav.css";
import {auth} from '../../Constans/firebaseConfig'
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import { useContext } from "react";

export default function LoggedInNav(){
   
    const [user, setUser] = useContext(LoggedInUserContext);

   function handleLogOut(){
        signOut(auth)
        .then(resp => setUser(null))
   }
   
    return(
        <>
            <div className="nav">
                <div className="nav-bar-left">
                    <NavLink to="/">Főoldal/logo</NavLink>
                    <NavLink to="/termekek">Termékek</NavLink>
                    <NavLink to="/rolunk">Rolunk</NavLink>
                    <NavLink to="/kapcsolat">Kapcsolat</NavLink>
                    <NavLink to="/admin">Admin</NavLink>
                </div>
                <div>
                  {user && user.name}
                </div>
                <div className="nav-bar-right">
                    {user ? <button onClick={handleLogOut}>Kijelentkeztes</button> :
                     <> <NavLink to="/belepes">Bejelentkezés</NavLink>
                    <NavLink to="/regisztracio">Regisztráció</NavLink></>}
                    <NavLink to="/#">Kosár</NavLink>
                </div>
            </div>
        </>
    )
}