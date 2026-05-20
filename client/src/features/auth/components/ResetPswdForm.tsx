import { Formik, Form } from "formik";
import { useResetPswdForm } from "../hooks/useResetPswdForm";
import { Button } from "../../../components";
import FormField from "./FormField";

export default function LoginForm() {
  const { initialValues, validationSchema, onSubmit } = useResetPswdForm();

  return (
    <Formik {...{ initialValues, validationSchema, onSubmit }}>
      {({ isSubmitting }) => (
        <Form className="form-page__form">
          <FormField
            type="password"
            errMsg="confirmPassword"
            label="Password"
          />

          <FormField
            type="confirmPassword"
            errMsg="confirmPassword"
            label="Confirm password"
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Resetting password..." : "Reset password"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
