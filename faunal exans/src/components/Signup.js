import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User Registered ✅");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-4">
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />
      <button className="bg-green-500 text-white px-4" onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
}