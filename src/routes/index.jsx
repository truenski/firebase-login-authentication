import React from 'react';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthEmailPasswdContext } from '../contexts/authEmailPassword';
import { AuthGoogleContext } from '../contexts/authGoogle';
// se o usuário estiver logado no google ou por email,
// as rotas mostrarão os componentes filhos dentro dela == <Outlet/> (react-router-dom)
// se não,
// Levará de volta à rota "/"

//Deve estar como pai para as rotas que precisam exigir autenticação

export const PrivateRoutes = () => {
  const { signed } = useContext(AuthGoogleContext);
  const { signedStandard } = useContext(AuthEmailPasswdContext);
  return signed || signedStandard ? <Outlet /> : <Navigate to="/" />;
};
