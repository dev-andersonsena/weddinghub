import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

export default function PremiumMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // High quality royalty-free acoustic classical background music
  const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3';

  useEffect(() => {
    // Lazy initialize audio to comply with browsers' autoplay policy
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0.25; // elegant soft background volume
    audioRef.current = audio;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateProgress);
      audioRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.log("Autoplay blocked by browser policy, user interaction required first.", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 bg-white/95 backdrop-blur-sm border border-gold-200/50 shadow-xl rounded-full px-4 py-2.5 flex items-center gap-3 animate-fade-in transition-all hover:scale-105 group">
      <div className="flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 flex items-center justify-center text-white shadow-md transition-all active:scale-95"
          title={isPlaying ? 'Pausar música' : 'Tocar trilha sonora'}
          id="btn-toggle-play"
        >
          {isPlaying ? (
            <Pause size={14} className="fill-current" />
          ) : (
            <Play size={14} className="fill-current translate-x-0.5" />
          )}
        </button>

        <div className="flex flex-col pr-1">
          <div className="text-[10px] uppercase tracking-widest text-gold-600 font-medium font-sans flex items-center gap-1">
            <Music size={10} className={isPlaying ? 'animate-bounce' : ''} />
            Trilha Sonora
          </div>
          <span className="text-[11px] font-serif font-semibold text-gray-800 leading-tight w-24 truncate">
            {isPlaying ? 'Acoustic Symphony' : 'Música Pausada'}
          </span>
        </div>
      </div>

      {/* Visual audio wave bars */}
      <div className="flex items-end gap-0.5 h-6 px-1">
        {[1, 2, 3, 4, 5, 6].map((bar) => {
          // Dynamic heights when playing
          const randomDur = 0.5 + Math.random() * 0.8;
          return (
            <div
              key={bar}
              className="w-0.75 bg-gold-400 rounded-full transition-all"
              style={{
                height: isPlaying ? '100%' : '20%',
                transformOrigin: 'bottom',
                animation: isPlaying ? `bounce ${randomDur}s ease-in-out infinite alternate` : 'none',
                animationDelay: `${bar * 0.1}s`
              }}
            />
          );
        })}
      </div>

      <button
        onClick={toggleMute}
        className="text-gray-400 hover:text-gold-500 transition-colors p-1"
        title={isMuted ? 'Desmutar' : 'Mutar'}
        id="btn-toggle-mute"
      >
        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>

      {/* Progress Line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-100 rounded-t-full overflow-hidden">
        <div 
          className="h-full bg-gold-500 transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
