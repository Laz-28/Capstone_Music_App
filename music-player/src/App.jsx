import React, { useState } from 'react';
import { Music, AlertCircle, Loader2 } from 'lucide-react';
import SearchBar from './components/SearchBar';
import TrackCard from './components/TrackCard';
import MusicPlayer from './components/MusicPlayer';

function App() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  
  // API Integration 
  const fetchMusic = async (query) => {
    setLoading(true);
    setError(null);
    try {
      
      const proxyUrl = "https://corsproxy.io/?";
      const targetUrl = `https://api.deezer.com/search?q=${encodeURIComponent(query)}`;
      
      const response = await fetch(proxyUrl + targetUrl);
      
      if (!response.ok) throw new Error("Network response was not ok");
      
      const data = await response.json();
      
      
      setTracks(data.data);
      
    } catch (err) {
      setError("Failed to fetch music. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  // Playback Handlers
  const handlePlayTrack = (track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const nextTrack = tracks[currentIndex + 1] || tracks[0]; // Loop to start
    setCurrentTrack(nextTrack);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const prevTrack = tracks[currentIndex - 1] || tracks[tracks.length - 1]; // Loop to end
    setCurrentTrack(prevTrack);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-32">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Music size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              VibeStream
            </h1>
          </div>
          <SearchBar onSearch={fetchMusic} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 size={48} className="animate-spin mb-4 text-blue-500" />
            <p>Searching the archives...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3 text-red-400 max-w-lg mx-auto">
            <AlertCircle size={24} />
            <p>{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && tracks.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <Music size={64} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg">Start by searching for your favorite artist or song.</p>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {tracks.map((track) => (
            <TrackCard 
              key={track.id} 
              track={track} 
              isCurrent={currentTrack?.id === track.id}
              isPlaying={isPlaying}
              onPlay={handlePlayTrack}
            />
          ))}
        </div>
      </main>

      {/* Music Player Bar */}
      {currentTrack && (
        <MusicPlayer 
          track={currentTrack} 
          isPlaying={isPlaying} 
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
}

export default App;