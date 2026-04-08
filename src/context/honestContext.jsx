import { createContext, useContext, useState } from 'react';

const HonestContext = createContext();

export const HonestProvider = ({ children }) => {
  const [isHonest, setIsHonest] = useState(false);

  const toggleHonest = () => {
    setIsHonest(prev => !prev);
  };

  return (
    <HonestContext.Provider value={{ isHonest, toggleHonest }}>
      {children}
    </HonestContext.Provider>
  );
};

export const useHonest = () => {
  const context = useContext(HonestContext);
  if (context === undefined) {
    throw new Error('useHonest must be used within an HonestProvider');
  }
  return context;
};
