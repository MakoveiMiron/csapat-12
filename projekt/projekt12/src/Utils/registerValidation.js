import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../constans/firebaseConfig";

export const validateEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const isValid = emailRegex.test(email);
	const errorMessage = isValid ? "" : "Érvénytelen e-mail cím";
	return {
		isValid,
		errorMessage,
	};
};

export const checkEmailAvailability = async (email) => {
	try {
		const signInMethods = await fetchSignInMethodsForEmail(auth, email);
		if (signInMethods.length === 0) {
			return {
				isValid: true,
				errorMessage: "",
			};
		} else {
			return {
				isValid: false,
				errorMessage: "Az email cím már foglalt.",
			};
		}
	} catch (error) {
		console.log(error);
		return {
			isValid: false,
			errorMessage: "Hiba történt az email cím ellenőrzése közben.",
		};
	}
};

export const validateName = (name) => {
	if (!name.trim()) {
		return "A név kitöltése kötelező";
	}
	return "";
};

export const validatePassword = (password) => {
	if (!password.trim()) {
		return "A jelszó kitöltése kötelező";
	}
	return "";
};

export const validateSignupForm = async (name, email, password) => {
	const errors = {};

	errors.nameError = validateName(name);
	errors.passwordError = validatePassword(password);

	if (!email.trim()) {
		errors.emailError = "Az e-mail kitöltése kötelező";
	} else {
		const { isValid, errorMessage } = validateEmail(email);
		errors.emailError = errorMessage;

		if (isValid) {
			const emailAvailability = await checkEmailAvailability(email);
			if (!emailAvailability.isValid) {
				errors.emailError = emailAvailability.errorMessage;
			}
		}
	}

	return errors;
};
