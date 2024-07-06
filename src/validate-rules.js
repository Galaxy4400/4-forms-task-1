import * as yup from "yup";
import { setLocale } from "yup";
import customErrorMessages from "./error-messages";
import emailRegex from "./email-regexp";

setLocale(customErrorMessages);

const rules = yup.object().shape({
	username: yup.string().required().min(3),
	email: yup.string().required().matches(emailRegex),
	password: yup.string().required().min(6),
	confirmPassword: yup.string().required().oneOf([yup.ref("password")], "Пароль не совпадает"),
	agreement: yup.boolean().oneOf([true], "Вы должны согласиться"),
	addition: yup.boolean(),
	address: yup.string().when('addition', {
		is: true,
		then: (schema) => schema.required(),
	}),
	sex: yup.object().when('addition', {
		is: true,
		then: (schema) => schema.required(),
	}),
});

export default rules;
