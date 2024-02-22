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
import { socket } from "../../socketIo/socket";

export const AuthContext = createContext(null);
const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([])
  const [followFollowingActive, setfollowFollowingActive] = useState(true)
  const axiosPublic = useAxiosPublic();
  const [changeRefetch, setChangeRefetch] = useState(0)

  const createUser = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  const loginUser = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };
  const logOut = async () => {

    setLoading(true);
    await axiosPublic.post('/logout')

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
          .then(res => {
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
  useEffect(() => {


    return () => {
      socket.disconnect();
    }
  }, [changeRefetch])
  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logOut,
    googleLogIn,
    messages,
    setMessages,
    followFollowingActive,
    setfollowFollowingActive,
    changeRefetch,
    setChangeRefetch

  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProviders.propTypes = {
  children: PropTypes.node.isRequired
}

export default AuthProviders;
