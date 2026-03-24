import { signOut } from "firebase/auth";
import { auth } from "../firebase";
<button onClick={() => signOut(auth)}>Logout</button>