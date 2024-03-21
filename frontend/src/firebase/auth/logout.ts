import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../config";

const auth = getAuth(firebaseApp);

const logout = async () => {
  let result = null;
  let error = null;

  try {
    result = await signOut(auth);
  } catch (error) {
    error = error;
  }

  return { result, error };
};

export default logout;
