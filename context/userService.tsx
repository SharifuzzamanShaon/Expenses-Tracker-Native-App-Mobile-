import { firestorage } from "@/config/firebase";
import { UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";

export const updateUser = async(uid: string, updateData: UserDataType) => {
    try {
        const useRef = doc(firestorage, "users", uid)
        await updateDoc(useRef, updateData) 
        return {success: true}
    } catch (error:any) {
        console.log("Failde to update user Data");
        return {success: false, error: error?.message}
        
    }
};
