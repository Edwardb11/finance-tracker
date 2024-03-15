import * as Yup from "yup";

export const validationSchema = (isLogin: boolean) => {
  let schema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  if (!isLogin) {
    schema = schema.shape({
      username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters"),
    });
  }

  return schema;
};
