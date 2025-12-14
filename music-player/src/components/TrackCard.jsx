import React from 'react';
import { Play, Pause } from 'lucide-react';

const TrackCard = ({ track, isCurrent, isPlaying, onPlay }) => {
  return (
    <div 
      className={`group relative bg-slate-800 p-4 rounded-xl transition-all hover:bg-slate-750 hover:-translate-y-1 shadow-md ${isCurrent ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
        <img 
          src={track.album.cover_medium} 
          alt={track.album.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Hover Play Overlay */}
        <button 
          onClick={() => onPlay(track)}
          className={`absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${isCurrent ? 'opacity-100 bg-black/20' : ''}`}
        >
          <div className="bg-blue-600 p-3 rounded-full text-white shadow-lg transform hover:scale-110 transition-transform">
            {isCurrent && isPlaying ? <Pause fill="white" size={24} /> : <Play fill="white" size={24} className="ml-1" />}
          </div>
        </button>
      </div>
      
      <h3 className="text-white font-bold truncate text-lg" title={track.title}>{track.title}</h3>
      <p className="text-slate-400 text-sm truncate">{track.artist.name}</p>
      <p className="text-slate-500 text-xs mt-1 truncate">{track.album.title}</p>
    </div>
  );
};

export default TrackCard;