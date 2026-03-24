import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/actions";

export default function ProductForm() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.price) {
      alert("Fill all fields");
      return;
    }

    dispatch(addProduct(form));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input placeholder="Title" onChange={(e)=>setForm({...form,title:e.target.value})}/>
      <input placeholder="Price" onChange={(e)=>setForm({...form,price:e.target.value})}/>
      <button className="bg-green-500 text-white px-4">Add</button>
    </form>
  );
}