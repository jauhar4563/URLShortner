import * as Yup from "yup";

export interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const initialValues: FormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});