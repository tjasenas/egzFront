import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../components/Ul/InputField";
import toast from "react-hot-toast";

export default function Categories() {
  const [categories, setCategiries] = useState([]);
  useEffect(() => {
    async function getCategories() {
      try {
        const res = await axios.get("http://localhost:3000/api/categories");
        setCategiries(res.data);
      } catch (errors) {
        console.log("Fetching categories failed");
      }
    }
    getCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Laukelis yra būtinas"),
    }),
    onSubmit: (values) => {
      console.log("values ===", values);
      submitHandler(values);
    },
  });

  async function submitHandler(data) {
    try {
      const res = await axios.post("http://localhost:3000/api/addCategory", data);
      toast.success(res.data.msg);
      //   navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2 className="text-2xl my-6">Kategorijos</h2>
      <div className="grid grid-cols-1 gap-4">
        {categories.length > 0 &&
          categories.map((cat) => (
            <div key={cat.id}>
              ID:{cat.id} - Pavadinimas: {cat.name}
            </div>
          ))}
      </div>

      <h2 className="text-2xl my-6">Pridėti kategorija</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <InputField id="name" label="Kategorijos pavadinimas" formik={formik} placeholder="" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Pridėti
        </button>
      </form>
    </>
  );
}
