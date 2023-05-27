import React, { useState, useContext, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../constans/firebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";
import { AdminContext } from "../../contexts/AdminContext";
import { API_URL } from "../../constans/firebaseConstans";
import { toast } from "react-toastify";

const AdminLogin = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isAdmin, setisAdmin] = useContext(AdminContext);

	const onLogin = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, username, password)
			.then((userCredential) => {
				const userId = userCredential.user.uid;
				fetch(`${API_URL}admins/${userId}.json`)
					.then((response) => response.json())
					.then((adminData) => {
						if (adminData) {
							setisAdmin(true);
							toast.success("Sikeres belépés!", {
								position: toast.POSITION.TOP_RIGHT,
							});
							navigate("/admin");
						} else {
							toast.error("Nincs admin jogosultság!", {
								position: toast.POSITION.TOP_RIGHT,
							});
						}
					})
					.catch((error) => {
						console.error(error);
					});
			})
			.catch((error) => {
				toast.error("Helytelen felhasználónév vagy jelszó!", {
					position: toast.POSITION.TOP_RIGHT,
				});
			});
	};

	return (
		<>
			<main>
				<section>
					<NavLink to={"/"}>Főoldal</NavLink>
					<div>
						<p> Admin Belépés</p>

						<form>
							<div>
								<label htmlFor="username">Username</label>
								<input
									id="username"
									type="text"
									required
									placeholder="username"
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>

							<div>
								<label htmlFor="password">Password</label>
								<input
									id="password"
									name="password"
									type="password"
									required
									placeholder="Password"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							<div>
								<button onClick={onLogin}>Login</button>
							</div>
						</form>
					</div>
				</section>
			</main>
		</>
	);
};

export default AdminLogin;
