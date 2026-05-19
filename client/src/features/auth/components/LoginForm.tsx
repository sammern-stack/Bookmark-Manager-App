import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLoginForm } from "../hooks/useLoginForm";
import { Button } from "../../../components";
import "../styles.scss";

export default function LoginForm() {
  const { initialValues, validationSchema, onSubmit } = useLoginForm();

  return (
    <>
      <Formik {...{ initialValues, validationSchema, onSubmit }}>
        {({ isSubmitting }) => (
          <Form className="form-page__form">
            <div className="form-page__form-field">
              <div>
                <label htmlFor="email">Email</label>
                <Field name="email" id="email" type="email" />
              </div>
              <ErrorMessage name="email" component="p" className="helper" />
            </div>

            <div className="form-page__form-field">
              <div>
                <label htmlFor="password">Password</label>
                <Field name="password" id="password" type="password" />
              </div>
              <ErrorMessage name="password" component="p" className="helper" />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Log in"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
