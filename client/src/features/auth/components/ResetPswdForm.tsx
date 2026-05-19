import { Formik, Form, Field, ErrorMessage } from "formik";
import { useResetPswdForm } from "../hooks/useResetPswdForm";
import { Button } from "../../../components";

export default function LoginForm() {
  const { initialValues, validationSchema, onSubmit } = useResetPswdForm();

  return (
    <>
      <Formik {...{ initialValues, validationSchema, onSubmit }}>
        {({ isSubmitting }) => (
          <Form className="form-page__form">
            <div className="form-page__form-field">
              <div>
                <label htmlFor="password">Password</label>
                <Field name="password" id="password" type="password" />
              </div>
              <ErrorMessage name="confirmPassword" component="p" className="helper" />
            </div>

            <div className="form-page__form-field">
              <div>
                <label htmlFor="confirmPassword">Confirm password</label>
                <Field
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                />
              </div>
              <ErrorMessage name="confirmPassword" component="p" className="helper" />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Resetting password..." : "Reset password"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
