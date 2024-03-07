import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../store/AuthCtx";
import SingleItem from "../components/SingleItem";

export default function IdeasList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await axios.get(`http://localhost:3000/api/admin/ideas`);
        setItems(resp.data.rows);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-2xl my-6">Istorijos/idėjos</h1>
      <div className="grid grid-cols-1 gap-4">{items.length > 0 && items.map((singleItem) => <SingleItem key={singleItem.id} item={singleItem} />)}</div>
    </>
  );
}
