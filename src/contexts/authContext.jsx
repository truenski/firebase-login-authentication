import { useState, createContext, useEffect } from 'react';
import { EmailAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../services/FirebaseConfig';
import { Navigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
const provider = new GoogleAuthProvider();

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const storageUserAndToken = result => {
    const credential = EmailAuthProvider.credential(result);
    const token = credential.accessToken;
    const user = result.user;
    setUser(user);
    sessionStorage.setItem('@AuthFirebase:token', token);
    sessionStorage.setItem('@AuthFirebase:user', JSON.stringify(user));
    setError('');
  };

  const handleSignInError = error => {
    // const errorCode = error.code;
    // const error = error.message;
    // const email = error.email;
    // const credential = EmailAuthProvider.credential(error);
    setError(error.message);
  };

  function signIn(email, passwd) {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, passwd)
      .then(result => {
        storageUserAndToken(result);
      })
      .catch(error => {
        handleSignInError(error);
      })
      .finally(res => {
        setLoading(false);
      });
  }

  function signInGoogle() {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then(result => {
        storageUserAndToken(result);
      })
      .catch(error => {
        handleSignInError(error);
      })
      .finally(res => {
        setLoading(false);
      });
  }

  function signOut() {
    sessionStorage.clear();
    setUser(null);

    return <Navigate to="/" />;
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signInGoogle,
        signIn,
        signOut,
        loading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
