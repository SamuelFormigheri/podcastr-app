import { createContext, useContext } from 'react';
import { IPlayerContext } from './interface';

export const PlayerContext = createContext<IPlayerContext>({} as IPlayerContext);

export function usePlayer(): IPlayerContext {
  const context = useContext(PlayerContext);

  if(!context)
    throw new Error('usePlayer must be used within the Player Provider')

  return context;
}