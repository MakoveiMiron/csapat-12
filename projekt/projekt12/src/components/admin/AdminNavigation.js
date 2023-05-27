import { NavLink } from "react-router-dom";
import { AdminContext } from "../../contexts/AdminContext";
import { auth } from "../../constans/firebaseConfig";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { Icon } from "react-icons-kit";
import { menu } from "react-icons-kit/feather/menu";
import { x } from "react-icons-kit/feather/x";
import "./AdminNavigation.css";

export default function AdminNavigation() {
	const [isAdmin, setIsAdmin] = useContext(AdminContext);
	function handleLogOut() {
		signOut(auth).then((resp) => {
			setIsAdmin(false);
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

		<div className={toggle ? "navbar-admin expanded" : "navbar-admin"}>
			<ul className="links">
				<li className="main">
					<NavLink to="/admin/">Admin</NavLink>
				</li>
				<li className="add-product">
					<NavLink to="/admin/termek-felvetel">Termék felvétel</NavLink>
				</li>
				<li className="products">
					<NavLink to="/admin/termekek">Termékek</NavLink>
				</li>
				<li className="costumer-list">
					<NavLink to="/admin/vasarlok">Vásárlók lista</NavLink>
				</li>
				<li>
					<NavLink to="/admin/megrendelesek">Rendelések</NavLink>
				</li>
				<li>
					<NavLink to="/admin/kategoriak/uj-kategoria">Kategória felvétel</NavLink>
				</li>
				<li className="home-page">
					<NavLink to="/">Főoldal</NavLink>
					{isAdmin && <button className="sign-out" onClick={handleLogOut}>Kijelentkeztes</button>}
				</li>
			</ul>
			<div className="toggle-icon" onClick={handleToggle}>
					{toggle ? <Icon icon={x} size={30} /> : <Icon icon={menu} size={30} />}
			</div>
		</div>

		</>
	);
}
