import { useState, useEffect, useRef } from 'react';
import { SYSTEM_HEADLINE_METRICS } from '../data/reportData';
import { Activity, ArrowRight, Sliders, CheckCircle2 } from 'lucide-react';

export function Hero() {
  const [activeSignalMode, setActiveSignalMode] = useState<'composite' | 'infrasound' | 'wind' | 'amplified'>('composite');
  const [frequency, setFrequency] = useState<number>(0.2); // 0.2 Hz typical volcanic/microbarom
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameId = useRef<number | null>(null);

  // Real-time oscilloscope animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const render = () => {
      time += 0.035;
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Grid background lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);

      for (let y = 20; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      for (let x = 30; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      ctx.setLineDash([]);

      // Baseline reference
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Render Traces based on activeSignalMode
      if (activeSignalMode === 'composite' || activeSignalMode === 'wind') {
        // Wind noise trace (incoherent high-frequency turbulent fluctuation)
        ctx.strokeStyle = activeSignalMode === 'wind' ? '#60A5FA' : 'rgba(96, 165, 250, 0.45)';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const t = time + x * 0.05;
          const n1 = Math.sin(t * 4.2) * 12;
          const n2 = Math.cos(t * 9.8 + 1.2) * 8;
          const n3 = Math.sin(t * 18.5) * 5;
          const gust = Math.sin(t * 0.4) * 14;
          const y = centerY + (n1 + n2 + n3 + gust);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      if (activeSignalMode === 'composite' || activeSignalMode === 'infrasound') {
        // Pure coherent infrasound wavefront
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = activeSignalMode === 'infrasound' ? 2.2 : 1.8;
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const t = time + x * 0.02;
          const primaryWave = Math.sin(t * (frequency * 3.5)) * 32;
          const secondHarmonic = Math.sin(t * (frequency * 7.0)) * 6;
          
          let y = centerY + primaryWave + secondHarmonic;
          if (activeSignalMode === 'composite') {
            const turbulence = (Math.sin((time + x * 0.05) * 8.0) * 4);
            y += turbulence;
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      if (activeSignalMode === 'amplified') {
        // Differential Output to ADS1256: ±4.8 V swing (9.6 V p-p differential)
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const t = time + x * 0.02;
          const amplifiedWave = Math.sin(t * (frequency * 3.5)) * 52;
          const y = centerY + amplifiedWave;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Differential rail limits ±4.8 V indication
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(0, centerY - 55);
        ctx.lineTo(width, centerY - 55);
        ctx.moveTo(0, centerY + 55);
        ctx.lineTo(width, centerY + 55);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [activeSignalMode, frequency]);

  return (
    <section id="hero" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Section-specific atmospheric wash: Deep oceanic blue & indigo radiance */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,rgba(37,99,235,0.24),transparent_75%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Affiliation Bar with subtle modern pill badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/15 text-[12px] mono text-amber-300 font-semibold backdrop-blur-md shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            SIH 2026 · Hardware Edition (SIH26144)
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-[12px] mono text-emerald-300 font-semibold backdrop-blur-md shadow-sm">
            <img src="/team-logo.svg" alt="Tinkerers Clan Logo" className="w-3.5 h-3.5 object-contain" referrerPolicy="no-referrer" />
            Tinkerers Clan
          </span>
        </div>

        {/* Hero Grid */}
        <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Title, Subtitle, Design Thesis, Action CTAs */}
          <div>
            <h1 className="text-[34px] leading-[1.15] sm:text-[46px] sm:leading-[1.1] lg:text-[50px] font-bold tracking-tight text-white">
              High-Sensitivity Microbarometer Infrasound Sensor
            </h1>

            <p className="mt-5 text-[16.5px] sm:text-[18px] text-slate-200 max-w-2xl leading-relaxed">
              Detecting micro-pascal atmospheric infrasound between <strong className="text-white font-semibold">0.01 Hz and 20 Hz</strong> with a computed noise floor of <strong className="text-amber-300 font-semibold">2.34 mPa RMS</strong> (21× margin over the 0.05 Pa target) and <strong className="text-white font-semibold">20.0 mV/Pa</strong> differential sensitivity.
            </p>

            <p className="mt-3.5 text-[15px] text-slate-200 max-w-2xl leading-relaxed font-normal">
              Engineered with a raw piezoresistive MEMS bridge (All Sensors MLV-L01D), a 100 mL borosilicate reference volume venting through a precision PEEK capillary (τ = 20.2 s), a zero-drift INA188 pre-amplifier, and a 4-arm spatial rosette to eliminate wind noise and weather drift at the source.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-3.5">
              <a
                href="#problem"
                id="hero-cta-solution"
                className="btn-primary rounded-xl px-5 py-2.5 text-[13px] font-semibold flex items-center gap-2"
              >
                <span>Problem &amp; Solution Flow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#specifications"
                id="hero-cta-specs"
                className="btn-secondary rounded-xl px-5 py-2.5 text-[13px] font-medium flex items-center gap-2"
              >
                <span>Target vs Actual Specs</span>
              </a>
              <a
                href="#calibration"
                id="hero-cta-cal"
                className="btn-secondary rounded-xl px-5 py-2.5 text-[13px] font-medium flex items-center gap-2"
              >
                <span>The 100s Paradox</span>
              </a>
            </div>

            {/* Quick Badges */}
            <div className="mt-8 pt-6 border-t border-white/[0.12] flex flex-wrap items-center gap-5 text-[12.5px] mono">
              <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                All 7 Evaluation Targets Met
              </span>
            </div>
          </div>

          {/* Right Column: Oscilloscope Waveform & Signal Inspector */}
          <div className="p-6 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/[0.12] shadow-2xl shadow-indigo-950/25">
            <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/[0.10]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center">
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <span className="mono text-[12.5px] font-bold text-white tracking-wider">
                  REAL-TIME SIGNAL DOMAIN INSPECTOR
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="mono text-[12px] text-slate-300 font-medium">
                  Passband: <span className="text-amber-400 font-semibold">0.01 – 20 Hz</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
            </div>

            {/* Canvas Display */}
            <div className="relative bg-[#060913]/95 border border-white/[0.10] rounded-xl overflow-hidden shadow-inner">
              <canvas
                ref={canvasRef}
                width={520}
                height={185}
                className="w-full h-auto block"
              />

              {/* Mode indicator badge */}
              <div className="absolute top-2.5 right-3 px-3 py-1 rounded-lg bg-slate-900/95 border border-white/15 backdrop-blur-md mono text-[11.5px] shadow-sm">
                {activeSignalMode === 'composite' && <span className="text-amber-300 font-semibold">Input: Atmospheric Wavefront + Wind</span>}
                {activeSignalMode === 'infrasound' && <span className="text-emerald-300 font-semibold">Coherent Infrasound Signal</span>}
                {activeSignalMode === 'wind' && <span className="text-blue-300 font-semibold">Incoherent Wind Eddies</span>}
                {activeSignalMode === 'amplified' && <span className="text-emerald-300 font-semibold">Differential Output: ±4.8 V @ ADS1256</span>}
              </div>

              {/* Signal details bottom overlay */}
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] mono text-slate-200 font-medium pointer-events-none bg-slate-950/70 px-2 py-0.5 rounded backdrop-blur-sm">
                <span>Working: ±240 Pa Peak (96% span)</span>
                <span>Gain: 711.2× Diff (57.0 dB)</span>
                <span>Floor: 2.34 mPa RMS</span>
              </div>
            </div>

            {/* Signal Mode Selectors */}
            <div className="mt-3.5 grid grid-cols-4 gap-2 mono text-[12px]">
              <button
                onClick={() => setActiveSignalMode('composite')}
                className={`px-2.5 py-1.5 rounded-xl border text-center transition-all ${
                  activeSignalMode === 'composite'
                    ? 'border-amber-400/60 bg-amber-400/15 text-amber-300 font-bold shadow-sm'
                    : 'border-white/[0.12] bg-white/[0.04] text-slate-200 hover:border-white/30 hover:text-white'
                }`}
              >
                Raw Input
              </button>

              <button
                onClick={() => setActiveSignalMode('infrasound')}
                className={`px-2.5 py-1.5 rounded-xl border text-center transition-all ${
                  activeSignalMode === 'infrasound'
                    ? 'border-emerald-400/60 bg-emerald-400/15 text-emerald-300 font-bold shadow-sm'
                    : 'border-white/[0.12] bg-white/[0.04] text-slate-200 hover:border-white/30 hover:text-white'
                }`}
              >
                Infrasound
              </button>

              <button
                onClick={() => setActiveSignalMode('wind')}
                className={`px-2.5 py-1.5 rounded-xl border text-center transition-all ${
                  activeSignalMode === 'wind'
                    ? 'border-blue-400/60 bg-blue-400/15 text-blue-300 font-bold shadow-sm'
                    : 'border-white/[0.12] bg-white/[0.04] text-slate-200 hover:border-white/30 hover:text-white'
                }`}
              >
                Wind Noise
              </button>

              <button
                onClick={() => setActiveSignalMode('amplified')}
                className={`px-2.5 py-1.5 rounded-xl border text-center transition-all ${
                  activeSignalMode === 'amplified'
                    ? 'border-emerald-400/60 bg-emerald-500/15 text-emerald-300 font-bold shadow-sm'
                    : 'border-white/[0.12] bg-white/[0.04] text-slate-200 hover:border-white/30 hover:text-white'
                }`}
              >
                ±4.8V Output
              </button>
            </div>

            {/* Frequency Selector Buttons */}
            <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-white/[0.10] text-[12px] mono">
              <span className="text-slate-200 flex items-center gap-1.5 font-medium">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                Test Frequency:
              </span>
              <div className="flex gap-1.5">
                {[
                  { label: '0.05 Hz Microbarom', val: 0.05 },
                  { label: '0.2 Hz Volcanic', val: 0.2 },
                  { label: '1.0 Hz Calib', val: 1.0 },
                ].map(freq => (
                  <button
                    key={freq.val}
                    onClick={() => setFrequency(freq.val)}
                    className={`px-2.5 py-1 rounded-lg text-[11.5px] transition-all ${
                      frequency === freq.val
                        ? 'bg-indigo-500/25 text-indigo-200 border border-indigo-500/40 font-bold'
                        : 'text-slate-200 hover:text-white bg-white/[0.04] border border-white/[0.08]'
                    }`}
                  >
                    {freq.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 6 Headline Technical Metrics Grid */}
        <div className="mt-16 pt-10 border-t border-white/[0.10]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-2">
            <span className="mono text-[12px] uppercase tracking-wider text-slate-300 font-semibold">
              Core Design Parameters &amp; Computed Values
            </span>
            <span className="mono text-[12px] text-amber-300 font-semibold">All Values Derived From Component Datasheets</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {SYSTEM_HEADLINE_METRICS.map(stat => (
              <div
                key={stat.id}
                className="p-4 rounded-2xl bg-slate-900/75 backdrop-blur-md border border-white/[0.12] hover:border-indigo-500/50 transition-all shadow-md shadow-black/25 group"
              >
                <div className="mono text-[11px] uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors font-semibold">
                  {stat.label}
                </div>
                <div className="mt-2 mono stat-num text-[21px] font-bold text-amber-400 leading-tight">
                  {stat.value}
                </div>
                <div className="mono text-[12px] text-slate-200 mt-0.5 font-medium">
                  {stat.unit}
                </div>
                <p className="mt-2 text-[12px] text-slate-300 leading-snug line-clamp-2">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
