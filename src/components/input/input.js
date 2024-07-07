export default function Input({name, type, placeholder, register, formErrors}) {
	return (
		<label className="form__label">
			<input className="form__input" {...register(name)} type={type} placeholder={placeholder} />
			{formErrors[name] && <span className="form__error">{formErrors[name].message}</span>}
		</label>
	)
}
