import React, { useState } from 'react';
import { PlayerContext } from './context';
import { Episode } from './interface';

const PlayerProvider: React.FC = ({
    children
  }) => {
    const [episodesList, setEpisodesList] = useState<Episode[]>([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoop, setIsLoop] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
  
    const hasNext = isShuffle || (currentEpisodeIndex + 1) < episodesList.length;
    const hasPrevious = currentEpisodeIndex > 0;

    function clearPlayerState() {
      setEpisodesList([]);
      setCurrentEpisodeIndex(0);
    }

    function playEpisode(episode: Episode){
        setEpisodesList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function toggleEpisode(){
        setIsPlaying(oldState => !oldState);
    }

    function loopEpisode(){
      setIsLoop(oldState => !oldState);
    }

    function shuffleEpisode(){
      setIsShuffle(oldState => !oldState);
    }

    function setPlayingState(state: boolean){
        setIsPlaying(state);
    }

    function playList(list: Episode[], index: number){
        setEpisodesList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function playNext(){
      if(isShuffle){
        const randomEpisodeIndex = Math.floor(Math.random() * episodesList.length);
        setCurrentEpisodeIndex(randomEpisodeIndex);
        return;
      }

      setCurrentEpisodeIndex(oldState => oldState >= episodesList.length ? oldState : oldState + 1);
    }

    function playPrevious(){
      setCurrentEpisodeIndex(oldState => oldState === 0 ? oldState : oldState - 1);
    }

    return (
      <PlayerContext.Provider value={{ 
          episodesList, 
          currentEpisodeIndex,
          isPlaying,
          isLoop,
          isShuffle,
          hasNext,
          hasPrevious,
          playEpisode,
          toggleEpisode,
          setPlayingState,
          playList,
          playNext,
          playPrevious,
          loopEpisode,
          shuffleEpisode,
          clearPlayerState
        }}>
        {children}
      </PlayerContext.Provider>
    );
  }
  
  export default PlayerProvider;