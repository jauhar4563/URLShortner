// import * as Yup from "yup";

// export interface FormValues {
//   email: string;
//   password: string;
// }

// export const initialValues: FormValues = {
//   email: "",
//   password: "",
// };

export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password: string) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(String(password));
};
