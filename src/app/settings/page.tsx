'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { logout, updateUser } from '@/store/slices/authSlice';
import { setDelay, setIsMultiavatar } from '@/store/slices/settingsSlice';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/auth/Auth';
import LilText from '@/components/UI/LilText';
import AnimatedWrapper from '@/components/AnimatedWrapper';
import Loader from '@/components/UI/Loader';

export default function SettingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const delay = useSelector((state: RootState) => state.settings.delay);
  const isMultiavatar = useSelector((state: RootState) => state.settings.isMultiavatar);
  const { isAuth, isLoading } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.auth);
  const [userData, setUserData] = useState({ name: user.name || '', email: user.email || '' });

  useEffect(() => {
    const savedDelay = localStorage.getItem('delay');
    if (savedDelay) {
      dispatch(setDelay(Number(savedDelay)));
    }
  }, [dispatch]);

  useEffect(() => {
    setUserData({ name: user.name || '', email: user.email || '' });
  }, [user]);

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/';
    dispatch(logout());
    router.push('/');
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(updateUser(userData)).unwrap();
    } catch (error) {
      alert(`Ошибка: ${error}`);
    }
  };

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDelay = Number(e.target.value);
    dispatch(setDelay(newDelay));
    localStorage.setItem('delay', newDelay.toString());
  };

  const handleMultiavatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIsMultiavatar = e.target.checked;
    dispatch(setIsMultiavatar(newIsMultiavatar));
    localStorage.setItem('isMultiavatar', newIsMultiavatar.toString());
  };

  if (isLoading) return <Loader />;
  return (
    <AnimatedWrapper>
      {isAuth ? (
        <div className="container mt-5">
          <h1>Настройки</h1>
          <form onSubmit={handleUpdateUser}>
            <div className="mb-3">
              <label className="form-label fw-bold">Имя</label>
              <input
                type="text"
                required
                className="form-control"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Почта</label>
              <input
                type="email"
                required
                className="form-control"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </div>
            <button className="btn btn-success">Изменить</button>
          </form>
          <div style={{ marginTop: 30 }}>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                checked={isMultiavatar}
                onChange={handleMultiavatarChange}
              />
              <label className="form-check-label fw-bold" htmlFor="flexSwitchCheckChecked">
                Сделать аватар мультибрендовым
              </label>
            </div>
            <LilText>
              Генерирует аватар на основе вашего имени, что позволяет получить уникальное изображение. Попробуйте сменить имя и
              аватар изменится.
            </LilText>
          </div>
          <div style={{ marginTop: 30 }}>
            <label className="form-label fw-bold">Задержка запросов: {delay === 0 ? 'Без задержки' : `${delay}мс`}</label>
            <input type="range" min="0" max="3000" step="100" value={delay} onChange={handleDelayChange} className="form-range" />
            <LilText>Позволяет искусственно замедлить получение данных, что может быть полезно для тестирования.</LilText>
          </div>

          <button className="btn btn-danger mt-3" onClick={handleLogout}>
            Выйти из аккаунта
          </button>
        </div>
      ) : (
        <AuthForm />
      )}
    </AnimatedWrapper>
  );
}
