import { useContext, useState } from "react";
import { API_URL } from "../../constans/firebaseConstans.js";
import {
	createUserWithEmailAndPassword,
	fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../../constans/firebaseConfig.js";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext.js";
import "./registration.css";
import {
	validateEmail,
	checkEmailAvailability,
} from "../../utils/registerValidation.js";

const Signup = () => {
	const navigate = useNavigate();
	const [user, setUser] = useContext(LoggedInUserContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [emailError, setEmailError] = useState("");

	const handleEmailChange = (e) => {
		const newEmail = e.target.value;
		setEmail(newEmail);
		const emailValidation = validateEmail(newEmail);
		setEmailError(emailValidation.errorMessage);

		if (emailValidation.isValid) {
			checkEmailAvailability(newEmail).then((isEmailAvailable) => {
				setEmailError(isEmailAvailable.errorMessage);
			});
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		if (emailError) {
			return;
		}

		const isEmailAvailable = await checkEmailAvailability(email);
		if (!isEmailAvailable.isValid) {
			setEmailError(isEmailAvailable.errorMessage);
			return;
		}

		await createUserWithEmailAndPassword(auth, email, password, name)
			.then((userCredential) => {
				// Signed in
				setUser({ name, email, uid: userCredential.user.uid });
				console.log(user);
				fetch(`${API_URL}vasarlok/${userCredential._tokenResponse.localId}.json`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						uid: userCredential._tokenResponse.localId,
						name,
						email,
					}),
				})
					.then((data) => data.json())
					.then((resp) => {
						toast.success("Sikeres regisztráció!", {
							position: toast.POSITION.TOP_RIGHT,
						});
					});
				navigate("/belepes");
			})
			.catch((error) => {
				toast.error("A regisztráció sikertelen volt!", {
					position: toast.POSITION.TOP_RIGHT,
				});
			});
	};

	return (
		<main className="regMain">
			<section>
				<div className="wrapper-reg">
					<div>
						<h1> Regisztráció </h1>
						<form>
							<div>
								<label htmlFor="name"></label>
								<input
									type="text"
									label="Full name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									placeholder="Teljes név"
								/>
							</div>

							<div>
								<label htmlFor="email-address"></label>
								<input
									type="email"
									label="Email address"
									value={email}
									onChange={handleEmailChange}
									onBlur={handleEmailChange} // Kilépés az input mezőből
									required
									placeholder="Email cím"
								/>
								{emailError && <p>{emailError}</p>}
							</div>

							<div>
								<label htmlFor="password"></label>
								<input
									type="password"
									label="Create password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									placeholder="Jelszó"
								/>
							</div>

							<button type="submit" onClick={onSubmit}>
								Regisztráció
							</button>
						</form>

						<p>
							Van már fiókod? <NavLink to="/belepes">Belépek</NavLink>
						</p>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Signup;
