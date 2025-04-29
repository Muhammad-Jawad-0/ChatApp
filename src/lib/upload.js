import { toast } from "react-toastify";
import {
  getDownloadURL,
  ref,
  storage,
  uploadBytesResumable,
} from "../firebase/FirebaseConfig";
import { useContext } from "react";
import MyContext from "../context/MyContext";

const upload = async (file) => {
  const context = useContext(MyContext);
  const { setImageProgress } = context;
  const date = new Date();
  const storageRef = ref(storage, `images/${date}${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setImageProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        reject("somthing went wrong!" + error.code);
        console.log(error);
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

export default upload;
