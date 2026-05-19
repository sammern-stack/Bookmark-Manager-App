import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { findUserByEmail } from "../../../api/user";
import type { FormikHelpers } from "formik";

export const useForgotPswdForm = () => {
  const navigate = useNavigate();

  const initialValues = { email: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const onSubmit = async (
    values: { email: string },
    { setFieldError }: FormikHelpers<{ email: string }>,
  ) => {
    const res = await findUserByEmail(values.email);
    if (!res.ok) {
      setFieldError("email", "Email not found");
      return;
    }
    navigate("/reset-password", { state: { userId: res.data.user } });
  };

  return { initialValues, validationSchema, onSubmit };
};
