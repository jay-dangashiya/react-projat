
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
apiKey: import.meta.env.VITE_API_KEY
const firebaseConfig = {
  apiKey: "YAHAPE_API_KEY_PASTE_KARO",  // 🔑 yaha dalna hai
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "XXXXX",
  appId: "XXXXX"
};

const app = initializeApp(firebaseConfig);

// auth export
export const auth = getAuth(app);