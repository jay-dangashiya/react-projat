import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Success ✅");
    } catch (err) {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div className="p-4">
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white px-4" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}