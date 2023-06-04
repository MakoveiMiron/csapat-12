import React, { useState, useEffect } from "react";

export function validateInput(name, inputValue) {
	if (name === "title") {
		if (
			inputValue.trim() === "" ||
			/^\d+$/.test(inputValue) ||
			inputValue.length < 2
		) {
			return {
				isValid: false,
				errorMessage: "Érvénytelen terméknév",
			};
		} else {
			return {
				isValid: true,
				errorMessage: "",
			};
		}
	} else if (name === "price") {
		if (inputValue.trim() === "" || isNaN(inputValue) || inputValue <= 0) {
			return {
				isValid: false,
				errorMessage: "Érvénytelen ár",
			};
		} else {
			return {
				isValid: true,
				errorMessage: "",
			};
		}
	}
}

const InputValidation = ({ label, type, name, value, onChange }) => {
	const [isTouched, setIsTouched] = useState(false);
	const [isValid, setIsValid] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if (isTouched) {
			const { isValid, errorMessage } = validateInput(name, value);
			setIsValid(isValid);
			setErrorMessage(errorMessage);
		}
	}, [name, value, isTouched]);

	const handleBlur = () => {
		setIsTouched(true);
	};

	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={handleBlur}
				className={!isValid ? "invalid" : ""}
			/>
			{!isValid && isTouched && <p className="error">{errorMessage}</p>}
		</div>
	);
};

export default InputValidation;
