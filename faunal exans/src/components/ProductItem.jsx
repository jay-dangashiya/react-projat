import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/actions";

export default function ProductItem({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="border p-4 mb-2">
      <img src={product.image} width="100" />
      <h2>{product.title}</h2>
      <p>₹{product.price}</p>

      <button
        className="bg-red-500 text-white px-2"
        onClick={() => dispatch(deleteProduct(product.id))}
      >
        Delete
      </button>
    </div>
  );
}