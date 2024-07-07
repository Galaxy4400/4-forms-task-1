export default function Checkbox({name, placeholder, register, formErrors}) {
	return (
		<label className="form__label">
			<input className="form__checkbox" {...register(name)} type="checkbox" />
			<span>{placeholder}</span>
			{formErrors[name] && <span className="form__error">{formErrors[name].message}</span>}
		</label>
	)
}
