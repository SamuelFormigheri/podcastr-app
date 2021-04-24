export interface Episode {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

export interface IPlayerContext {
   episodesList: Array<Episode>;
   currentEpisodeIndex: number;
   isPlaying: boolean;
   isLoop: boolean;
   isShuffle: boolean;
   hasNext: boolean;
   hasPrevious: boolean;
   playEpisode: (episode: Episode) => void;
   toggleEpisode: () => void;
   setPlayingState: (state: boolean) => void;
   playList: (list: Episode[], index: number) => void;
   playNext: () => void;
   playPrevious: () => void;
   loopEpisode: () => void;
   shuffleEpisode: () => void;
   clearPlayerState: () => void;
};