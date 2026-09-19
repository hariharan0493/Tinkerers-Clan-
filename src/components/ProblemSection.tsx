import { useState } from 'react';
import { Wind, Gauge, ShieldAlert, Cpu, Check, AlertTriangle, ArrowRight } from 'lucide-react';

export function ProblemSection() {
  const [activeTab, setActiveTab] = useState<'coherence' | 'drift' | 'asic'>('coherence');

  return (
    <section id="problem" className="py-20 sm:py-28 border-t border-[var(--line)] bg-[#0C1019]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="mono text-[11px] uppercase tracking-wider text-[var(--text-faint)] mb-2 flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-[var(--signal)]" />
              The Infrasound Measurement Problem
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-semibold tracking-tight text-[var(--text)]">
              Listening through overwhelming atmospheric noise
            </h2>
          </div>
          <p className="text-[14.5px] text-[var(--text-dim)] max-w-xl leading-relaxed">
            Infrasound detection cannot be solved by electronic amplification alone. Wind turbulence and barometric weather changes occupy the exact same frequencies and overwhelm sensitive transducers by multiple orders of magnitude.
          </p>
        </div>

        {/* 3 Core Technical Dilemmas Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          
          <div
            onClick={() => setActiveTab('coherence')}
            className={`card p-6 rounded-sm cursor-pointer transition-all ${
              activeTab === 'coherence'
                ? 'border-[var(--signal)] bg-[#121824]'
                : 'border-[var(--line)]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="w-8 h-8 rounded-sm bg-[var(--signal-soft)] text-[var(--signal)] flex items-center justify-center mono text-[13px] font-semibold">
                01
              </span>
              <span className="mono text-[10.5px] text-[var(--signal)] bg-[var(--signal-soft)] px-2 py-0.5 rounded-sm">
                SPATIAL INCOHERENCE
              </span>
            </div>
            <h3 className="text-[17px] font-semibold text-[var(--text)] mb-2">
              The Frequency Overlap Trap
            </h3>
            <p className="text-[13.5px] text-[var(--text-dim)] leading-relaxed">
              Wind turbulence eddies generate pressure fluctuations directly inside 0.01 – 20 Hz. Because wind and infrasound share identical frequencies, an electrical low-pass or bandpass filter is structurally incapable of distinguishing them.
            </p>
            <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between text-[11.5px] mono text-[var(--signal)]">
              <span>Solution: 4-Arm Rosette</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => setActiveTab('drift')}
            className={`card p-6 rounded-sm cursor-pointer transition-all ${
              activeTab === 'drift'
                ? 'border-[var(--noise)] bg-[#121824]'
                : 'border-[var(--line)]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="w-8 h-8 rounded-sm bg-[var(--noise-soft)] text-[var(--noise)] flex items-center justify-center mono text-[13px] font-semibold">
                02
              </span>
              <span className="mono text-[10.5px] text-[var(--noise)] bg-[var(--noise-soft)] px-2 py-0.5 rounded-sm">
                DYNAMIC RANGE (10⁶:1)
              </span>
            </div>
            <h3 className="text-[17px] font-semibold text-[var(--text)] mb-2">
              Diurnal Barometric Weather Drift
            </h3>
            <p className="text-[13.5px] text-[var(--text-dim)] leading-relaxed">
              Standard barometric weather variations span kilopascals over hours. If a high-gain micro-pascal amplifier were DC-coupled directly to the atmosphere, normal weather would drive the sensor hundreds of times beyond its ±249 Pa full-scale range.
            </p>
            <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between text-[11.5px] mono text-[var(--noise)]">
              <span>Solution: Capillary RC Equalizer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => setActiveTab('asic')}
            className={`card p-6 rounded-sm cursor-pointer transition-all ${
              activeTab === 'asic'
                ? 'border-emerald-400 bg-[#121824]'
                : 'border-[var(--line)]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="w-8 h-8 rounded-sm bg-emerald-500/10 text-emerald-400 flex items-center justify-center mono text-[13px] font-semibold">
                03
              </span>
              <span className="mono text-[10.5px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm">
                QUANTIZATION LIMITS
              </span>
            </div>
            <h3 className="text-[17px] font-semibold text-[var(--text)] mb-2">
              The ASIC Resolution Trap
            </h3>
            <p className="text-[13.5px] text-[var(--text-dim)] leading-relaxed">
              Standard digital and conditioned differential pressure sensors (like the ELVH-L01D) perform internal 11-bit digitization, creating a hard quantization floor near 0.24 Pa. Information discarded inside the ASIC can never be recovered downstream.
            </p>
            <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between text-[11.5px] mono text-emerald-400">
              <span>Solution: Raw Unamplified Bridge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

        {/* Detailed Interactive Comparison Inspector */}
        <div className="bracket-frame panel p-6 sm:p-8 rounded-sm">
          <span className="bf-tr"></span>
          <span className="bf-br"></span>

          {activeTab === 'coherence' && (
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="mono text-[11px] text-[var(--signal)] mb-2 flex items-center gap-2">
                  <Wind className="w-4 h-4" />
                  MECHANICAL COHERENCE REJECTION PRINCIPLE
                </div>
                <h3 className="text-[22px] font-semibold text-[var(--text)]">
                  Why Electronics Cannot Filter Wind Noise
                </h3>
                <p className="mt-3 text-[14px] text-[var(--text-dim)] leading-relaxed">
                  Wind turbulence consists of turbulent vortices whose instantaneous pressures vary randomly from point to point across distances of 1 meter. In contrast, infrasound originates from distant sources (volcanoes, bolides, supersonic aircraft) and propagates as an acoustic plane wave that strikes all array ports with near-identical phase.
                </p>
                
                <div className="mt-5 space-y-3 mono text-[12.5px]">
                  <div className="p-3 bg-[#0A0E16] border border-[var(--line)] rounded-sm flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">Planar Infrasound:</span>
                    <span className="text-[var(--text-dim)]">Arrives in-phase at all 4 ports → Sums constructively as <strong className="text-[var(--text)]">4 × P_signal</strong>.</span>
                  </div>
                  <div className="p-3 bg-[#0A0E16] border border-[var(--line)] rounded-sm flex items-start gap-3">
                    <span className="text-[var(--noise)] font-bold">Turbulent Wind:</span>
                    <span className="text-[var(--text-dim)]">Uncorrelated spatially across 1 m → Sums quadratically as <strong className="text-[var(--text)]">√4 × P_noise = 2 × P_noise</strong>.</span>
                  </div>
                  <div className="p-2.5 bg-[var(--signal-soft)] border border-[var(--signal-border)] rounded-sm text-[var(--signal)] flex items-center justify-between">
                    <span>Net Signal-to-Noise Ratio Gain:</span>
                    <span className="font-semibold">+6.02 dB (2× Voltage Ratio)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-[#080B11] border border-[var(--line)] rounded-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="mono text-[11px] text-[var(--signal)]">Target Planar Wavefront (Coherent across 1m)</span>
                    <span className="mono text-[10px] text-emerald-400">Phase: Δθ ≈ 0°</span>
                  </div>
                  <svg viewBox="0 0 400 45" className="w-full h-auto">
                    <path d="M0,22 C25,5 50,5 75,22 C100,39 125,39 150,22 C175,5 200,5 225,22 C250,39 275,39 300,22 C325,5 350,5 375,22 L400,22"
                      stroke="#F0A868" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="p-4 bg-[#080B11] border border-[var(--line)] rounded-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="mono text-[11px] text-[var(--noise)]">Local Wind Eddies (Incoherent point-to-point)</span>
                    <span className="mono text-[10px] text-[var(--noise)]">Random Spatial Phase</span>
                  </div>
                  <svg viewBox="0 0 400 45" className="w-full h-auto">
                    <path d="M0,22 L15,10 L30,32 L45,14 L60,28 L75,8 L90,34 L105,18 L120,26 L135,12 L150,30 L165,16 L180,34 L195,14 L210,28 L225,8 L240,36 L255,16 L270,28 L285,10 L300,32 L315,14 L330,30 L345,12 L360,34 L375,18 L390,26 L400,22"
                      stroke="#5B7A99" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.8" />
                  </svg>
                </div>

                <div className="p-4 bg-[#080B11] border border-emerald-500/30 rounded-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="mono text-[11px] text-emerald-400">Summed Rosette Manifold Output</span>
                    <span className="mono text-[10px] text-emerald-400">Noise Attenuated by 6 dB</span>
                  </div>
                  <svg viewBox="0 0 400 45" className="w-full h-auto">
                    <path d="M0,22 C25,8 50,8 75,22 C100,36 125,36 150,22 C175,8 200,8 225,22 C250,36 275,36 300,22 C325,8 350,8 375,22 L400,22"
                      stroke="#4EBAAA" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'drift' && (
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="mono text-[11px] text-[var(--noise)] mb-2 flex items-center gap-2">
                  <Gauge className="w-4 h-4" />
                  PNEUMATIC EQUALIZATION &amp; RC TIME CONSTANT
                </div>
                <h3 className="text-[22px] font-semibold text-[var(--text)]">
                  Taming Diurnal Weather Shifts with τ = 15.9 s
                </h3>
                <p className="mt-3 text-[14px] text-[var(--text-dim)] leading-relaxed">
                  A sensitive microbarometer requires an absolute physical reference. Open differential ports would expose the sensor to 100,000 Pa ambient pressure and multi-kilopascal storm fronts. By communicating Port B with ambient only through a 247 mm × 0.30 mm PEEK capillary into a rigid 100 mL borosilicate bottle, the system acts as a pneumatic high-pass filter.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 mono text-[12px]">
                  <div className="p-3 bg-[#0A0E16] border border-[var(--line)] rounded-sm">
                    <div className="text-[var(--text-faint)] text-[10px]">Acoustic Resistance (Ra)</div>
                    <div className="text-[var(--text)] font-semibold mt-1">2.25 × 10¹⁰ Pa·s/m³</div>
                    <div className="text-[10px] text-[var(--text-faint)] mt-1">Poiseuille viscous flow</div>
                  </div>
                  <div className="p-3 bg-[#0A0E16] border border-[var(--line)] rounded-sm">
                    <div className="text-[var(--text-faint)] text-[10px]">Acoustic Compliance (Ca)</div>
                    <div className="text-[var(--text)] font-semibold mt-1">7.05 × 10⁻¹⁰ m³/Pa</div>
                    <div className="text-[10px] text-[var(--text-faint)] mt-1">100 mL borosilicate glass</div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#080B11] border border-[var(--line)] rounded-sm">
                <div className="mono text-[11px] text-[var(--text-faint)] mb-3">
                  Pneumatic vs Electrical High-Pass Analogy:
                </div>
                <div className="space-y-2 mono text-[12px]">
                  <div className="flex justify-between p-2 bg-[#10151F] border border-[var(--line)] rounded-sm">
                    <span className="text-[var(--text-dim)]">Electrical Domain:</span>
                    <span className="text-[var(--signal)]">τ = R × C, \quad f_c = 1 / (2πRC)</span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#10151F] border border-[var(--line)] rounded-sm">
                    <span className="text-[var(--text-dim)]">Pneumatic Domain:</span>
                    <span className="text-[var(--noise)]">τ = Ra × Ca = 15.9 s, \quad f_c = 0.010 Hz</span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#10151F] border border-[var(--line)] rounded-sm">
                    <span className="text-[var(--text-dim)]">Settling Period (5τ):</span>
                    <span className="text-amber-400">≈ 80 s ("The 80-Second Paradox")</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-sm text-[12px] text-amber-300 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Any static pressure applied outdoors bleeds away in ~80 seconds. While essential for outdoors, this prevents standard manometer static calibration (solved in Section 10).
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'asic' && (
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="mono text-[11px] text-emerald-400 mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  SENSOR ELEMENT TRADEOFF &amp; PHYSICS
                </div>
                <h3 className="text-[22px] font-semibold text-[var(--text)]">
                  Why We Bypassed the Integrated ASIC Sensor
                </h3>
                <p className="mt-3 text-[14px] text-[var(--text-dim)] leading-relaxed">
                  The preliminary hackathon design considered the ELVH-L01D digital sensor. However, analyzing DS-0274 revealed that the ELVH reconstructs its analog output from an internal 11-bit ADC. This created an insurmountable 0.24 Pa step-size floor.
                </p>
                <p className="mt-2 text-[14px] text-[var(--text-dim)] leading-relaxed">
                  Switching to the unconditioned <strong>All Sensors MLV-L01D-E1BD-N</strong> exposes the raw Wheatstone bridge die. We designed an external chopper-stabilized analog front end with an ADS1256 24-bit delta-sigma converter, lowering the noise floor to <strong className="text-[var(--signal)]">8.07 mPa RMS</strong>—a 30× resolution improvement!
                </p>
              </div>

              <div className="space-y-3 mono text-[12px]">
                <div className="p-4 bg-rose-950/20 border border-rose-900/40 rounded-sm">
                  <div className="flex items-center justify-between text-rose-300 font-semibold mb-1">
                    <span>ELVH-L01D (Digital ASIC)</span>
                    <span>RESOLUTION FLOOR: ~0.24 Pa</span>
                  </div>
                  <p className="text-[11.5px] text-rose-200/70 font-sans leading-normal">
                    Quantization noise occurs on-chip before external access. 11-bit digitization across ±249 Pa leaves micro-pascal infrasound signals buried irreversibly under digital step quantization.
                  </p>
                </div>

                <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-sm">
                  <div className="flex items-center justify-between text-emerald-300 font-semibold mb-1">
                    <span>MLV-L01D (Raw Wheatstone Bridge)</span>
                    <span>COMPUTED NOISE FLOOR: 0.00807 Pa (8.07 mPa)</span>
                  </div>
                  <p className="text-[11.5px] text-emerald-200/70 font-sans leading-normal">
                    Continuous true analog signal. Custom INA333 + OPA2333 chain with 1499× gain feeds a 24-bit delta-sigma converter, achieving sub-10 mPa resolution with zero ASIC quantization bottlenecks.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
