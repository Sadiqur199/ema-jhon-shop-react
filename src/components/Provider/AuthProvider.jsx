import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../../firebase/firebase.config';

export const AuthContext = createContext(null)
 const auth = getAuth(app)

const AuthProvider = ({children}) => {
  const [user , setUser] = useState(null);
  const [loading , setLoading] = useState(true)

  //email password authentication 
  const createuser = (email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password)
  }

  const singIn = (email,password) =>{
    return signInWithEmailAndPassword(auth,email,password)
  }
  
  const logOut = ()=>{
    return signOut(auth)
  }

  //observe user state
  useEffect(()=>{
   const unsubcribe = onAuthStateChanged(auth , currentUser=>{
      setUser(currentUser)
      setLoading(false)
    })
    //start observing unmounting
    return ()=>{
      return unsubcribe();
    }
  },[])

  const authInfo = {
         user ,
         loading,
         createuser,
         singIn,
         logOut
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;