import * as Yup from "yup";
import { useAuthStore } from "../../../stores";
import { useNavigate } from "react-router-dom";
import type { FormikHelpers } from "formik";
import type { NewUser } from "../../../types";

export const useSignupForm = () => {
  const { signup } = useAuthStore();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(3, "Min 3 characters").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(8, "Min 8 characters").required("Required"),
  });

  const onSubmit = async (
    values: NewUser,
    { setFieldError }: FormikHelpers<NewUser>,
  ) => {
    const res = await signup(values);

    if (!res.ok) {
      setFieldError("email", res.error);
      return;
    }

    navigate("/login");
  };

  return { initialValues, validationSchema, onSubmit };
};
