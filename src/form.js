import { useState } from "react";
import "./form.scss";

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const sendFormData = (formData) => {
	console.log(formData);
};

const initialState = {
	login: "",
	email: "",
	password: "",
	passwordRepeat: "",
};

const rules = {
	login: { required: true, min: 3, max: 10 },
	email: { required: true, regExp: emailRegExp },
	password: { required: true, repeat: "passwordRepeat" },
	passwordRepeat: { required: true, repeat: "password" },
};

const rulesHandlers = {
	required: (inputValue, ruleValue) => ruleValue && !inputValue.length,
	min: (inputValue, ruleValue) => inputValue.length < ruleValue,
	max: (inputValue, ruleValue) => inputValue.length > ruleValue,
	regExp: (inputValue, ruleValue) => !ruleValue.test(inputValue),
	repeat: (inputValue, ruleValue) => document.querySelector(`[name=${ruleValue}]`).value !== inputValue,
};

const ruleErrorMessages = {
	required: "Поле должно быть заполнено",
	min: "Длина не должна быть меньше {value} символов",
	max: "Длина не должна превышать {value} символов",
	regExp: "Неверный формат",
	repeat: "Значение должно совпадать с полем {value}",
};

function errorsHandler(field, value, formErrors, setFormErrors) {
	const fieldRules = Object.entries(rules[field]);

	let errorMessage = "";
	let repeatField = null;

	fieldRules.forEach(([rule, ruleValue]) => {
		const isError = rulesHandlers[rule](value, ruleValue);

		if (rule === 'repeat') {
			repeatField = ruleValue;
		}

		if (isError) {
			errorMessage = ruleErrorMessages[rule].replace("{value}", ruleValue);
		}
	});

	setFormErrors({ 
		...formErrors, 
		[field]: errorMessage,
		...(repeatField ? {[repeatField] : ''} : {}),
	});
}


function isFormErrorHandler(formErrors) {
	return Object.values(formErrors).some((error) => !!error);
}


function useForm() {
	const [formData, setFormData] = useState(initialState);
	const [formErrors, setFormErrors] = useState(initialState);

	return {
		getFromData: () => formData,

		updateFormData: (field, value) => {
			setFormData({ ...formData, [field]: value });
			errorsHandler(field, value, formErrors, setFormErrors);
		},

		getFromErrors: () => formErrors,

		isFormError: () => isFormErrorHandler(formErrors),
	};
}

export function Form() {
	const {
		getFromData,
		updateFormData,
		getFromErrors,
		isFormError,
	} = useForm();

	function submitHandler(event) {
		event.preventDefault();

		if (isFormError()) return;

		sendFormData(getFromData());
	}

	function changeHandler({ target }) {
		const { name, value } = target;

		updateFormData(name, value);
	}

	const { login, email, password, passwordRepeat } = getFromData();
	const {
		login: loginError,
		email: emailError,
		password: passwordError,
		passwordRepeat: passwordRepeatError,
	} = getFromErrors();

	return (
		<form className="form" onSubmit={submitHandler}>
			<div className="form__inputs">
				<label className="form__label">
					<input
						className="form__input"
						type="text"
						name="login"
						placeholder="Логин"
						value={login}
						onChange={changeHandler}
					/>
					{!!loginError && <span className="form_error">{loginError}</span>}
				</label>
				<label className="form__label">
					<input
						className="form__input"
						type="email"
						name="email"
						placeholder="Почта"
						value={email}
						onChange={changeHandler}
					/>
					{!!emailError && <span className="form_error">{emailError}</span>}
				</label>
				<label className="form__label">
					<input
						className="form__input"
						type="password"
						name="password"
						placeholder="Пароль"
						value={password}
						onChange={changeHandler}
					/>
					{!!passwordError && (
						<span className="form_error">{passwordError}</span>
					)}
				</label>
				<label className="form__label">
					<input
						className="form__input"
						type="password"
						name="passwordRepeat"
						placeholder="Повторите пароль"
						value={passwordRepeat}
						onChange={changeHandler}
					/>
					{!!passwordRepeatError && (
						<span className="form_error">{passwordRepeatError}</span>
					)}
				</label>
			</div>
			<div className="form__buttons">
				<button type="submit" disabled={isFormError()}>
					Зарегистрироваться
				</button>
			</div>
		</form>
	);
}
