import React, { useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = ({ track, isPlaying, onTogglePlay, onNext, onPrev }) => {
  const audioRef = useRef(null);
  const [volume, setVolume] = React.useState(1);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => console.log("Playback prevented:", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, track]);

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-4 text-white shadow-2xl z-50">
      <audio 
        ref={audioRef} 
        src={track.preview} 
        onEnded={onNext}
      />
      
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-1/3 min-w-0">
          <img 
            src={track.album.cover_small} 
            alt="Album art" 
            className="w-14 h-14 rounded-md shadow-sm hidden sm:block animate-spin-slow"
            style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
          />
          <div className="truncate">
            <h4 className="font-bold text-sm sm:text-base truncate">{track.title}</h4>
            <p className="text-xs text-slate-400 truncate">{track.artist.name}</p>
          </div>
        </div>

        <div className="flex flex-col items-center w-1/3">
          <div className="flex items-center gap-6">
            <button onClick={onPrev} className="text-slate-400 hover:text-white transition-colors">
              <SkipBack size={24} />
            </button>
            <button 
              onClick={onTogglePlay}
              className="bg-white text-slate-900 p-3 rounded-full hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
            </button>
            <button onClick={onNext} className="text-slate-400 hover:text-white transition-colors">
              <SkipForward size={24} />
            </button>
          </div>
        </div>

         <div className="hidden sm:flex items-center justify-end gap-2 sm:w-1/3">
          {volume === 0 ? <VolumeX size={20} className="text-slate-400" /> : <Volume2 size={20} className="text-slate-400" />}
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume} 
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;