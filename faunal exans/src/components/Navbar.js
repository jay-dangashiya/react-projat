import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const dispatch = useDispatch();

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <div>
        <Link to="/">Products</Link>
        <Link to="/add" className="ml-4">Add Product</Link>
      </div>
      <button onClick={() => dispatch({ type: "LOGOUT" })}>
        Logout
      </button>
    </nav>
  );
}