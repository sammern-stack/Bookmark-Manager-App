import { Formik, Form } from "formik";
import { useSignupForm } from "../hooks/useSignupForm";
import { Button } from "../../../components";
import FormField from "./FormField";

export default function LoginForm() {
  const { initialValues, validationSchema, onSubmit } = useSignupForm();

  return (
    <Formik {...{ initialValues, validationSchema, onSubmit }}>
      {({ isSubmitting }) => (
        <Form className="form-page__form">
          <FormField type="username" errMsg="username" label="Full name" />
          <FormField type="email" errMsg="email" label="Email address" />
          <FormField type="password" errMsg="password" label="Password" />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
