import React from "react";
import { CustomInputProps } from "@/types/input";

const CustomInput: React.FC<CustomInputProps> = ({
  formik,
  id,
  name,
  placeholder,
  type,
}) => (
  <div>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={`${placeholder} *`}
      className="input input-bordered w-full text-black bg-white border border-gray-300 focus:border-blue-500"
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      required
    />
    {formik.touched[name] && formik.errors[name] && (
      <div className="text-red-500">{formik.errors[name]}</div>
    )}
  </div>
);

export default CustomInput;
