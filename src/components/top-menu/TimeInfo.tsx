'use client'
import React, { useState, useEffect } from 'react';
import { formatDate } from '@/utils';
import { LuClock9 } from 'react-icons/lu';
import cl from './styles.module.scss';

export default function TimeInfo() {
  const [currentDate, setCurrentDate] = useState({
    dayOfWeek: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

      const dayOfWeek = daysOfWeek[now.getDay()];
      const date = now.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const time = now.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
      });

      setCurrentDate({
        dayOfWeek,
        date,
        time
      });
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={cl.timeInfo}>
      <div className="me-3">
        <span>{currentDate.dayOfWeek}</span>
        <br />
        <span>{formatDate(new Date())}</span>
      </div>
      <span className="d-flex gap-1 align-items-center">
        <LuClock9 style={{ color: 'var(--green-color)' }} />
        <span className="fw-bold" style={{ position: 'relative', top: '-1px' }}>
          {currentDate.time}
        </span>
      </span>
    </div>
  );
}
