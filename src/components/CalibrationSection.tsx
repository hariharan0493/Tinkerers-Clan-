import { useState } from 'react';
import { CALIBRATION_STEPS_DATA, NOISE_BUDGET_CONTRIBUTORS } from '../data/reportData';
import { CalibrationStep } from '../types';
import { BarChart3, Clock } from 'lucide-react';

export function CalibrationSection() {
  const [selectedProcId, setSelectedProcId] = useState<string>('cal-proc-1');
  const [decayStepTime, setDecayStepTime] = useState<number>(0);

  const selectedProc: CalibrationStep = CALIBRATION_STEPS_DATA.find(p => p.id === selectedProcId) || CALIBRATION_STEPS_DATA[0];

  // Exponential bleed calculation for the 100-second paradox
  // V(t) = V0 * exp(-t / 20.2s)
  const initialPressure = 50; // Pa
  const currentPressure = initialPressure * Math.exp(-decayStepTime / 20.2);
  const percentRetained = (currentPressure / initialPressure) * 100;

  return (
    <section id="calibration" className="py-24 border-t border-white/[0.08] relative overflow-hidden">
      {/* Section-specific atmospheric aura: Violet & deep indigo decay simulation */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_90%_70%_at_75%_50%,rgba(124,58,237,0.18),rgba(79,70,229,0.15)_50%,transparent_80%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading: Validation & Calibration */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <div className="mono text-[12px] uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2 font-semibold">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              Validation, Simulation &amp; Calibration
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-bold tracking-tight text-white">
              Simulation validation &amp; the 100-second paradox
            </h2>
          </div>
          <p className="text-[15.5px] text-slate-200 max-w-xl leading-relaxed font-normal">
            Theoretical noise budget, LTspice frequency verification, and the mathematical methodology resolving the 100-second settling constraint.
          </p>
        </div>

        {/* Grid 1: Computed Noise Budget & Frequency Response Simulation */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          
          {/* Noise Budget Breakdown */}
          <div className="p-7 sm:p-8 rounded-2xl bg-slate-900/75 backdrop-blur-xl border border-white/[0.12] shadow-2xl shadow-indigo-950/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.10]">
                <div>
                  <span className="mono text-[11.5px] text-slate-300 uppercase font-bold tracking-wider">
                    COMPUTED NOISE BUDGET (0.01 – 20 HZ)
                  </span>
                  <h3 className="text-[19px] font-bold text-white mt-0.5">
                    Total: 2.34 mPa RMS (0.52 mPa/√Hz)
                  </h3>
                </div>
                <span className="mono text-[12px] text-emerald-300 font-bold px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                  &gt;21× Margin vs 0.05 Pa
                </span>
              </div>

              {/* Stacked Percentage Bar */}
              <div className="w-full h-3.5 bg-slate-950/80 rounded-full overflow-hidden flex mb-5 border border-white/[0.10]">
                <div style={{ width: '72.1%' }} className="bg-amber-400" title="INA188 Voltage Noise: 72.1%"></div>
                <div style={{ width: '22.4%' }} className="bg-blue-400" title="MLV Bridge Thermal Noise: 22.4%"></div>
                <div style={{ width: '3.7%' }} className="bg-emerald-400" title="RG Thermal Noise: 3.7%"></div>
                <div style={{ width: '1.8%' }} className="bg-indigo-300" title="Other Circuit Elements: 1.8%"></div>
              </div>

              <div className="space-y-2.5 mono text-[12.5px] mb-5">
                {NOISE_BUDGET_CONTRIBUTORS.slice(0, 5).map((n, i) => (
                  <div key={i} className="flex justify-between items-center p-2.5 bg-slate-950/70 border border-white/[0.08] rounded-xl">
                    <span className="text-slate-200 font-medium truncate max-w-[220px]">{n.source}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold">{n.noisePaRms.toFixed(3)} mPa</span>
                      <span className="text-[11.5px] text-slate-300 font-medium w-12 text-right">{n.powerPercentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 bg-slate-950/70 border border-white/[0.10] rounded-xl mono text-[12.5px] text-slate-200 font-normal">
              <strong className="text-amber-300 font-bold">Digitizer Check: </strong>
              The ADS1256 ADC contributes just <strong className="text-white font-bold">0.028 mPa</strong> (roughly 80× below the analog noise floor). The digitizer is strictly non-limiting.
            </div>
          </div>

          {/* End-to-End Frequency Response Curve (Figure 2) */}
          <div className="p-7 sm:p-8 rounded-2xl bg-slate-900/75 backdrop-blur-xl border border-white/[0.12] shadow-2xl shadow-indigo-950/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.10]">
                <div>
                  <span className="mono text-[11.5px] text-slate-300 uppercase font-bold tracking-wider">
                    MAGNITUDE RESPONSE &amp; PASSBAND
                  </span>
                  <h3 className="text-[19px] font-bold text-white mt-0.5">
                    Passband Flatness: 0.01 to 20 Hz
                  </h3>
                </div>
                <span className="mono text-[12px] text-amber-300 font-semibold px-2.5 py-1 rounded-lg bg-amber-400/15 border border-amber-400/30">
                  -3.0 dB @ 0.01 Hz · -1.5 dB @ 20 Hz
                </span>
              </div>

              {/* Simplified Bode Plot SVG */}
              <div className="p-3 bg-slate-950/70 border border-white/[0.10] rounded-xl mb-5">
                <svg viewBox="0 0 450 140" className="w-full h-auto">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="430" y2="20" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="50" x2="430" y2="50" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="80" x2="430" y2="80" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="40" y1="110" x2="430" y2="110" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Target Band Highlight (0.01 Hz to 20 Hz) */}
                  <rect x="130" y="20" width="200" height="90" fill="rgba(99, 102, 241, 0.18)" />
                  <text x="230" y="33" fill="#F59E0B" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    Passband: 0.01 – 20 Hz
                  </text>

                  {/* Frequency Curve */}
                  <path
                    d="M 50,110 C 90,105 110,65 130,50 L 330,50 C 350,52 365,70 410,115"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                  />

                  {/* Labels */}
                  <text x="50" y="126" fill="#CBD5E1" fontSize="9.5" fontFamily="monospace" fontWeight="medium">1 mHz</text>
                  <text x="130" y="126" fill="#FFFFFF" fontSize="9.5" fontFamily="monospace" fontWeight="bold">0.01 Hz (-3dB)</text>
                  <text x="330" y="126" fill="#FFFFFF" fontSize="9.5" fontFamily="monospace" fontWeight="bold">20 Hz (-1.5dB)</text>
                  <text x="380" y="126" fill="#CBD5E1" fontSize="9.5" fontFamily="monospace" fontWeight="medium">25.1 Hz (-3dB)</text>

                  {/* Gain scale */}
                  <text x="32" y="53" fill="#FFFFFF" fontSize="9.5" fontFamily="monospace" textAnchor="end" fontWeight="bold">0 dB</text>
                  <text x="32" y="83" fill="#CBD5E1" fontSize="9.5" fontFamily="monospace" textAnchor="end">-20 dB</text>
                  <text x="32" y="113" fill="#CBD5E1" fontSize="9.5" fontFamily="monospace" textAnchor="end">-40 dB</text>
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-3 mono text-[12px]">
                <div className="p-3 bg-slate-950/60 border border-white/[0.10] rounded-xl">
                  <span className="text-slate-300 block text-[11px] font-medium">Acoustic + AC Coupling Pole:</span>
                  <span className="text-white font-bold">fc = 7.9 mHz &amp; 4.8 mHz</span>
                </div>
                <div className="p-3 bg-slate-950/60 border border-white/[0.10] rounded-xl">
                  <span className="text-slate-300 block text-[11px] font-medium">Anti-Aliasing Attenuation:</span>
                  <span className="text-white font-bold">64 dB at 1000 Hz</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-950/70 border border-white/[0.10] rounded-xl text-[12px] mono text-slate-300 font-medium">
              LTspice XVII simulated with verified DC operating points on 5 V rail (2.4999 V and 2.4969 V).
            </div>
          </div>

        </div>

        {/* Feature 2: The 100-Second Calibration Paradox */}
        <div className="p-7 sm:p-8 rounded-2xl bg-slate-900/75 backdrop-blur-xl border border-white/[0.12] shadow-2xl shadow-indigo-950/20 mb-12">
          <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mono text-[12px] text-amber-300 font-bold mb-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>THE CALIBRATION CONSTRAINT: τ = 20.2 s (5τ ≈ 100 s)</span>
              </div>
              <h3 className="text-[22px] font-bold text-white mb-3">
                Why Static Manometers Bleed to Zero in 100 Seconds
              </h3>
              <p className="text-[15px] text-slate-200 leading-relaxed mb-5 font-normal">
                Conventional pressure sensor calibration applies a static pressure (e.g. 50 Pa), waits for it to settle, and records output voltage. On this instrument, <strong className="text-white font-semibold">the capillary bleeds off applied static pressure within 100 seconds</strong>. The sensor is engineered to forget steady barometric pressure.
              </p>

              <div className="space-y-3 mono text-[12.5px]">
                <div className="p-3.5 bg-slate-950/70 border border-white/[0.10] rounded-xl flex items-start gap-3">
                  <span className="text-emerald-300 font-bold flex-shrink-0">Procedure 1 Method:</span>
                  <span className="text-slate-200 font-normal">
                    <strong className="text-white font-semibold">Pressurize Reference Cavity (Port B):</strong> Applying pressure to the sealed bottle makes the capillary the only escape path. Continuous supply holds differential steady indefinitely!
                  </span>
                </div>
                <div className="p-3.5 bg-slate-950/70 border border-white/[0.10] rounded-xl flex items-start gap-3">
                  <span className="text-amber-300 font-bold flex-shrink-0">Cross-Check &amp; Trim:</span>
                  <span className="text-slate-200 font-normal">
                    Fast step applied to Port A and fitted back to t=0 on DC-coupled monitor channel directly validates <strong className="text-amber-300 font-semibold">τ = 20.2 s</strong> and trims capillary length.
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Decay Slider */}
            <div className="p-6 bg-slate-950/70 border border-white/[0.10] rounded-xl">
              <div className="flex items-center justify-between mb-2.5 mono text-[12px]">
                <span className="text-slate-300 font-medium">Exponential Bleed Simulation:</span>
                <span className="text-amber-300 font-bold">t = {decayStepTime} s / 100 s</span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={decayStepTime}
                onChange={(e) => setDecayStepTime(parseInt(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg mb-5"
              />

              <div className="grid grid-cols-2 gap-3 mono text-[12.5px] mb-4">
                <div className="p-3 bg-slate-900/90 border border-white/[0.10] rounded-xl">
                  <span className="text-[11px] text-slate-300 font-medium block">Remaining ΔP:</span>
                  <span className="text-[18px] font-bold text-amber-300">{currentPressure.toFixed(1)} Pa</span>
                  <span className="text-[11px] text-slate-300 block mt-0.5 font-medium">({percentRetained.toFixed(0)}% of 50 Pa)</span>
                </div>
                <div className="p-3 bg-slate-900/90 border border-white/[0.10] rounded-xl">
                  <span className="text-[11px] text-slate-300 font-medium block">Acoustic Time Constant:</span>
                  <span className="text-[18px] font-bold text-emerald-300">τ = 20.2 s</span>
                  <span className="text-[11px] text-slate-300 block mt-0.5 font-medium">5τ = 101 s settling</span>
                </div>
              </div>

              <div className="p-3.5 bg-amber-500/15 border border-amber-500/30 rounded-xl text-[12px] text-amber-100 mono">
                Reference instrument requirement: Differential micromanometer with <strong className="text-white font-semibold">0.1 Pa or better resolution</strong>. Handheld 1 Pa gauges introduce 2% full-scale error swamping linearity.
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3: The 5 Formal SIH Evaluation Procedures */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="mono text-[12px] uppercase tracking-wider text-slate-200 font-bold">
                Formal SIH Deliverables &amp; Test Protocols
              </span>
              <h3 className="text-[20px] font-bold text-white mt-1">
                The 5 evaluation &amp; characterisation protocols
              </h3>
            </div>
          </div>

          {/* Procedure Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-5">
            {CALIBRATION_STEPS_DATA.map((p) => {
              const isSelected = p.id === selectedProcId;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProcId(p.id)}
                  className={`p-3.5 rounded-xl text-left border transition-all mono text-[12px] ${
                    isSelected
                      ? 'border-indigo-500/80 bg-indigo-600/30 text-white font-bold shadow-md'
                      : 'border-white/[0.12] bg-slate-900/75 text-slate-200 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="text-[11px] text-slate-300 font-medium">{p.deliverable}</div>
                  <div className="font-bold mt-1 truncate">Proc {p.num}: {p.name.split(' ')[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Procedure View */}
          <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/75 backdrop-blur-xl border border-white/[0.12] shadow-xl shadow-indigo-950/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-white/[0.10] gap-2">
              <div>
                <span className="mono text-[12px] text-amber-300 font-bold px-2.5 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/30">
                  {selectedProc.deliverable} · Procedure {selectedProc.num}
                </span>
                <h4 className="text-[18px] font-bold text-white mt-2">
                  {selectedProc.name}
                </h4>
              </div>
              <span className="mono text-[12px] text-slate-300 self-start sm:self-auto font-medium">
                Objective: {selectedProc.objective}
              </span>
            </div>

            <p className="text-[15px] text-slate-200 leading-relaxed mb-4 font-normal">
              {selectedProc.method}
            </p>

            <div className="p-4 bg-slate-950/70 border border-white/[0.10] rounded-xl mono text-[12.5px] text-amber-200">
              <span className="text-[11.5px] text-slate-300 block mb-1 font-medium">Deliverable &amp; Characterisation Output:</span>
              <span className="font-medium text-white">{selectedProc.reportingOutput}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
