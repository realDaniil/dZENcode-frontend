'use client';
import { useRouter } from 'next/navigation';
import cl from './styles.module.scss';
import dynamic from 'next/dynamic';

const TimeInfo = dynamic(() => import('./TimeInfo'), { ssr: false });
const UserCount = dynamic(() => import('./UserCount'), { ssr: false });

export default function TopMenu() {
  const router = useRouter();
  return (
    <header className={`${cl.topMenu} app-header shadow-sm d-flex justify-content-between align-items-center`}>
      <div className="d-flex align-items-center">
        <div className={cl.logoHolder} style={{ userSelect: 'none', cursor: 'pointer' }} onClick={() => router.push('/')}>
          <img src="/logo.png" alt="Logo" className="w-2" />
          <span>INVENTORY</span>
        </div>
      </div>
      <div className="d-flex align-items-center gap-4">
        <TimeInfo />
        <UserCount />
      </div>
    </header>
  );
}
