import { createContext, useContext, useState } from 'react';
import { useAudioPlayer } from 'expo-audio';
import type { Book } from '@/dummyBooks';

type PlayerContextType = {
  player: ReturnType<typeof useAudioPlayer>;
  book: Book | null;
  playBook: (book: Book) => void;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const player = useAudioPlayer(currentBook?.audio_url);

  const playBook = (book: Book) => {
    if (currentBook?.id !== book.id) {
      setCurrentBook(book);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        player,
        book: currentBook,
        playBook,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
} 