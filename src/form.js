import './form.scss';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import rules from './validate-rules';
import Select from 'react-select';

export function Form() {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		control,
		formState: { errors, isValid },
	} = useForm({ resolver: yupResolver(rules) });

	const isAddition = watch('addition');

	const submitBtn = useRef(null);

	if (isValid) {
		submitBtn.current?.focus();
	}

	function onSubmit(data) {
		console.log(data);
	}

	return (
		<form className="form" onSubmit={handleSubmit(onSubmit)}>
			<div className="form__section">
				<div className="form__inputs">
					<label className="form__label">
						<input className="form__input" {...register('username')} type="text" placeholder="Имя пользователя" />
						{errors.username && <span className="form__error">{errors.username.message}</span>}
					</label>
					<label className="form__label">
						<input className="form__input" {...register('email')} type="email" placeholder="Email" />
						{errors.email && <span className="form__error">{errors.email.message}</span>}
					</label>
					<label className="form__label">
						<input className="form__input" {...register('password')} type="password" placeholder="Пароль" />
						{errors.password && <span className="form__error">{errors.password.message}</span>}
					</label>
					<label className="form__label">
						<input className="form__input" {...register('confirmPassword')} type="password" placeholder="Подтверждение пароля" />
						{errors.confirmPassword && <span className="form__error">{errors.confirmPassword.message}</span>}
					</label>
				</div>
			</div>
			<div className="form__section">
				<div className="form__inputs">
					<label className="form__label">
						<input className="form__checkbox" {...register('addition')} type="checkbox" />
						<span>Дополнительная информация</span>
						{errors.addition && <span className="form__error">{errors.addition.message}</span>}
					</label>
				</div>
				{isAddition && (
					<div className="form__inputs">
						<label className="form__label">
							<input className="form__input" {...register('address')} type="text" placeholder="Адрес" />
							{errors.address && <span className="form__error">{errors.address.message}</span>}
						</label>
						<label className="form__label">
							<Controller
								name="sex"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										options={[
											{ value: 'М', label: 'М' },
											{ value: 'Ж', label: 'Ж' },
										]}
										placeholder="Ваш пол"
									/>
								)}
							/>
							{errors.sex && <span className="form__error">{errors.sex.message}</span>}
						</label>
					</div>
				)}
			</div>
			<div className="form__section">
				<label className="form__label">
					<input className="form__checkbox" {...register('agreement')} type="checkbox" />
					<span>Согласие с политикой конфиденциальности</span>
					{errors.agreement && <span className="form__error">{errors.agreement.message}</span>}
				</label>
			</div>
			<div className="form__buttons">
				<button className="form__button" type="button" onClick={() => reset()}>
					Сбросить
				</button>
				<button className="form__button" type="submit" ref={submitBtn}>
					Зарегистрироваться
				</button>
			</div>
		</form>
	);
}
