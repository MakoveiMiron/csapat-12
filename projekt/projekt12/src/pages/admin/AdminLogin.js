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
				toast.success("Sikeres belépés!", {
					position: toast.POSITION.TOP_RIGHT,
				});
				// fetchet kitenni services-be
				fetch(`${API_URL}vasarlok/${userCredential._tokenResponse.localId}.json`)
					.then((data) => data.json())
					.then((resp) => {
						setisAdmin(true);
						navigate("/admin");
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
