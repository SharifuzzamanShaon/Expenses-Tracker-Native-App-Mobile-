import { UserType } from "@/types";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { app, myAuth } from "../config/firebase";

const db = getFirestore(app);
interface AuthContextType {
  user: UserType | null;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string, name: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();
  useEffect(() => {
    const unsub = onAuthStateChanged(myAuth, async (firebaseuser) => {
      console.log("firebase user", firebaseuser?.displayName);
      if (firebaseuser) {
        setUser({
          uid: firebaseuser.uid,
          email: firebaseuser?.email || "",
          name: firebaseuser?.displayName || "",
          image: firebaseuser?.photoURL || null,
        });
        console.log("User logged in ,,,,", user);
        
        // await updateUserData(firebaseuser.uid);
        router.replace("/(tabs)");
      } else {
        router.replace("/welcome");
      }
    });
    return () => unsub();
  }, []);
  const login = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(myAuth, email, password);
      console.log("login res from context==>", res);
      if (res?.user?.uid) {
        setUser({
          uid: res.user.uid,
          email: res.user.email || "",
          name: res.user.displayName || "",
        });
        await updateUserData(res.user.uid);
        console.log("User data updated on login :", user);
      }
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
        await updateProfile(res.user, {
          displayName: username
        });
        await setDoc(doc(db, "users", `${res?.user?.uid}`), {
          email,
          username,
          password,
        });

        setUser({
          uid: res.user.uid,
          email: res.user.email || "",
          name: username,
        });
        await updateUserData(res.user.uid);
        console.log("User data updated on reg. :", user);
        return { success: true };

      }
      return { success: false };
    } catch (error: any) {
      console.log(error);
      let msg = error.message;
      console.log("error message: ", msg);
      if (msg.includes("(auth/email-already-in-use)"))
        msg = "Email already in use";
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
      if (msg.includes("(auth/weak-password)")) msg = "Weak password";
      return { success: false, message: msg || "Failed to Sign-Up" };
    }
  };
  const updateUserData = async (uid: string) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData: UserType = {
          uid: data?.uid,
          email: data.email || null,
          name: data.name || null,
          image: data.image || null,
        };
        setUser({ ...userData });
      }
    } catch (error: any) {
      let msg = error.message;
      return { success: false, msg };
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
