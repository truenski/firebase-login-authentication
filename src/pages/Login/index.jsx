import { useState, useContext } from 'react';
import { AuthGoogleContext } from '../../contexts/authGoogle';
import { Link } from 'react-router-dom';
import arrowImg from '../../assets/arrow.svg';

import { auth } from '../../services/firebaseConfig';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import './styles.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthEmailPasswdContext } from '../../contexts/authEmailPassword';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signedStandard, signInStandard, errorStandard } = useContext(AuthEmailPasswdContext);

  const navigate = useNavigate();

  async function handleSignIn(e) {
    e.preventDefault();
    await signInStandard(email, password);
    console.log(errorStandard);
    navigate('/dashboard');
  }

  const { signInGoogle, signed } = useContext(AuthGoogleContext);
  const handleLoginFromGoogle = async () => {
    await signInGoogle();
  };

  if (signed || signedStandard) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="container">
      <header className="header">
        <span>Por favor digite suas informações de login</span>
      </header>

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
