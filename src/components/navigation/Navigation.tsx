'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { IoIosSettings, IoMdAdd } from 'react-icons/io';
import cl from './Navigation.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import multiavatar from '@multiavatar/multiavatar/esm';
import { truncateString } from '@/utils';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const isMultiavatar = useSelector((state: RootState) => state.settings.isMultiavatar);
  const [isVisible, setIsVisible] = useState(false);
  const svgCode = multiavatar(user.name || '');
  return (
    <div className={`${cl.sidebar} ${isVisible && cl.visible} `}>
      <div className={cl.openBtn + ' my-btn'} onClick={() => setIsVisible(!isVisible)}>
        <IoMdAdd style={{ transition: '0.2s', transform: `rotate( ${isVisible ? 45 : 0}deg)` }} />
      </div>
      <div className={cl.avatarHolder}>
        {isLoading ? (
          <img src={'/avatar.png'} alt="User" className={cl.avatar} />
        ) : (
          <>
            {isMultiavatar && user.name ? (
              <div className={cl.avatar} dangerouslySetInnerHTML={{ __html: svgCode }} />
            ) : (
              <img src={'/avatar.png'} alt="User" className={cl.avatar} />
            )}
          </>
        )}

        <IoIosSettings className={cl.settingsIcon + ' my-btn'} onClick={() => router.push('/settings')} />
      </div>

      {user.name && <p className="text-center">{truncateString(user.name, 22)}</p>}
      {user.email && <p className="text-center fw-bold mb-2">{truncateString(user.email, 22)}</p>}

      <nav className={cl.linksHolder}>
        <Link href="/" className={pathname === '/' ? cl.active : ''}>
          Домой
        </Link>
        <Link href="/orders" className={pathname === '/orders' ? cl.active : ''}>
          Заказы
        </Link>
        <Link href="/products" className={pathname === '/products' ? cl.active : ''}>
          Продукты
        </Link>
        <Link href="/users" className={pathname === '/users' ? cl.active : ''}>
          Пользователи
        </Link>
        <Link href="/settings" className={pathname === '/settings' ? cl.active : ''}>
          Настройки
        </Link>
      </nav>
    </div>
  );
}
