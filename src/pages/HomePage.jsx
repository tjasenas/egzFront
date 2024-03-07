import React, { useEffect, useState } from "react";
import axios from "axios";

import { useAuthContext } from "../store/AuthCtx";
import { Link, useParams } from "react-router-dom";
import { array } from "yup";
import SingleItem from "../components/SingleItem";

export default function HomePage() {
  const [items, setItems] = useState([]);

  const { userId } = useAuthContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await axios.get(`http://localhost:3000/api/ads`);
        setItems(resp.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-2xl my-6">Skelbimai</h1>
      <div className="grid grid-cols-1 gap-4">{items.length > 0 && items.map((singleItem) => <SingleItem key={singleItem.id} item={singleItem} />)}</div>
    </>
  );
}
