import { firestorage } from "@/config/firebase";
import { uploadFileToCloudinary } from "@/services/ImageService";
import { UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";

export const updateUser = async (uid: string, updateData: UserDataType) => {
  try {
    if (updateData.image && updateData?.image?.uri) {
      const imageUploadRes = await uploadFileToCloudinary(
        updateData.image,
        "users"
      );
      
      if (!imageUploadRes.success) {
        return {
          success: false,
          msg: imageUploadRes.msg || "Failed to upload image",
        };
      }
      updateData.image = imageUploadRes.data;
    }
    const useRef = doc(firestorage, "users", uid);
    await updateDoc(useRef, updateData);
    return { success: true };
  } catch (error: any) {
    console.log("Failde to update user Data");
    return { success: false, error: error?.message };
  }
};
