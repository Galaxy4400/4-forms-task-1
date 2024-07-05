import { useState } from "react";

const sendFormData = (formData) => {
	console.log(formData);
};

const initialState = {
	email: '',
	password: '',
	passwordRepeat: '',
};

function useForm(initialState) {
	const [formData, setFormData] = useState(initialState);

	return {
		getFromData: () => formData,
		updateFormData: (field, value) => {
			setFormData({...formData, [field]: value});
		},
		resetForm: () => setFormData(initialState),
	};
}


export function Form() {
	const {getFromData, updateFormData, resetForm} = useForm(initialState);

	function submitHandler(event) {
		event.preventDefault();
		sendFormData(getFromData());
	}

	function changeHandler({ target }) {
		updateFormData(target.name, target.value);
	}

	const {email, password, passwordRepeat} = getFromData();


	return (
		<form onSubmit={submitHandler}>
			<input
				value={email}
				onChange={changeHandler}
				type="email"
				name="email"
				placeholder="Почта"
			/>
			<input
				value={password}
				onChange={changeHandler}
				type="password"
				name="password"
				placeholder="Пароль"
			/>
			<input
				value={passwordRepeat}
				onChange={changeHandler}
				type="password"
				name="passwordRepeat"
				placeholder="Повторите пароль"
			/>
			<button type="button" onClick={resetForm}>Сбросить</button>
			<button type="submit">Зарегистрироваться</button>
		</form>
	);
}