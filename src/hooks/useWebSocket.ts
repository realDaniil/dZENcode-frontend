import { useEffect, useState } from 'react';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:5000';

export const useWebSocket = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'userCount') {
        setUserCount(data.count);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return userCount;
};
