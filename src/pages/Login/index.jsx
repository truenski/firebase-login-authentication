import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { Link } from 'react-router-dom';
import arrowImg from '../../assets/arrow.svg';

import './styles.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Alert from '../../components/alert';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signInGoogle, signed, signIn, loading, error } = useContext(AuthContext);

  const navigate = useNavigate();

  async function handleSignIn(e) {
    e.preventDefault();
    await signIn(email, password);
    navigate('/dashboard');
  }

  const handleLoginFromGoogle = async () => {
    await signInGoogle();
  };

  if (loading) {
    return <div>Carregando...</div>;
  }
  if (signed) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="container">
      <header className="header">
        <span>Por favor digite suas informações de login</span>
      </header>
      {error ? (
        <div className="errorCard">
          <span>
            <Alert />
            Nome de usuário ou senha incorretos.
          </span>
        </div>
      ) : undefined}
      <button onClick={handleLoginFromGoogle} className="google-btn">
        <p className="btn-text">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />{' '}
          <b>Continuar com Google</b>
        </p>
      </button>

      <div className="orContainer">
        <hr className="trace" />
        <span className="or">OU</span>
        <hr className="trace" />
      </div>

      <form>
        <div className="inputContainer">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua senha"
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <a href="#">Esqueceu sua senha ?</a>

        <button className="button" onClick={e => handleSignIn(e)}>
          Entrar <img src={arrowImg} alt="->" />
        </button>
        <div className="footer">
          <p>Você não tem uma conta?</p>
          <Link to="/register">Crie a sua conta aqui</Link>
        </div>
      </form>
    </div>
  );
}
