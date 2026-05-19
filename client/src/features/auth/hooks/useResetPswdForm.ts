import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUser } from "../../../api/user";
import type { FormikHelpers } from "formik";

type InitialValues = {
  password: string,
  confirmPassword: string
}

export const useResetPswdForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const userId = state?.userId;

  const initialValues: InitialValues = { password: "", confirmPassword: "" };

  const validationSchema = Yup.object({
    password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = async (
    values: InitialValues,
    { setFieldError }: FormikHelpers<InitialValues>,
  ) => {
    if (!userId) {
      setFieldError("password", "Session expired, please try again");
      navigate("/forgot-password");
      return;
    }

    const res = await updateUser(userId, { password: values.password });
    if (!res.ok) {
      setFieldError("password", "Failed to reset password");
      return;
    }

    navigate("/login");
  };

  return { initialValues, validationSchema, onSubmit };
};
