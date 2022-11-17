import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthEmailPasswdContext } from '../../contexts/authEmailPassword';
import { AuthGoogleContext } from '../../contexts/authGoogle';
import { auth } from '../../services/FirebaseConfig';

const Dashboard = () => {
  const { user, signed, signOut } = useContext(AuthGoogleContext);
  const userParse = JSON.parse(user);
  const { userStandard, signedStandard, signOutStandard } = useContext(AuthEmailPasswdContext);
  const userStandardParsed = JSON.parse(userStandard);
  const navigate = useNavigate();

  if (signed) {
    console.log(userParse);
    return (
      <div>
        Olá, <span>{userParse?.displayName}</span> <img src={userParse.photoURL} />
        <button onClick={signOut}>Sign out</button>
      </div>
    );
  }
  if (signedStandard) {
    console.log(userStandardParsed);
    return (
      <div>
        Olá, <span>{userStandardParsed?.email}</span> <button onClick={signOutStandard}>Sign out</button>
      </div>
    );
  }
  return <Navigate to="/" replace={true} />;
};

export default Dashboard;
