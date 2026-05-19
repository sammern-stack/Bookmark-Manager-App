import { Formik, Form, Field, ErrorMessage } from "formik";
import { useForgotPswdForm } from "../hooks/useForgotPswdForm";
import { Button } from "../../../components";

export default function LoginForm() {
  const { initialValues, validationSchema, onSubmit } = useForgotPswdForm();

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

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Confirming email..." : "Confirm"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
