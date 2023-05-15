import { Outlet } from "react-router-dom";
import AdminNavigation from "../Nav/AdminNavigation";

export default function AdminLayout() {
	return (
		<>
			<AdminNavigation />
			<Outlet />
		</>
	);
}
