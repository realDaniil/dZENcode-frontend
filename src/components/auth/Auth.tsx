'use client';
import { useState } from 'react';
import { AxiosError } from 'axios';
import myAxios from '@/myAxios';
import { useDispatch } from 'react-redux';
import { login } from '@/store/slices/authSlice';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isLogin ? '/auth/login' : '/auth/register';
      const { data } = await myAxios.post(url, { name, email, password });
      if (data.token) {
        setCookie('token', data.token, 1);
        dispatch(login(data));
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message || 'Ошибка');
      } else {
        setError('Ошибка');
      }
    }
  };

  return (
    <div className="row justify-content-center" style={{ width: 400, margin: '80px auto 0 auto' }}>
      <div className="card">
        <div className="card-body">
          <h5 className="fw-bold text-center mt-2">{isLogin ? 'Войти' : 'Регистрация'}</h5>
          {error && <div className="alert alert-danger">{error}</div>}
          <form className="p-2" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Имя
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Олександр"
                  required={!isLogin}
                />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                placeholder="qwerty"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
            <p
              className="text-decoration-underline text-center mt-4"
              style={{ cursor: 'pointer', fontSize: 14 }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'У меня нет аккаунта' : 'У меня уже есть аккаунт'}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
