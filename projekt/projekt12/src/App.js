import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./components/Products/Products";
import Contact from "./components/Contact/Contact";
import AboutUs from "./components/AboutUs/AboutUs";
import Layout from "./components/Layout/Layout";
import AdminLayout from "./components/Layout/AdminLayout";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import AdminDeleteProduct from "./components/Admin products/Delete/AdminDeleteProduct";
import AdminModifyProduct from "./components/Admin products/Modify/AdminModifyProduct";
import Login from "./components/Login/Login";
import Registration from "./Pages/Registration";
import { LoggedInUserContext } from "./contexts/LoggedInUserContext";
import { AdminContext } from "./contexts/AdminContext";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminAuth from "./components/Auth/AdminAuth";
import AdminLogin from "./components/AdminLogin/AdminLogin";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/termekek",
				element: <Products />,
			},
			{
				path: "/kapcsolat",
				element: <Contact />,
			},
			{
				path: "/rolunk",
				element: <AboutUs />,
			},
			{
				path: "/belepes",
				element: <Login />,
			},
			{
				path: "/regisztracio",
				element: <Registration />,
			},
		],
	},
	{
		path: "/admin/belepes",
		element: <AdminLogin />,
	},
	{
		path: "/admin",
		element: (
			<AdminAuth>
				<AdminLayout />
			</AdminAuth>
		),
		children: [
			{
				path: "/admin/termek-felvetel",
				element: <CreateProduct />,
			},
			{
				path: "/admin/termekek",
				element: <Products />,
			},
			{
				path: "/admin/termekek/:id/torles",
				element: <AdminDeleteProduct />,
			},
			{
				path: "/admin/termekek/:id/modositas",
				element: <AdminModifyProduct />,
			},
		],
	},
]);
function App() {
	const [user, setUser] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	return (
		<AdminContext.Provider value={[isAdmin, setIsAdmin]}>
			<LoggedInUserContext.Provider value={[user, setUser]}>
				<RouterProvider router={router} />
				<ToastContainer />
			</LoggedInUserContext.Provider>
		</AdminContext.Provider>
	);
}

export default App;
