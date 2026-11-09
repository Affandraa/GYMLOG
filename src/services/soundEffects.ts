/**
 * Generates audio tones using the Web Audio API without needing external sound files.
 */
class SoundService {
  private ctx: AudioContext | null = null

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }
    return this.ctx
  }

  /**
   * Short countdown pip (e.g. at 3, 2, 1)
   */
  playCountdownPip() {
    try {
      const ctx = this.getAudioContext()
      if (!ctx) return
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(600, ctx.currentTime)

      gain.gain.setValueAtTime(0.12, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.15)
    } catch {
      // Audio might be blocked by browser autoplay policy before user gesture
    }
  }

  /**
   * Pleasant chime when rest finishes
   */
  playRestFinishedChime() {
    try {
      const ctx = this.getAudioContext()
      if (!ctx) return

      const now = ctx.currentTime
      const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6 arpeggio

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, now + idx * 0.1)

        gain.gain.setValueAtTime(0.15, now + idx * 0.1)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.35)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + idx * 0.1)
        osc.stop(now + idx * 0.1 + 0.4)
      })
    } catch {
      // Audio error fallback
    }
  }

  /**
   * Personal record celebration chime
   */
  playPRCelebration() {
    try {
      const ctx = this.getAudioContext()
      if (!ctx) return
      const now = ctx.currentTime
      const notes = [440, 554.37, 659.25, 880] // A major triad

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.08)

        gain.gain.setValueAtTime(0.18, now + idx * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.5)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + idx * 0.08)
        osc.stop(now + idx * 0.08 + 0.6)
      })
    } catch {}
  }
}

export const soundService = new SoundService()
