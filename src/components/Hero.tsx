import { useState, useEffect, useRef } from 'react';
import { SYSTEM_HEADLINE_METRICS } from '../data/reportData';
import { Activity, ArrowRight, Sliders, ShieldCheck, Gauge } from 'lucide-react';

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
      ctx.strokeStyle = '#1A2332';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);

      // Horizontal divisions
      for (let y = 20; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vertical divisions
      for (let x = 30; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      ctx.setLineDash([]);

      // Baseline reference
      ctx.strokeStyle = '#232E40';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Render Traces based on activeSignalMode
      if (activeSignalMode === 'composite' || activeSignalMode === 'wind') {
        // Wind noise trace (incoherent high-frequency turbulent fluctuation)
        ctx.strokeStyle = activeSignalMode === 'wind' ? '#5B7A99' : 'rgba(91, 122, 153, 0.45)';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const t = time + x * 0.05;
          // Pseudo-random turbulence simulation
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
        ctx.strokeStyle = '#F0A868';
        ctx.lineWidth = activeSignalMode === 'infrasound' ? 2.2 : 1.8;
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const t = time + x * 0.02;
          // Clean low-frequency harmonic (0.01 - 20 Hz simulation)
          const primaryWave = Math.sin(t * (frequency * 3.5)) * 32;
          const secondHarmonic = Math.sin(t * (frequency * 7.0)) * 6;
          
          let y = centerY + primaryWave + secondHarmonic;
          if (activeSignalMode === 'composite') {
            // Add slight ambient turbulence
            const turbulence = (Math.sin((time + x * 0.05) * 8.0) * 4);
            y += turbulence;
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      if (activeSignalMode === 'amplified') {
        // Stage 6 ADC Input: ±2.11 V swing centered on 2.5 V mid-rail pedestal
        ctx.strokeStyle = '#4EBAAA';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const t = time + x * 0.02;
          const amplifiedWave = Math.sin(t * (frequency * 3.5)) * 48; // High amplitude output
          const y = centerY + amplifiedWave;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // 2.5V mid-rail pedestal indicator
        ctx.strokeStyle = 'rgba(78, 186, 170, 0.4)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
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
    <section id="hero" className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
      <div className="absolute inset-0 grid-fade pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Title, Subtitle, Design Thesis, Action CTAs */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#151B27] border border-[var(--line)] text-[11px] mono text-[var(--signal)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)] animate-pulse"></span>
                Smart India Hackathon · SIH26144
              </span>
              <span className="text-[11px] mono text-[var(--text-faint)]">Final Design Report · Blocks (a) to (i)</span>
            </div>

            <h1 className="text-[34px] leading-[1.12] sm:text-[48px] sm:leading-[1.08] lg:text-[52px] font-semibold tracking-tight text-[var(--text)]">
              Capturing the unseen: a high-sensitivity atmospheric microbarometer
            </h1>

            <p className="mt-5 text-[16px] sm:text-[17px] text-[var(--text-dim)] max-w-2xl leading-relaxed">
              Precision infrasound detection engineered to reject wind turbulence, weather drift, and environmental noise through a tripartite mechanical, pneumatic, and electrical filter matrix.
            </p>

            <p className="mt-3.5 text-[14px] text-[var(--text-dim)] max-w-2xl leading-relaxed">
              Resolving micro-pascal infrasound anomalies across <strong className="text-[var(--text)] font-medium">0.01 – 20 Hz</strong> by pairing an unamplified piezoresistive Wheatstone bridge (All Sensors MLV-L01D) with a custom 247 mm PEEK capillary reference cavity and a 4-arm spatial rosette to achieve a computed noise floor of <strong className="text-[var(--signal)] font-medium">8.07 mPa RMS</strong>.
            </p>

            <div className="mt-8 flex flex-wrap gap-3.5">
              <a
                href="#architecture"
                id="hero-cta-architecture"
                className="btn-primary rounded-sm px-5 py-3 text-[13px] mono flex items-center gap-2 shadow-sm"
              >
                <span>Explore Signal Chain</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#calibration"
                id="hero-cta-calibration"
                className="btn-secondary rounded-sm px-5 py-3 text-[13px] mono flex items-center gap-2"
              >
                <span>Noise & Calibration (80s Paradox)</span>
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--line)] flex flex-wrap items-center gap-6 text-[12px] mono text-[var(--text-faint)]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Single 5V Rail · Single-Point Star Ground
              </span>
              <span className="flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-[var(--signal)]" />
                LTspice XVII Simulated &amp; Mathematically Verified
              </span>
            </div>
          </div>

          {/* Right Column: Oscilloscope Waveform & Signal Inspector */}
          <div className="bracket-frame p-5 panel rounded-sm shadow-2xl">
            <span className="bf-tr"></span>
            <span className="bf-br"></span>

            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--line)]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[var(--signal)]" />
                <span className="mono text-[11.5px] font-medium text-[var(--text)] tracking-wider">
                  ACOUSTIC SIGNAL SIMULATOR
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="mono text-[10.5px] text-[var(--text-faint)]">
                  fc: <span className="text-[var(--signal)]">0.01 – 20 Hz</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
            </div>

            {/* Canvas Display */}
            <div className="relative bg-[#080B11] border border-[var(--line)] rounded-sm overflow-hidden">
              <canvas
                ref={canvasRef}
                width={520}
                height={190}
                className="w-full h-auto block"
              />

              {/* Mode indicator badge */}
              <div className="absolute top-2.5 right-3 px-2 py-0.5 rounded-sm bg-[#10151F]/90 border border-[var(--line)] mono text-[10px]">
                {activeSignalMode === 'composite' && <span className="text-[var(--signal)]">Atmosphere: Signal + Wind</span>}
                {activeSignalMode === 'infrasound' && <span className="text-emerald-400">Coherent Infrasound Target</span>}
                {activeSignalMode === 'wind' && <span className="text-[var(--noise)]">Turbulent Wind Noise (Incoherent)</span>}
                {activeSignalMode === 'amplified' && <span className="text-[#4EBAAA]">Stage 6 Output: ±2.11 V @ ADC</span>}
              </div>

              {/* Signal details bottom overlay */}
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[9.5px] mono text-[var(--text-faint)] pointer-events-none">
                <span>P_in: {activeSignalMode === 'amplified' ? '±50 Pa Peak' : '0.1 – 1.0 Pa Coherent'}</span>
                <span>Gain: {activeSignalMode === 'amplified' ? '1499× (63.5 dB)' : '1.0× Acoustic'}</span>
                <span>Floor: 8.07 mPa RMS</span>
              </div>
            </div>

            {/* Signal Mode Selectors */}
            <div className="mt-3 grid grid-cols-4 gap-1.5 mono text-[10.5px]">
              <button
                onClick={() => setActiveSignalMode('composite')}
                className={`px-2 py-1.5 rounded-sm border text-center transition-colors ${
                  activeSignalMode === 'composite'
                    ? 'border-[var(--signal)] bg-[var(--signal-soft)] text-[var(--signal)]'
                    : 'border-[var(--line)] text-[var(--text-dim)] hover:border-[var(--text-faint)]'
                }`}
              >
                Raw Composite
              </button>

              <button
                onClick={() => setActiveSignalMode('infrasound')}
                className={`px-2 py-1.5 rounded-sm border text-center transition-colors ${
                  activeSignalMode === 'infrasound'
                    ? 'border-emerald-400 bg-emerald-500/10 text-emerald-400'
                    : 'border-[var(--line)] text-[var(--text-dim)] hover:border-[var(--text-faint)]'
                }`}
              >
                Coherent Wave
              </button>

              <button
                onClick={() => setActiveSignalMode('wind')}
                className={`px-2 py-1.5 rounded-sm border text-center transition-colors ${
                  activeSignalMode === 'wind'
                    ? 'border-[var(--noise)] bg-[var(--noise-soft)] text-[var(--noise)]'
                    : 'border-[var(--line)] text-[var(--text-dim)] hover:border-[var(--text-faint)]'
                }`}
              >
                Wind Eddies
              </button>

              <button
                onClick={() => setActiveSignalMode('amplified')}
                className={`px-2 py-1.5 rounded-sm border text-center transition-colors ${
                  activeSignalMode === 'amplified'
                    ? 'border-[#4EBAAA] bg-[#4EBAAA]/10 text-[#4EBAAA]'
                    : 'border-[var(--line)] text-[var(--text-dim)] hover:border-[var(--text-faint)]'
                }`}
              >
                ADC Voltage
              </button>
            </div>

            {/* Frequency Selector Buttons */}
            <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-[var(--line)] text-[11px] mono">
              <span className="text-[var(--text-faint)] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[var(--signal)]" />
                Test Wavefront:
              </span>
              <div className="flex gap-2">
                {[
                  { label: '0.05 Hz Microbarom', val: 0.05 },
                  { label: '0.2 Hz Volcanic', val: 0.2 },
                  { label: '1.0 Hz Calib Tone', val: 1.0 },
                ].map(freq => (
                  <button
                    key={freq.val}
                    onClick={() => setFrequency(freq.val)}
                    className={`px-2 py-0.5 rounded-sm text-[10px] transition-colors ${
                      frequency === freq.val
                        ? 'bg-[var(--line)] text-[var(--signal)] font-medium'
                        : 'text-[var(--text-faint)] hover:text-[var(--text-dim)]'
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
        <div className="mt-16 pt-10 border-t border-[var(--line)]">
          <div className="flex items-center justify-between mb-5">
            <span className="mono text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
              Core Instrument Physical Specifications &amp; Working Points
            </span>
            <span className="mono text-[11px] text-[var(--signal)]">Verified via Component Datasheets &amp; LTspice</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {SYSTEM_HEADLINE_METRICS.map(stat => (
              <div
                key={stat.id}
                className="panel-alt p-4 rounded-sm border border-[var(--line)] hover:border-[var(--text-faint)] transition-colors group"
              >
                <div className="mono text-[9.5px] uppercase tracking-wider text-[var(--text-faint)] group-hover:text-[var(--text-dim)]">
                  {stat.label}
                </div>
                <div className="mt-2 mono stat-num text-[20px] font-semibold text-[var(--signal)] leading-tight">
                  {stat.value}
                </div>
                <div className="mono text-[10.5px] text-[var(--text-dim)] mt-0.5">
                  {stat.unit}
                </div>
                <p className="mt-2.5 text-[11.5px] text-[var(--text-faint)] leading-snug line-clamp-3">
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
