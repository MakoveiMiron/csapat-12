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
