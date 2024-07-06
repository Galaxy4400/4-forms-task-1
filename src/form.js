import "./form.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setLocale } from "yup";
import customErrorMessages from "./error-messages";
import emailRegex from "./email-regexp";
import { useRef } from "react";

setLocale(customErrorMessages);

const schema = yup.object().shape({
	username: yup.string().required().min(3),
	email: yup.string().required().matches(emailRegex),
	password: yup.string().required().min(6),
	confirmPassword: yup.string().required().oneOf([yup.ref("password")], "Пароль не совпадает"),
	agreement: yup.boolean().oneOf([true], "Вы должны согласиться"),
});

export function Form() {
	const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({ resolver: yupResolver(schema) });

	const submitBtn = useRef(null);

	if (isValid && submitBtn.current) {
		submitBtn.current.focus();
	}

	function onSubmit(data) {
		console.log(data);
	}

	return (
		<form className="form" onSubmit={handleSubmit(onSubmit)}>
			<div className="form__section">
				<div className="form__inputs">
					<label className="form__label">
						<input
							className="form__input"
							type="text"
							placeholder="Имя пользователя"
							{...register("username")}
						/>
						{errors.username && (
							<span className="form__error">{errors.username.message}</span>
						)}
					</label>
					<label className="form__label">
						<input
							className="form__input"
							type="email"
							placeholder="Email"
							{...register("email")}
						/>
						{errors.email && (
							<span className="form__error">{errors.email.message}</span>
						)}
					</label>
					<label className="form__label">
						<input
							className="form__input"
							type="password"
							placeholder="Пароль"
							{...register("password")}
						/>
						{errors.password && (
							<span className="form__error">{errors.password.message}</span>
						)}
					</label>
					<label className="form__label">
						<input
							className="form__input"
							type="password"
							placeholder="Подтверждение пароля"
							{...register("confirmPassword")}
						/>
						{errors.confirmPassword && (
							<span className="form__error">
								{errors.confirmPassword.message}
							</span>
						)}
					</label>
				</div>
			</div>
			<div className="form__section">
				<label className="form__label">
					<input
						className="form__checkbox"
						type="checkbox"
						{...register("agreement")}
					/>
					<span>Согласие с политикой конфиденциальности</span>
					{errors.agreement && (
						<span className="form__error">{errors.agreement.message}</span>
					)}
				</label>
			</div>
			<div className="form__buttons">
				<button className="form__button" type="button" onClick={() => reset()}>
					Сбросить
				</button>
				<button
					className="form__button"
					type="submit"
					disabled={!isValid && submitBtn.current}
					ref={submitBtn}
				>
					Зарегистрироваться
				</button>
			</div>
		</form>
	);
}
