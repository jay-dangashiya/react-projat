import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions";
import ProductItem from "./ProductItem";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        className="border p-2 mb-4"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.map((p) => (
        <ProductItem key={p.id} product={p} />
      ))}
    </div>
  );
}