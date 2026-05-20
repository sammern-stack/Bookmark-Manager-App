import { Field, ErrorMessage } from "formik";
import type { FormFieldProps } from "../../../types";

export default function FormField({ type, errMsg, label }: FormFieldProps) {
  const fieldType =
    type === "username"
      ? "text"
      : type === "confirmPassword"
        ? "password"
        : type;

  return (
    <div className="form-page__form-field">
      <div>
        <label htmlFor={type}>{label}</label>
        <Field name={type} id={type} type={fieldType} />
      </div>
      <ErrorMessage name={errMsg} component="p" className="helper" />
    </div>
  );
}
