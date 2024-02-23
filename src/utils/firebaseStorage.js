// firebaseStorage.js
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "@/firebase";

export const uploadFileToFirebaseStorage = async (file, folder) => {
  const storage = getStorage(app);
  const filename = new Date() + file.name;
  const storageRef = ref(storage, `${folder}/${filename}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Error uploading image:", error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

export const deleteFile = async (filePath) => {
  const storage = getStorage(app);
  const fileRef = ref(storage, filePath);
  try {
    await deleteObject(fileRef);
    console.log(`File ${filePath} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting Image:`, error);
  }
};
