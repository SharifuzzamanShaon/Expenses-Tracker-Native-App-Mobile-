import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
// import { app, auth, firestorage } from "../config/firebase";
import { app, myAuth } from "../config/firebase";
// import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const db = getFirestore(app);
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string, name: string) => Promise<any>;
}
interface User {
  uid: string;
  email: string;
  name: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const unsub = onAuthStateChanged(myAuth, async (firebaseuser) => {
      console.log("Firebase User info", firebaseuser);
      if (firebaseuser) {
        router.replace("/(tabs)");
        // router.replace('/(tabls)');
      } else {
        router.replace("/welcome");
      }
    });
    return () => unsub();
  }, []);
  const login = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(myAuth, email, password);
      console.log("login res from context", res);

      return { success: true };
    } catch (err: any) {
      let msg = err.message;
      console.log("error message: ", msg);
      if (msg.includes("(auth/invalid-credential)")) msg = "Wrong credentials";
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
      return { success: false, msg };
    }
  };
  const register = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      let res = await createUserWithEmailAndPassword(myAuth, email, password);
      console.log("new signup", res);
      if (res?.user?.uid) {
        await setDoc(doc(db, "users", `${res?.user?.uid}`), {
          email,
          username,
          password,
        });
        return { success: true };
      }
      return { success: false };
    } catch (error: any) {
      console.log(error);
      let msg = error.message;
      console.log("error message: ", msg);
      if (msg.includes("(auth/email-already-in-use)")) msg = "Email already in use";
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
      if (msg.includes("(auth/weak-password)")) msg = "Weak password";
      return { success: false, message: msg || "Failed to Sign-Up" };
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useGlobalContext };
