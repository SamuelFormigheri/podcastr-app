import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { usePlayer } from '../../context/Player/context';

import styles from './styles.module.scss';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

const Player: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { 
    episodesList, 
    currentEpisodeIndex, 
    isPlaying, 
    isLoop,
    isShuffle,
    hasPrevious,
    hasNext,
    toggleEpisode,
    setPlayingState,
    playNext, 
    playPrevious,
    loopEpisode,
    shuffleEpisode,
    clearPlayerState
  } = usePlayer();
  
  const [progress, setProgress] = useState(0);

  const episode = episodesList[currentEpisodeIndex];

  function setupProgress() {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  };

  function handleMoveSlider(amount: number) {
    audioRef.current.currentTime = amount;
    setProgress(amount)
  }

  function handleEpisodeEnded() {
    if(hasNext){
      playNext();
      return;
    }

    clearPlayerState();
  }

  useEffect(() => {
    if(!audioRef.current)
      return;

    if(isPlaying)
      audioRef.current.play();
    else
      audioRef.current.pause();

  },[isPlaying]);

  return (
      <div className={styles.playerContainer}>
        <header>
          <img src="./playing.svg" alt="Tocando agora"/>
          <strong>Tocando agora</strong>
        </header>

        {episode ? (
          <div className={styles.currentEpisode}>
            <Image 
              width={592}
              height={592}
              src={episode.thumbnail}
              objectFit="cover"
            />
            <strong>{episode.title}</strong>
            <span>{episode.members}</span>
          </div>
        ): (
          <div className={styles.emptyPlayer}>
            <strong>Selecione um podcast para ouvir</strong>
          </div>
        )}

        <footer className={!episode ? styles.empty : ''}>
          <div className={styles.progress}>
            <span>{convertDurationToTimeString(progress)}</span>
            <div className={styles.slider}>
              {episode ? (
                <Slider 
                  max={episode.duration}
                  value={progress}
                  onChange={handleMoveSlider}
                  trackStyle={{backgroundColor: 'var(--green-500)'}}
                  railStyle={{backgroundColor: 'var(--purple-300)'}}
                  handleStyle={{borderColor: 'var(--green-500)', borderWidth: 4}}
                />
              ): (
                <div className={styles.emptySlider}></div>
              )}
            </div>
            <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
          </div>

          {episode && (
            <audio
              ref={audioRef} 
              src={episode.url}
              autoPlay
              loop={isLoop}
              onEnded={handleEpisodeEnded}
              onPlay={() => setPlayingState(true)}
              onPause={() => setPlayingState(false)}
              onLoadedMetadata={setupProgress}
            />
          )}

          <div className={styles.buttons}>
            <button type="button" disabled={!episode || episodesList.length === 1} onClick={shuffleEpisode}
              className={isShuffle ? styles.isShuffle : ''}
              >
              <img src="/shuffle.svg" alt="Embaralhar" />
            </button>
            <button type="button" disabled={!episode || !hasPrevious} onClick={playPrevious}>
              <img src="/play-previous.svg" alt="Tocar anterior" />
            </button>
            <button type="button" className={styles.playButton} disabled={!episode} onClick={toggleEpisode}>
              {isPlaying ? 
                <img src="/pause.svg" alt="Pausar" />
              : 
                <img src="/play.svg" alt="Tocar" />
              }
            </button>
            <button type="button" disabled={!episode || !hasNext} onClick={playNext}>
              <img src="/play-next.svg" alt="Tocar próxima" />
            </button>
            <button type="button" disabled={!episode} onClick={loopEpisode}
              className={isLoop ? styles.isLoop : ''}
            >
              <img src="/repeat.svg" alt="Repetir" />
            </button>
          </div>
        </footer>
      </div>
  );
}

export default Player;