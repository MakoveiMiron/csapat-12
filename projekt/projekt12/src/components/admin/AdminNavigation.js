import { NavLink } from "react-router-dom";
import { AdminContext } from "../../contexts/AdminContext";
import { auth } from "../../constans/firebaseConfig";
import { useContext } from "react";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";

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
	return (
		<>
			<NavLink to="/admin/">Admin</NavLink>
			<NavLink to="/admin/termek-felvetel">Termék felvétel</NavLink>
			<NavLink to="/admin/termekek">Termékek</NavLink>
			<NavLink to="/admin/vasarlok">Vásárlók lista</NavLink>
			<NavLink to="/admin/megrendelesek">Rendelések</NavLink>
			<NavLink to="/admin/kategoriak/uj-kategoria">Kategória felvétel</NavLink>
			<NavLink to="/">Főoldal</NavLink>
			{isAdmin && <button onClick={handleLogOut}>Kijelentkeztes</button>}
		</>
	);
}
