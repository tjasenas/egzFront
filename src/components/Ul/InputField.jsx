import React from "react";

export default function InputField({ id, formik, label, textarea = false, type = "text", placeholder }) {
  const textInput = (
    <>
      <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input type={type} value={formik.values[id]} onBlur={formik.handleBlur} onChange={formik.handleChange} id={id} name={id} placeholder={placeholder} className="w-full p-2 border border-gray-300 rounded" />
      {formik.touched[id] && formik.errors[id] && <p className="text-red-500 ">{formik.errors[id]}</p>}
    </>
  );

  const textareaField = (
    <>
      <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <textarea type="text" value={formik.values.description} onBlur={formik.handleBlur} onChange={formik.handleChange} id={id} name={id} className="w-full p-2 border border-gray-300 rounded">
        {formik.values.description}
      </textarea>
      {formik.touched[id] && formik.errors[id] && <p className="text-red-500 ">{formik.errors[id]}</p>}
    </>
  );

  return textarea ? textareaField : textInput;
}
