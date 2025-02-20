'use client';
import React from 'react';
import { IoEyeSharp } from 'react-icons/io5';
import { useWebSocket } from '@/hooks/useWebSocket';

export default function UserCount() {
  const userCount = useWebSocket();

  return (
    <span title={`Пользователей на сайте`} className="d-flex gap-1 align-items-center">
      <IoEyeSharp style={{ color: 'var(--green-color)' }} />
      <span className="fw-bold" style={{ position: 'relative', top: '-1px' }}>
        {userCount}
      </span>
    </span>
  );
}
