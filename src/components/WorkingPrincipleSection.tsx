import { useState } from 'react';
import { Gauge, Wind, Activity } from 'lucide-react';

export function WorkingPrincipleSection() {
  const [activeTab, setActiveTab] = useState<'pneumatic' | 'coherence'>('pneumatic');

  return (
    <section id="principle" className="py-24 border-t border-white/[0.08] relative overflow-hidden">
      {/* Section-specific atmospheric aura: Indigo & violet resonance */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_85%_70%_at_85%_50%,rgba(139,92,246,0.18),rgba(99,102,241,0.14)_50%,transparent_75%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <div className="mono text-[12px] uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2 font-semibold">
              <Activity className="w-4 h-4 text-amber-400" />
              Physical Working Principle
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-bold tracking-tight text-white">
              Acoustic RC equalization &amp; spatial wavefront coherence
            </h2>
          </div>
          <p className="text-[15.5px] text-slate-200 max-w-xl leading-relaxed font-normal">
            How the microbarometer separates sub-pascal infrasound signals from ambient atmosphere using fluid dynamics and wave physics.
          </p>
        </div>

        {/* Modern Segmented Tab Toggle */}
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-950/70 border border-white/[0.12] mb-10 gap-2 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('pneumatic')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2.5 mono text-[13px] font-semibold transition-all ${
              activeTab === 'pneumatic'
                ? 'bg-indigo-600/30 text-white border border-indigo-500/50 shadow-sm shadow-indigo-950/40'
                : 'text-slate-200 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Gauge className="w-4 h-4 text-amber-400" />
            <span>Principle 1: Pneumatic RC Differential Filter</span>
          </button>

          <button
            onClick={() => setActiveTab('coherence')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2.5 mono text-[13px] font-semibold transition-all ${
              activeTab === 'coherence'
                ? 'bg-indigo-600/30 text-white border border-indigo-500/50 shadow-sm shadow-indigo-950/40'
                : 'text-slate-200 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Wind className="w-4 h-4 text-blue-400" />
            <span>Principle 2: Spatial Coherence Wind Averaging</span>
          </button>
        </div>

        {/* Principle 1: Pneumatic RC Equalizer */}
        {activeTab === 'pneumatic' && (
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mono text-[12px] text-amber-300 mb-2 uppercase font-bold">
                DIFFERENTIAL PRESSURE SENSING: ΔP = Pa - Pb
              </div>
              <h3 className="text-[24px] font-bold text-white mb-3">
                The Acoustic Low-Pass Reference Cavity
              </h3>
              <p className="text-[15px] text-slate-200 leading-relaxed mb-5 font-normal">
                The sensor diaphragm measures the difference between Port A (ambient atmosphere) and Port B (sealed reference bottle). Slow barometric weather changes bleed through the 0.30 mm bore capillary and equalize across both ports (Pa ≈ Pb &rarr; &Delta;P &rarr; 0). Dynamic infrasound fluctuations (&gt;0.01 Hz) occur too rapidly to bleed through, appearing fully across the diaphragm.
              </p>

              <div className="space-y-3.5 mono text-[12.5px]">
                <div className="p-4 bg-slate-900/75 border border-white/[0.12] rounded-xl flex items-start gap-3 backdrop-blur-md">
                  <span className="text-emerald-300 font-bold flex-shrink-0">Acoustic RC Analogy:</span>
                  <span className="text-slate-200 font-normal">
                    Flow resistance R_a (capillary) and volume compliance C_a (bottle) form an acoustic high-pass with time constant <strong className="text-white font-semibold">&tau; = Ra &times; Ca = 20.2 s</strong> (fc = 7.9 mHz).
                  </span>
                </div>
                <div className="p-4 bg-slate-900/75 border border-white/[0.12] rounded-xl flex items-start gap-3 backdrop-blur-md">
                  <span className="text-amber-300 font-bold flex-shrink-0">Target Corner Alignment:</span>
                  <span className="text-slate-200 font-normal">
                    Coupling this 7.9 mHz acoustic pole with the 4.8 mHz electrical AC coupling pole places the combined band edge at <strong className="text-amber-300 font-semibold">exactly -3.0 dB at 0.01 Hz</strong> with 64° phase lead.
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Pneumatic Schematic Card */}
            <div className="p-7 rounded-2xl bg-slate-900/75 backdrop-blur-xl border border-white/[0.12] shadow-xl shadow-indigo-950/20">
              <div className="mono text-[12px] text-slate-200 uppercase mb-4 font-bold tracking-wider">
                Pneumatic Signal Flow &amp; Poiseuille Mechanics
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-white/[0.10] mb-5">
                <div className="flex items-center justify-between text-[12px] mono text-slate-300 mb-2.5 font-medium">
                  <span>Atmosphere P(t)</span>
                  <span className="text-amber-300 font-semibold">Port A: Direct Input</span>
                </div>
                <div className="flex items-center justify-center p-3.5 rounded-lg bg-indigo-500/15 border border-indigo-500/35 mono text-[13px] text-white font-bold mb-2.5">
                  MLV-L01D Diaphragm: ΔP = Pa - Pb
                </div>
                <div className="flex items-center justify-between text-[12px] mono text-slate-300 font-medium">
                  <span>PEEK Capillary (0.30mm ID)</span>
                  <span className="text-blue-300 font-semibold">Port B: 100 mL Sealed Bottle</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5 mono text-[12.5px]">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.10]">
                  <span className="text-[11.5px] text-slate-300 block mb-1 font-medium">Flow Resistance:</span>
                  <span className="text-white font-bold">9.10 × 10¹⁰ Pa·s/m³ per m</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.10]">
                  <span className="text-[11.5px] text-slate-300 block mb-1 font-medium">Volume Compliance:</span>
                  <span className="text-white font-bold">7.19 × 10⁻¹⁰ m³/Pa</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Principle 2: Spatial Coherence Wind Averaging */}
        {activeTab === 'coherence' && (
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mono text-[12px] text-amber-300 mb-2 uppercase font-bold">
                SPATIAL SAMPLING: N = 4 PORTS
              </div>
              <h3 className="text-[24px] font-bold text-white mb-3">
                Why Spatial Averaging Filters Wind Turbulence
              </h3>
              <p className="text-[15px] text-slate-200 leading-relaxed mb-5 font-normal">
                Infrasound waves travel from distant sources with acoustic wavelengths spanning hundreds of meters (&lambda; = c / f = 340 / 1 Hz = 340 m). Across a 2 m rosette, the plane wave strikes all 4 ports in phase. Conversely, wind turbulence consists of localized, uncorrelated eddies smaller than 1 m.
              </p>

              <div className="space-y-3.5 mono text-[12.5px]">
                <div className="p-4 bg-slate-900/75 border border-white/[0.12] rounded-xl flex items-start gap-3 backdrop-blur-md">
                  <span className="text-emerald-300 font-bold flex-shrink-0">Coherent Infrasound:</span>
                  <span className="text-slate-200 font-normal">
                    Wavefronts sum linearly: S_total = &Sigma; S_i = 4 &times; S. Central manifold averages back to 1.0 &times; S with zero phase distortion.
                  </span>
                </div>
                <div className="p-4 bg-slate-900/75 border border-white/[0.12] rounded-xl flex items-start gap-3 backdrop-blur-md">
                  <span className="text-blue-300 font-bold flex-shrink-0">Incoherent Wind:</span>
                  <span className="text-slate-200 font-normal">
                    Eddies sum in root-sum-square: &sigma;_total = &radic;(&Sigma; &sigma;_i&sup2;) = &radic;4 &times; &sigma; = 2 &times; &sigma;. Central averaging halves incoherent noise (<strong className="text-amber-300 font-semibold">+6.02 dB SNR gain</strong>).
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Wave Summing Illustration */}
            <div className="p-7 rounded-2xl bg-slate-900/75 backdrop-blur-xl border border-white/[0.12] shadow-xl shadow-indigo-950/20">
              <div className="mono text-[12px] text-slate-200 uppercase mb-4 font-bold tracking-wider">
                Organ-Pipe Resonance Check: c / 4L
              </div>

              <div className="space-y-3.5 mono text-[12.5px]">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-white/[0.10]">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-slate-300 font-medium">Rosette Arm Length:</span>
                    <span className="text-white font-semibold">1.0 m (1.4 m to outlet)</span>
                  </div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-slate-300 font-medium">First Quarter-Wave Resonance:</span>
                    <span className="text-emerald-300 font-bold">f_res ≈ 61 Hz</span>
                  </div>
                  <p className="text-[12px] text-slate-300 mt-2.5 leading-relaxed font-normal">
                    Sitting at 61 Hz places the acoustic pipe resonance <strong className="text-white font-semibold">&gt;3× above the 20 Hz passband edge</strong>, avoiding resonance skirt peaking in the measurement band.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-white/[0.10]">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-slate-300 font-medium">Viscous Low-Pass Cutoff:</span>
                    <span className="text-amber-300 font-bold">≈ 450 Hz</span>
                  </div>
                  <p className="text-[12px] text-slate-300 mt-1.5 leading-relaxed font-normal">
                    Flow resistance of 6–8 mm ID tubes is negligible compared to the capillary, having zero effect on system calibration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
