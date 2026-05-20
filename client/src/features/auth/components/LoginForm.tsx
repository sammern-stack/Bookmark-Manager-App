import { Formik, Form } from "formik";
import { useLoginForm } from "../hooks/useLoginForm";
import { Button } from "../../../components";
import FormField from "./FormField";

export default function LoginForm() {
  const { initialValues, validationSchema, onSubmit } = useLoginForm();

  return (
    <Formik {...{ initialValues, validationSchema, onSubmit }}>
      {({ isSubmitting }) => (
        <Form className="form-page__form">
          <FormField type="email" errMsg="email" label="Email" />
          <FormField type="password" errMsg="password" label="Password" />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log in"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
