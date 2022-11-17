import { useState, createContext, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../services/FirebaseConfig';
import { Navigate } from 'react-router-dom';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadStorageData = () => {
      const storageUser = sessionStorage.getItem('@AuthFirebase:user');
      const storageToken = sessionStorage.getItem('@AuthFirebase:token');
      if (storageToken && storageUser) {
        setUser(storageUser);
      }
    };
    loadStorageData();
  });

  function signInGoogle() {
    signInWithPopup(auth, provider)
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
        sessionStorage.setItem('@AuthFirebase:token', token);
        sessionStorage.setItem('@AuthFirebase:user', JSON.stringify(user));
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  function signOut() {
    sessionStorage.clear();
    setUser(null);

    return <Navigate to="/" />;
  }

  const [loading, error] = useSignInWithGoogle(auth);

  return (
    <AuthGoogleContext.Provider
      value={{
        signed: !!user,
        user: user,
        signInGoogle,
        signOut,
        loading,
        error
      }}
    >
      {children}
    </AuthGoogleContext.Provider>
  );
};
