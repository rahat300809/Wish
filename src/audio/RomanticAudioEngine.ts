/**
 * Web Audio API Ambient Romantic Synthesizer & Interactive Sound Engine
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;

  // Romantic pentatonic chord progression frequencies (C major / A minor dreamy romantic key)
  private chords = [
    [261.63, 329.63, 392.00, 493.88, 523.25], // Cmaj7, C5
    [220.00, 261.63, 329.63, 392.00, 440.00], // Am7, A4
    [174.61, 220.00, 261.63, 329.63, 349.23], // Fmaj7, F4
    [196.00, 246.94, 293.66, 392.00, 493.88], // Gsus4 / G6
  ];
  private chordIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMusic(): boolean {
    this.initContext();
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public startMusic() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    this.isPlaying = true;
    this.scheduleNextArpeggio();
  }

  public stopMusic() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  private scheduleNextArpeggio() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const currentChord = this.chords[this.chordIndex];
    this.chordIndex = (this.chordIndex + 1) % this.chords.length;

    // Play dreamy chord notes gently spread over 3.5 seconds
    currentChord.forEach((freq, idx) => {
      const delay = idx * 0.35 + (Math.random() * 0.1);
      this.playSoftNote(freq, delay, 3.0);
    });

    // Also warm bass foundation
    const bassFreq = currentChord[0] / 2;
    this.playSoftNote(bassFreq, 0, 4.0, 'sine', 0.25);

    // Schedule next cycle
    this.timerId = window.setTimeout(() => {
      this.scheduleNextArpeggio();
    }, 2800);
  }

  private playSoftNote(freq: number, delaySec: number, durationSec: number, type: OscillatorType = 'sine', vol = 0.12) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime + delaySec;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    // Soft attack, gentle exponential decay
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(vol, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + durationSec);
  }

  // Interactive sparkle/chime sound on click
  public playChime(pitchMultiplier = 1.0) {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const freqs = [523.25, 659.25, 783.99, 1046.50].map(f => f * pitchMultiplier);
    freqs.forEach((freq, i) => {
      const now = this.ctx!.currentTime + i * 0.06;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + 0.8);
    });
  }

  // Heartbeat pulse sound effect
  public playHeartbeat() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const now = this.ctx.currentTime;
    [0, 0.28].forEach((offset) => {
      const t = now + offset;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(65, t);
      osc.frequency.exponentialRampToValueAtTime(35, t + 0.25);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.4, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(t);
      osc.stop(t + 0.3);
    });
  }
}

export const audioEngine = new RomanticAudioEngine();
