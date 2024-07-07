import './form.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import rules from './validate-rules';
import Input from './components/input/input';
import Select from './components/select/select';
import Checkbox from './components/checkbox/checkbox';

const SEX_OPTIONS = [
	{ value: 'М', label: 'М' },
	{ value: 'Ж', label: 'Ж' },
];

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
					<Input name="username" type="text" placeholder="Имя пользователя" register={register} formErrors={errors} />
					<Input name="email" type="email" placeholder="Email" register={register} formErrors={errors} />
					<Input name="password" type="password" placeholder="Пароль" register={register} formErrors={errors} />
					<Input name="confirmPassword" type="password" placeholder="Подтверждение пароля" register={register} formErrors={errors} />
				</div>
			</div>
			<div className="form__section">
				<div className="form__inputs">
					<Checkbox name="addition" placeholder="Дополнительная информация" register={register} formErrors={errors} />
				</div>
				{isAddition && (
					<div className="form__inputs">
						<Input name="address" type="text" placeholder="Адрес" register={register} formErrors={errors} />
						<Select name="sex" placeholder="Выберите пол" options={SEX_OPTIONS} control={control} formErrors={errors} />
					</div>
				)}
			</div>
			<div className="form__section">
				<Checkbox name="agreement" placeholder="Согласие с политикой конфиденциальности" register={register} formErrors={errors} />
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
