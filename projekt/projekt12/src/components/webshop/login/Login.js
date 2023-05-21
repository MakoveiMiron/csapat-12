import "./login.css";
import React, { useState, useContext, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../constans/firebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../../../contexts/LoggedInUserContext";
import { API_URL } from "../../../constans/firebaseConstans";
import { toast } from "react-toastify";
import { CartContext } from "../../../contexts/CartContext";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useContext(LoggedInUserContext);
	const [cart, setCart] = useContext(CartContext);

	const onLogin = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				console.log(userCredential);
				toast.success("Sikeres belépés!", {
					position: toast.POSITION.TOP_RIGHT,
				});

				fetch(`${API_URL}vasarlok/${userCredential.user.uid}/cart.json`)
					.then((response) => response.json())
					.then((data) => {
						const cartData = data ? data : {};
						setCart(cartData);
						console.log("Kosár tartalom:", cartData);

						fetch(`${API_URL}vasarlok/${userCredential.user.uid}.json`)
							.then((response) => response.json())
							.then((data) => {
								const resp = data ? data : {};
								setUser({
									name: resp.name || "",
									email: userCredential.user.email,
									uid: userCredential.user.uid,
								});
							})
							.catch((error) => {
								console.log(error);
							});
					})
					.catch((error) => {
						console.log(error);
					});

				navigate("/");
			})
			.catch((error) => {
				toast.error("Helytelen email-cím vagy jelszó!", {
					position: toast.POSITION.TOP_RIGHT,
				});
			});
	};

	useEffect(() => {
		if (user) navigate("/");
	}, []);

	return (
		<>
			<main className="loginMain">
				<section>
					<div className="wrapper">
						<form>
							<div>
								<h1 className="login-h1">Bejelentkezés</h1>
								<label htmlFor="email-address"></label>
								<p>
									<input
										className="login-input"
										id="email-address"
										name="email"
										type="email"
										required
										placeholder="Email cim"
										onChange={(e) => setEmail(e.target.value)}
									/>
								</p>
							</div>

							<div>
								<label htmlFor="password"></label>
								<p>
									<input
										className="login-input"
										id="password"
										name="password"
										type="password"
										required
										placeholder="Jelszó"
										onChange={(e) => setPassword(e.target.value)}
									/>
								</p>
							</div>

							<div>
								<button className="login-button" onClick={onLogin}>
									Belépés
								</button>
							</div>
						</form>

						<p className="text-sm text-white text-center">
							Nincs fiókod? <NavLink to="/regisztracio">Regisztrálok</NavLink>
						</p>
					</div>
				</section>
			</main>
		</>
	);
};

export default Login;
