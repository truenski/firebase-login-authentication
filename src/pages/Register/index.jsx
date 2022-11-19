import { useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import arrowImg from '../../assets/arrow.svg';
import Alert from '../../components/alert';
import { auth } from '../../services/firebaseConfig';
import './styles.css';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate('');

  async function handleCreateNewUser(e) {
    e.preventDefault();
    await createUserWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    if (error?.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
      setErrorMessage('A senha deve possuir ao menos 6 caracteres');
    } else if (error?.message === 'Firebase: Error (auth/email-already-in-use).') {
      setErrorMessage('Email já está sendo usado.');
    } else if (error?.message === 'Firebase: Error (auth/invalid-email).') {
      setErrorMessage('Preencha os campos corretamente.');
    }
  }, [error]);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  if (loading) {
    return <p>carregando...</p>;
  }
  return (
    <div className="container">
      <header className="header">
        <span>Por favor digite suas informações de cadastro</span>
      </header>
      {errorMessage ? (
        <div className="errorCard">
          <span>
            <Alert />
            {errorMessage}
          </span>
        </div>
      ) : undefined}
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
            placeholder="Digite uma senha"
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleCreateNewUser} className="button">
          Cadastrar <img src={arrowImg} alt="->" />
        </button>
        <div className="footer">
          <p>Você já tem uma conta?</p>
          <Link to="/">Acesse sua conta aqui</Link>
        </div>
      </form>
    </div>
  );
}
