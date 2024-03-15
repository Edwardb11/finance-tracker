import { FormikHandlers, FormikValues } from "formik";

export interface CustomInputProps {
  formik: formik;
  id: string;
  name: string;
  placeholder: string;
  type: string;
}


interface formik {
  values: FormikValues;
  handleChange: FormikHandlers["handleChange"];
  handleBlur: FormikHandlers["handleBlur"];
  touched: FormikValues;
  errors: FormikValues;
}