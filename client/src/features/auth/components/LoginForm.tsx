import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLoginForm } from "../hooks/useLoginForm";
import "../styles.scss";

export default function LoginForm() {
  const { initialValues, validationSchema, onSubmit } = useLoginForm();

  return (
    <>
      <Formik {...{ initialValues, validationSchema, onSubmit }}>
        {({ isSubmitting }) => (
          <Form>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="p" />

            <Field name="password" type="password" />
            <ErrorMessage name="password" component="p" />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
