import { useState, createContext, useEffect } from 'react';
import { EmailAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/FirebaseConfig';
import { Navigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
const provider = new EmailAuthProvider();

export const AuthEmailPasswdContext = createContext({});

export const AuthEmailPasswdProvider = ({ children }) => {
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

  function signInStandard(email, passwd) {
    signInWithEmailAndPassword(auth, email, passwd)
      .then(result => {
        const credential = EmailAuthProvider.credential(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);

        setUser(user);
        sessionStorage.setItem('@AuthFirebase:token', token);
        sessionStorage.setItem('@AuthFirebase:user', JSON.stringify(user));
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = EmailAuthProvider.credential(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  }

  const [loading, error] = useSignInWithEmailAndPassword(auth);

  function signOutStandard() {
    sessionStorage.clear();
    setUser(null);

    return <Navigate to="/" />;
  }

  return (
    <AuthEmailPasswdContext.Provider
      value={{
        signedStandard: !!user,
        userStandard: user,
        signInStandard,
        signOutStandard,
        loadingStandard: loading,
        errorStandard: error
      }}
    >
      {children}
    </AuthEmailPasswdContext.Provider>
  );
};
