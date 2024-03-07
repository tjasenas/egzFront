import React from "react";

export default function SelectBox({ id, label, options, formik }) {
  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <select value={formik.values[id]} onBlur={formik.handleBlur} onChange={formik.handleChange} className="w-full p-2 border border-gray-300 rounded cursor-pointer" id={id} name={id}>
        <option value="">Visos kategorijos</option>
        {options.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </select>
      {formik.touched[id] && formik.errors[id] && <p className="text-red-500 ">{formik.errors[id]}</p>}
    </>
  );
}
