import React, { useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import { Navigate } from "react-router-dom";

function AuthAdmin(props) {
	const [isAdmin, setisAdmin] = useContext(AdminContext);
	if (!isAdmin) return <Navigate to="/admin/belepes" />;
	return props.children;
}

export default AuthAdmin;
