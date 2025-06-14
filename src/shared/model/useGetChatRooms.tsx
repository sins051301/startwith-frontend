'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import db from 'fire-config';
import { getSession } from 'next-auth/react';
import { ChatRoom } from './roomType';

function useGetChatRooms({ targetId }: { targetId: string }) {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    let unsubscribe: () => void;

    const fetchRooms = async () => {
      const session = await getSession();
      if (!session) return;
      const q = query(
        collection(db, 'chats'),
        where(targetId, '==', session.uniqueType),
      );

      unsubscribe = onSnapshot(q, (snapshot) => {
        const realTimeRooms = snapshot.docs.map((doc) => ({
          roomId: doc.id,
          ...doc.data(),
        })) as ChatRoom[];
        setRooms(realTimeRooms);
      });
    };

    fetchRooms();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [targetId]);

  return rooms;
}

export default useGetChatRooms;
