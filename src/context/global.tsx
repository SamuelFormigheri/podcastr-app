import React from 'react';
import PlayerProvider from './Player/provider';

const SharedContext: React.FC = ({children}) => {
  return (
      <PlayerProvider>
          {children}
      </PlayerProvider>
  );
}

export default SharedContext;