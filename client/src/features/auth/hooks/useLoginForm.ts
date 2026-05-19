import * as Yup from "yup";
import { useAuthStore } from "../../../stores";
import { useNavigate } from "react-router-dom";
import type { FormikHelpers } from "formik";
import type { User } from "../../../types";

export const useLoginForm = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (
    values: User,
    { setFieldError }: FormikHelpers<User>,
  ) => {
    const res = await login(values);

    if (!res.ok) {
      setFieldError("password", res.error);
      return;
    }

    navigate("/");
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
  };
};
