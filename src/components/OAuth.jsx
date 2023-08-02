import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";
import auth from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import Google from "../assets/icons/Google";
import Button from "./Button";

const OAuth = () => {
  const navigate = useNavigate();

  const onGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      //const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      //check if user exists
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      //if not create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          fname: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        navigate("/home");
      }
    } catch (error) {
      toast.error("could not sign up with google");
    }
  };
  return <button onClick={onGoogleClick}>google</button>;
  //to be fixed later   return <Button onClick={onGoogleClick} icon={<Google />} text={"Google"} />;
};

export default OAuth;
