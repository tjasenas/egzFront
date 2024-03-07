import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../store/AuthCtx";
import axios from "axios";
import toast from "react-hot-toast";

export default function SingleItem({ item }) {
  const { role, userId } = useAuthContext();
  const { id, title, description, image, price, user_id } = item;

  async function removeHandle(data) {
    try {
      const res = await axios.delete("http://localhost:3000/api/removeAd", { data });
      toast.success(res.data.msg);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="border-2 border-gray-400 p-4 flex gap-4">
      <img className="w-[200px] h-[200px]" src={image} alt="" />
      <div>
        <h2>{title}</h2>
        <p className="my-4">{description}</p>
        <div>Kaina: {price}</div>
        {user_id === userId && role !== "admin" && (
          <>
            <Link className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-2" to="/edit" state={item}>
              Redaguoti
            </Link>
            <button onClick={() => removeHandle({ id })} class=" bg-red-500 text-white p-2 rounded hover:bg-red-600">
              Ištrinti
            </button>
          </>
        )}
        {role === "admin" && (
          <>
            <Link className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-2" to="/edit" state={item}>
              Redaguoti
            </Link>
            <button onClick={() => removeHandle({ id })} class=" bg-red-500 text-white p-2 rounded hover:bg-red-600">
              Ištrinti
            </button>
          </>
        )}
      </div>
    </div>
  );
}
