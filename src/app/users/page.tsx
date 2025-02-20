'use client';
import AnimatedWrapper from '@/components/AnimatedWrapper';
import AuthForm from '@/components/auth/Auth';
import Card from '@/components/UI/Card';
import LilText from '@/components/UI/LilText';
import Loader from '@/components/UI/Loader';
import myAxios from '@/myAxios';
import { RootState } from '@/store';
import { User } from '@/types';
import { formatDate } from '@/utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function UsersPage() {
  const { isAuth, isLoading } = useSelector((state: RootState) => state.auth);
  const [users, setUsers] = useState([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await myAxios.get('api/users');
      setUsers(data);
      setIsUsersLoading(false);
    };
    if (isAuth) {
      fetchData();
    } else {
      setIsUsersLoading(false);
    }
  }, [isAuth]);

  const deleteHandler = async () => {
    setIsUsersLoading(true);
    await myAxios.delete('api/users');
    setIsUsersLoading(false);
    window.location.reload();
  };
  if (isLoading || isUsersLoading) return <Loader />;
  return (
    <AnimatedWrapper style={{ maxWidth: 1200, margin: 'auto' }}>
      {isAuth ? (
        <>
          <h1>Пользователи</h1>
          <LilText className="mt-2 mb-4">
            Тут будет список всех зарегистрированных пользователей, а так же парочка созданных заранее, для визуального улучшения.
          </LilText>
          {users.map((user: User) => (
            <Card className="container" key={user.email}>
              <div>
                <p>
                  <span className="fw-bold">Почта: </span>
                  {user.email}
                </p>
                <p>
                  <span className="fw-bold">Имя: </span>
                  {user.name}
                </p>
              </div>
              <p>
                <span className="fw-bold">Дата регистрации: </span>
                <span style={{ minWidth: 100, display: 'inline-block', textAlign: 'end' }}>
                  {formatDate(user.createdAt, 'word', ' / ')}
                </span>
              </p>
            </Card>
          ))}
          <LilText className="mt-4 mb-2">
            Вы можете удалить все данные пользователей, за исключением тех, что были созданы искусственно для визуала.
          </LilText>
          <button className="btn btn-danger" onClick={deleteHandler}>
            Очистить и выйти
          </button>
        </>
      ) : (
        <AuthForm />
      )}
    </AnimatedWrapper>
  );
}
