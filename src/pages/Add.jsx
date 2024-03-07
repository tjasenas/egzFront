import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import InputField from "../components/Ul/InputField";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import SelectBox from "../components/Ul/SelectBox";

export default function Add() {
  const [categories, setCategiries] = useState([]);
  const navigate = useNavigate();

  const location = useLocation().state;
  const isUpdate = location ? true : false;

  console.log(location);

  useEffect(() => {
    async function getCategories() {
      try {
        const res = await axios.get("http://localhost:3000/api/categories");
        setCategiries(res.data);
        console.log(res.data);
      } catch (errors) {
        console.log("Fetching categories failed");
      }
    }
    getCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: location?.title || "",
      description: location?.description || "",
      image: location?.image || "",
      price: location?.price || "",
      category: location?.cat_id || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Laukelis yra būtinas"),
      description: Yup.string().required("Laukelis yra būtinas"),
      image: Yup.string().required("Laukelis yra būtinas"),
      price: Yup.number().required("Laukelis yra būtinas"),
      category: Yup.string().required("Laukelis yra būtinas"),
    }),
    onSubmit: (values) => {
      console.log("values ===", values);
      submitHandler(values);
    },
  });

  async function submitHandler(data) {
    try {
      const res = await axios({
        baseURL: "http://localhost:3000/api/addAd",
        method: isUpdate ? "PUT" : "POST",
        data: isUpdate ? { ...data, id: location.id } : data,
      });
      //   login(res.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="text-2xl my-6">Pridėti skelbimą</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <InputField id="title" label="Pavadinimas" formik={formik} placeholder="pavadinimas" />
        </div>
        <div className="mb-4">
          <InputField id="description" label="Aprašymas" textarea={true} formik={formik} placeholder="Aprašymas" />
        </div>
        <div className="mb-4">
          <InputField id="image" label="Nuotrauka" type="text" formik={formik} placeholder="Nuotrauka" />
        </div>
        <div className="mb-4">
          <InputField id="price" label="Kaina" type="number" formik={formik} placeholder="pvz:200eur" />
        </div>
        <div className="mb-4">
          <SelectBox id="category" options={categories} formik={formik} label="Kategoryjos" />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Pridėti
        </button>
      </form>
    </>
  );
}
