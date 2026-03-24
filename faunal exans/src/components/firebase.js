import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "xxxx",
  authDomain: "xxxx",
  projectId: "xxxx",
  appId: "xxxx"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);