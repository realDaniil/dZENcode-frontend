'use client';
import AnimatedWrapper from '@/components/AnimatedWrapper';
import AuthForm from '@/components/auth/Auth';
import Products from '@/components/products/Products';
import Loader from '@/components/UI/Loader';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export default function OrdersPage() {
  const { isAuth, isLoading } = useSelector((state: RootState) => state.auth);
  if (isLoading) return <Loader />;
  return (
    <AnimatedWrapper style={{ maxWidth: 1200, margin: 'auto' }}>
      {isAuth ? (
        <>
          <h1>Продукты</h1>
          <Products />
        </>
      ) : (
        <AuthForm />
      )}
    </AnimatedWrapper>
  );
}
