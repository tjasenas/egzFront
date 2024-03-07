import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import InputField from "../components/Ul/InputField";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vardo laukelis yra būtinas"),
      email: Yup.string().email("Pašto adresas turi būti galiojantis.").required("Email laukelis yra būtinas"),
      password: Yup.string().required("Slaptažodžio laukelis yra būtinas"),
      passwordConfirmation: Yup.string().oneOf([Yup.ref("password"), null], "Slaptažodžiai turi sutapti"),
    }),
    onSubmit: (values) => {
      console.log("values ===", values);
      submitHandler(values);
    },
  });

  async function submitHandler(data) {
    try {
      const res = await axios.post("http://localhost:3000/api/register", data);
      toast.success(res.data.msg);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="text-2xl my-6">Registracija</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <InputField id="name" label="Vardas" formik={formik} placeholder="Vardas" />
        </div>
        <div className="mb-4">
          <InputField id="email" type="email" label="El. paštas" formik={formik} placeholder="email" />
        </div>

        <div className="mb-4">
          <InputField id="password" type="password" label="Slaptažodis" formik={formik} placeholder="Slaptažodis" />
        </div>
        <div className="mb-4">
          <InputField id="passwordConfirmation" type="password" label="Pakartoti slaptažodis" formik={formik} placeholder="Pakartoti slaptažodis" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Registruotis
        </button>
      </form>
    </>
  );
}
