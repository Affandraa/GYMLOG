import React, { useState, useEffect } from 'react'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Volume2, 
  VolumeX, 
  Timer, 
  X,
  ChevronUp,
  ChevronDown
} from 'lucide-react'
import { soundService } from '../../services/soundEffects'

interface RestTimerBarProps {
  initialSeconds?: number
  isOpen: boolean
  onClose: () => void
}

export const RestTimerBar: React.FC<RestTimerBarProps> = ({
  initialSeconds = 90,
  isOpen,
  onClose
}) => {
  const [totalSeconds, setTotalSeconds] = useState<number>(initialSeconds)
  const [remainingSeconds, setRemainingSeconds] = useState<number>(initialSeconds)
  const [isRunning, setIsRunning] = useState<boolean>(true)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true)
  const [isMinimized, setIsMinimized] = useState<boolean>(false)

  // Sync if initialSeconds changes
  useEffect(() => {
    setTotalSeconds(initialSeconds)
    setRemainingSeconds(initialSeconds)
    setIsRunning(true)
  }, [initialSeconds])

  // Countdown effect
  useEffect(() => {
    let interval: any = null

    if (isRunning && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            setIsRunning(false)
            if (soundEnabled) {
              soundService.playRestFinishedChime()
            }
            return 0
          }
          if (prev <= 4 && prev > 1 && soundEnabled) {
            soundService.playCountdownPip()
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, remainingSeconds, soundEnabled])

  if (!isOpen) return null

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const handleSetDuration = (secs: number) => {
    setTotalSeconds(secs)
    setRemainingSeconds(secs)
    setIsRunning(true)
  }

  const handleAdd30s = () => {
    setRemainingSeconds((prev) => prev + 30)
    setTotalSeconds((prev) => Math.max(prev, remainingSeconds + 30))
  }

  const handleReset = () => {
    setRemainingSeconds(totalSeconds)
    setIsRunning(false)
  }

  const progressPercent = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0

  return (
    <div className="fixed left-3 right-3 sm:left-auto sm:right-4 z-50 sm:max-w-sm sm:w-full transition-all bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:bottom-4">
      <div className="bg-zinc-900 border border-emerald-500/60 rounded-2xl shadow-2xl p-4 backdrop-blur-md ring-1 ring-emerald-500/30">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Rest Timer
            </span>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-zinc-800 text-emerald-400">
              {remainingSeconds === 0 ? 'REST DONE!' : isRunning ? 'COUNTING DOWN' : 'PAUSED'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1 text-zinc-400 hover:text-white rounded"
              title={soundEnabled ? 'Mute Chime' : 'Enable Chime'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-500" />}
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 text-zinc-400 hover:text-white rounded"
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 text-zinc-500 hover:text-zinc-300 rounded"
              title="Close Timer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Minimized View */}
        {isMinimized ? (
          <div className="flex items-center justify-between pt-2">
            <span className="text-xl font-black font-mono text-emerald-400">
              {formatTime(remainingSeconds)}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-3 py-1 bg-emerald-500 text-zinc-950 font-bold text-xs rounded-lg"
              >
                {isRunning ? 'Pause' : 'Resume'}
              </button>
              <button
                onClick={handleAdd30s}
                className="px-2 py-1 bg-zinc-800 text-zinc-200 text-xs rounded-lg"
              >
                +30s
              </button>
            </div>
          </div>
        ) : (
          /* Expanded Full Controls */
          <div className="pt-3 space-y-3">
            {/* Countdown Display & Progress Bar */}
            <div className="text-center space-y-1">
              <div className="text-4xl font-black font-mono tracking-tight bg-gradient-to-r from-white via-zinc-100 to-emerald-400 bg-clip-text text-transparent">
                {formatTime(remainingSeconds)}
              </div>
              <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${100 - progressPercent}%` }}
                />
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="grid grid-cols-5 gap-1 text-[11px] font-mono">
              {[30, 60, 90, 120, 180].map((s) => (
                <button
                  key={s}
                  onClick={() => handleSetDuration(s)}
                  className={`py-1 rounded-lg border transition-all cursor-pointer ${
                    totalSeconds === s
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {s < 60 ? `${s}s` : `${s / 60}m`}
                </button>
              ))}
            </div>

            {/* Main Action Controls */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handleReset}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                title="Reset to duration"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-6 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Start</span>
                  </>
                )}
              </button>

              <button
                onClick={handleAdd30s}
                className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                title="Add 30 seconds"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>30s</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
