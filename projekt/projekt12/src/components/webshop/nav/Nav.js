import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import "./Nav.css";
import { auth } from "../../../constans/firebaseConfig";
import { LoggedInUserContext } from "../../../contexts/LoggedInUserContext";
import { AdminContext } from "../../../contexts/AdminContext";
import { useContext } from "react";
import { Icon } from "react-icons-kit";
import { menu } from "react-icons-kit/feather/menu";
import { x } from "react-icons-kit/feather/x";
import {logIn} from 'react-icons-kit/feather/logIn'
import {userPlus} from 'react-icons-kit/feather/userPlus';
import {logOut} from 'react-icons-kit/feather/logOut'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";
import CartHeader from "../../../pages/webshop/CartHeader"

export default function Nav() {
	const [user, setUser] = useContext(LoggedInUserContext);
	const [isAdmin, setIsAdmin] = useContext(AdminContext);
	const [cart, setCart] = useContext(CartContext);
	const navigate = useNavigate();
	function handleLogOut() {
		signOut(auth).then((resp) => {
			setUser(null);
			setCart(null);
			navigate("/");
			toast.success("Sikeres kijelentkezés!", {
				position: toast.POSITION.TOP_RIGHT,
			});
		});
	}

	const [toggle, setToggle] = useState(false);

	const handleToggle = () => {
		setToggle(!toggle);
	};

	return (
		<>
			<div className={toggle ? "navbar expanded" : "navbar"}>
				<div className="logo">
					<NavLink to="/">Főoldal/logo</NavLink>
				</div>
				<ul className="links">
					<li>
						<NavLink to="/termekek">Termékek</NavLink>
					</li>
					<li>
						<NavLink to="/rolunk">Rolunk</NavLink>
					</li>
					<li>
						<NavLink to="/kapcsolat">Kapcsolat</NavLink>
					</li>
					<li>
						<NavLink to="/megrendeleseim">Megrendeléseim</NavLink>
					</li>
					{isAdmin && (
						<li>
							<NavLink to="/admin">Admin</NavLink>
						</li>
					)}
					
				</ul>
			<div className="top-right">
				<div className="profile">
					{user ? (
						<button onClick={handleLogOut} className="signOut"><Icon icon={logOut} size={30}/></button>
						) : (
							<>
							
								<NavLink to="/belepes"><Icon icon={logIn} size={30}/></NavLink>
								<NavLink to="/regisztracio"><Icon icon={userPlus} size={30}/></NavLink>
							</>
					)}
				</div>
				<div className="toggle-icon" onClick={handleToggle}>
					{toggle ? <Icon icon={x} size={30} /> : <Icon icon={menu} size={30} />}
				</div>
				{user && <CartHeader className="chart"/>}
					<div className="username">{(user && user.name) || (isAdmin && "admin")}</div>
			</div>
			</div>
		</>
	);
}
