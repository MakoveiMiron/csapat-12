import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import "./Nav.css";
import { auth } from "../../Constans/firebaseConfig";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import { AdminContext } from "../../contexts/AdminContext";
import { useContext } from "react";
import { Icon } from "react-icons-kit";
import { menu } from "react-icons-kit/feather/menu";
import { x } from "react-icons-kit/feather/x";
import { shoppingCart } from "react-icons-kit/feather/shoppingCart";
import { toast } from "react-toastify";

export default function Nav() {
	const [user, setUser] = useContext(LoggedInUserContext);
	const [isAdmin, setIsAdmin] = useContext(AdminContext);

	function handleLogOut() {
		signOut(auth).then((resp) => {
			setUser(null);
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
					<li className="username">{(user && user.name) || (isAdmin && "admin")}</li>
					<li>
						<NavLink to="/termekek">Termékek</NavLink>
					</li>
					<li>
						<NavLink to="/rolunk">Rolunk</NavLink>
					</li>
					<li>
						<NavLink to="/kapcsolat">Kapcsolat</NavLink>
					</li>
					{isAdmin && (
						<li>
							<NavLink to="/admin">Admin</NavLink>
						</li>
					)}

					{user ? (
						<button onClick={handleLogOut}>Kijelentkeztes</button>
					) : (
						<>
							<li>
								<NavLink to="/belepes">Bejelentkezés</NavLink>
							</li>
							<li>
								<NavLink to="/regisztracio">Regisztráció</NavLink>
							</li>
						</>
					)}
				</ul>
				<div className="toggle-icon" onClick={handleToggle}>
					{toggle ? <Icon icon={x} size={30} /> : <Icon icon={menu} size={30} />}
				</div>
				<div className="chart">
					<NavLink to="/#">
						<Icon icon={shoppingCart} size={30} />
					</NavLink>
				</div>
			</div>
		</>
	);
}
