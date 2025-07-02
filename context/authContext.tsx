import { createContext, useContext, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { app, auth, firestorage } from "../config/firebase";
import { app} from "../config/firebase"
// import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 

const myAuth = getAuth(app)

interface AuthContextType {
  user: { email: string; password: string } | null;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string, name: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"] | null>(null);

  const login = async (email: string, password: string) => {
    try {
      // let response = await signInWithEmailAndPassword(auth, email, password);
      const response = await signInWithEmailAndPassword(myAuth, email, password)
      console.log('====================================');
      console.log('Login response:', response);
      console.log('====================================');
      if (!response?.user?.uid) {
        return { success: false, message: response };
      }
      if (response.user.uid) {
        setUser({
          email,
          password,
        });
        return { success: true, user: response.user };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, msg: err?.message || "Login failed" };
    }
  };
  const register = async (email: string, username: string, password: string) => {
    try {
      let response = await createUserWithEmailAndPassword(
        myAuth,
        email,
        password
      );
      console.log("new signup", response);
      return { success: true };
    } catch (error: any) {
      console.log(error);
      return { success: false, message:error.message || "Failed to Sign-Up"};
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


export { AuthContext, useGlobalContext, AuthProvider };
