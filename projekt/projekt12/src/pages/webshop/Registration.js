import { useContext, useState } from "react";
import { API_URL } from "../../constans/firebaseConstans.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../constans/firebaseConfig.js";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext.js";
import "./registration.css";
import { validateSignupForm } from "../../utils/registerValidation.js";

const Signup = () => {
	const navigate = useNavigate();
	const [user, setUser] = useContext(LoggedInUserContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [errors, setErrors] = useState({});

	const handleEmailChange = async (e) => {
		const newEmail = e.target.value;
		setEmail(newEmail);

		const formErrors = await validateSignupForm(name, newEmail, password);
		setErrors((prevErrors) => ({
			...prevErrors,
			emailError: formErrors.emailError,
		}));
	};

	const handlePasswordChange = async (e) => {
		const newPassword = e.target.value;
		setPassword(newPassword);

		const formErrors = await validateSignupForm(name, email, newPassword);
		setErrors((prevErrors) => ({
			...prevErrors,
			passwordError: formErrors.passwordError,
		}));
	};

	const handleNameChange = async (e) => {
		const newName = e.target.value;
		setName(newName);

		const formErrors = await validateSignupForm(newName, email, password);
		setErrors((prevErrors) => ({
			...prevErrors,
			nameError: formErrors.nameError,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formErrors = await validateSignupForm(name, email, password);

		if (!formErrors.isValid) {
			setErrors(formErrors);
			return;
		}

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			setUser({ name, email, uid: userCredential.user.uid });
			console.log(user);

			const response = await fetch(
				`${API_URL}vasarlok/${userCredential._tokenResponse.localId}.json`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						uid: userCredential._tokenResponse.localId,
						name,
						email,
					}),
				}
			);

			if (response.ok) {
				toast.success("Sikeres regisztráció!", {
					position: toast.POSITION.TOP_RIGHT,
				});
				navigate("/belepes");
			} else {
				toast.error("A regisztráció sikertelen volt!", {
					position: toast.POSITION.TOP_RIGHT,
				});
			}
		} catch (error) {
			toast.error("A regisztráció sikertelen volt!", {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
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
									value={name}
									onChange={handleNameChange}
									required
									placeholder="Teljes név"
								/>
								{errors.nameError && <p className="error">{errors.nameError}</p>}
							</div>

							<div>
								<label htmlFor="email-address"></label>
								<input
									type="email"
									value={email}
									onChange={handleEmailChange}
									required
									placeholder="Email cím"
								/>
								{errors.emailError && <p className="error">{errors.emailError}</p>}
							</div>

							<div>
								<label htmlFor="password"></label>
								<input
									type="password"
									value={password}
									onChange={handlePasswordChange}
									placeholder="Jelszó"
								/>
								{errors.passwordError && (
									<p className="error">{errors.passwordError}</p>
								)}
							</div>

							<button type="submit" onClick={handleSubmit}>
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
