import React from "react";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import InputField from "../components/Ul/InputField";

import { useAuthContext } from "../store/AuthCtx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "jonaitssi@gmail.com",
      password: "123456",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Pašto adresas turi būti galiojantis.").required("Email laukelis yra būtinas"),
      password: Yup.string().required("Slaptažodžio laukelis yra būtinas"),
    }),
    onSubmit: (values) => {
      console.log("values ===", values);
      submitHandler(values);
    },
  });

  async function submitHandler(data) {
    try {
      const res = await axios.post("http://localhost:3000/api/login", data);
      login(res.data.token);
      localStorage.setItem("favorites", JSON.stringify(res.data.favorites));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="text-2xl my-6">Prisijungimas</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <InputField id="email" label="El. paštas" formik={formik} placeholder="email" />
        </div>
        <div className="mb-4">
          <InputField id="password" label="Slaptažodis" type="password" formik={formik} placeholder="password" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </>
  );
}
