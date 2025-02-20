import AnimatedWrapper from '@/components/AnimatedWrapper';
import Link from 'next/link';

export default function Home() {
  return (
    <AnimatedWrapper style={{ maxWidth: 1200, margin: 'auto' }}>
      <h1>Привет 👋</h1>
      <p>
        Добро пожаловать! Это приложение создано в рамках тестового задания и представляет собой админ-панель для работы с
        продуктами.
      </p>
      <p>Для полного погружения также был разработан простой бэкенд, раскрывающий все возможности приложения.</p>
      <br />
      <p className="h5">🧐 Что здесь происходит?</p>
      <p>
        При первом посещении вас попросят зарегистрироваться. Не переживайте — это простая формальность. Вы сможете удалить свои
        данные на вкладке <strong>"Пользователи"</strong>. На основных страницах можно взаимодействовать с данными, что пришли с
        бэкенда. Все данные сохраняются локально, и даже если вы всё удалите, при перезагрузке страницы информация восстановится.
      </p>
      <br />
      <p className="h5">🛠 Технологический стек</p>
      <p>React, Next.js, TypeScript, Redux, JWT, WebSocket, Jest, Axios, Bootstrap, SASS.</p>
      <br />
      <p className="h5">👍 Полезные ссылки</p>
      <p>
        <Link href="/" target="_blank" rel="noopener noreferrer">
          Репозиторий фронтенда
        </Link>
      </p>
      <p>
        <Link href="/" target="_blank" rel="noopener noreferrer">
          Репозиторий бэкенда
        </Link>
      </p>
      <p>
        <Link href="https://t.me/rl_daniil" target="_blank" rel="noopener noreferrer">
          Связаться в Telegram
        </Link>
      </p>
      <br />
      <p className="h6">Продуктивного дня и хорошего настроения! ❤️</p>
    </AnimatedWrapper>
  );
}
