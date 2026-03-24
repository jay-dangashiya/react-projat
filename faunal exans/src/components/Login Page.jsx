import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 text-white px-4"
        onClick={() => dispatch({ type: "LOGIN" })}
      >
        Login
      </button>
    </div>
  );
}