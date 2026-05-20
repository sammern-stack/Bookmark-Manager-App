import { Formik, Form } from "formik";
import { useForgotPswdForm } from "../hooks/useForgotPswdForm";
import { Button } from "../../../components";
import FormField from "./FormField";

export default function LoginForm() {
  const { initialValues, validationSchema, onSubmit } = useForgotPswdForm();

  return (
    <Formik {...{ initialValues, validationSchema, onSubmit }}>
      {({ isSubmitting }) => (
        <Form className="form-page__form">
          <FormField type="email" errMsg="email" label="Email" />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Confirming email..." : "Confirm"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
