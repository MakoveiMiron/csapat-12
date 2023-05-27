import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/webshop/Home";
import Products from "./components/products/Products";
import Contact from "./pages/webshop/Contact";
import AboutUs from "./pages/webshop/AboutUs";
import Layout from "./components/webshop/Layout";
import AdminLayout from "./components/admin/AdminLayout";
import CreateProduct from "./pages/admin/CreateProduct";
import AdminDeleteProduct from "./pages/admin/AdminDeleteProduct";
import AdminModifyProduct from "./pages/admin/AdminModifyProduct";
import UserLogin from "./pages/webshop/UserLogin";
import Registration from "./pages/webshop/Registration";
import { LoggedInUserContext } from "./contexts/LoggedInUserContext";
import { AdminContext } from "./contexts/AdminContext";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminAuth from "./components/admin/auth/AdminAuth";
import AdminLogin from "./pages/admin/AdminLogin";
import Cart from "./pages/webshop/Cart";
import { CartContext } from "./contexts/CartContext";
import AdminCustomers from "./pages/admin/AdminCustomers";
import Orders from "./pages/webshop/Orders";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrdersDetails from "./pages/admin/AdminOrdersDetails";
import AdminNewCategory from "./pages/admin/AdminNewCategory";
import AdminCategoryList from "./pages/admin/AdminCategoryList";
import AdminDeleteCategory from "./pages/admin/AdminDeleteCategory";
import AdminModifyCategory from "./pages/admin/AdminModifyCategory"
import UserProfile from "./pages/webshop/UserProfile";

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
				element: <UserLogin />,
			},
			{
				path: "/regisztracio",
				element: <Registration />,
			},
			{
				path: "/kosar",
				element: <Cart />,
			},
			{
				path: "/megrendeleseim",
				element: <Orders />,
			},
			{
				path: "/:uid/profil",
				element: <UserProfile/>
			}
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
			{
				path: "/admin/vasarlok",
				element: <AdminCustomers />,
			},
			{
				path: "/admin/megrendelesek",
				element: <AdminOrders />,
			},
			{
				path: "/admin/megrendelesek/:megrendelesId",
				element: <AdminOrdersDetails />,
			},
			{
				path: "/admin/kategoriak/uj-kategoria",
				element: <AdminNewCategory />
			},
			{
				path: "/admin/kategoria",
				element: <AdminCategoryList/>
			},
			{
				path: "/admin/kategoria/:id/torles",
				element: <AdminDeleteCategory />
			},
			{
				path: "/admin/kategoria/:id/modositas",
				element:<AdminModifyCategory />
			}
		],
	},
]);
function App() {
	const [user, setUser] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [cart, setCart] = useState([]);

	return (
		<AdminContext.Provider value={[isAdmin, setIsAdmin]}>
			<LoggedInUserContext.Provider value={[user, setUser]}>
				<CartContext.Provider value={[cart, setCart]}>
					<RouterProvider router={router}></RouterProvider>
					<ToastContainer />
				</CartContext.Provider>
			</LoggedInUserContext.Provider>
		</AdminContext.Provider>
	);
}

export default App;
