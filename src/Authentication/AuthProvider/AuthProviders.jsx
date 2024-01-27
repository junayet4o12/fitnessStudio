import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import PropTypes from 'prop-types'

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "@firebase/auth";
import auth from "../../firebase/firebase.config";

export const AuthContext = createContext(null);
const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const createUser = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  const loginUser = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  const googleProvider = new GoogleAuthProvider();
  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser?.email };
        axiosPublic.post('/jwt', userInfo)
        .then(res =>{
          console.log(res.data)
        
        });
        console.log(userInfo);
      }

      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);
  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logOut,
    googleLogIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProviders.propTypes ={
  children: PropTypes.node.isRequired
}

export default AuthProviders;
