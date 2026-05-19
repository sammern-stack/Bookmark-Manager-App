import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSignupForm } from "../hooks/useSignupForm";
import { Button } from "../../../components";

export default function LoginForm() {
  const { initialValues, validationSchema, onSubmit } = useSignupForm();

  return (
    <>
      <Formik {...{ initialValues, validationSchema, onSubmit }}>
        {({ isSubmitting }) => (
          <Form className="form-page__form">
            <div className="form-page__form-field">
              <div>
                <label htmlFor="username">Full name</label>
                <Field name="username" id="username" type="text" />
              </div>
              <ErrorMessage name="username" component="p" className="helper" />
            </div>

            <div className="form-page__form-field">
              <div>
                <label htmlFor="email">Email address</label>
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
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
