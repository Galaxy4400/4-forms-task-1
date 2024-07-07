import { Controller } from 'react-hook-form';
import ReactSelect from 'react-select';

export default function Select({ name, options, placeholder, control, formErrors }) {
	return (
		<label className="form__label">
			<Controller
				name={name}
				control={control}
				render={({ field }) => <ReactSelect {...field} options={options} placeholder={placeholder} />}
			/>
			{formErrors[name] && <span className="form__error">{formErrors[name].message}</span>}
		</label>
	);
}
