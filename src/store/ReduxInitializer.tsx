'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './index';
import { fetchUser } from './slices/authSlice';

export default function AuthInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return null;
}
