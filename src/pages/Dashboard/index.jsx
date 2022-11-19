import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';

const Dashboard = () => {
  const { user, signed, signOut, loading } = useContext(AuthContext);
  const userParse = JSON.parse(user);

  if (loading) {
    return <div>Carregando...</div>;
  }
  if (signed) {
    console.log(userParse);
    return (
      <div>
        Olá, <span>{userParse?.displayName ?? userParse.email}</span> <img src={userParse.photoURL} />
        <button onClick={signOut}>Sign out</button>
      </div>
    );
  }
  return <Navigate to="/" replace={true} />;
};

export default Dashboard;
