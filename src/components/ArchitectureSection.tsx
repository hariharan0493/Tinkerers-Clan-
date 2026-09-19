import { useState } from 'react';
import { SIGNAL_CHAIN_STAGES } from '../data/reportData';
import { SignalChainStage } from '../types';
import { Layers, Sliders } from 'lucide-react';

export function ArchitectureSection() {
  const [selectedStageId, setSelectedStageId] = useState<string>('stage-3');
  const [testPressureInput, setTestPressureInput] = useState<number>(50); // Pa dynamic pressure

  const selectedStage: SignalChainStage = SIGNAL_CHAIN_STAGES.find(s => s.id === selectedStageId) || SIGNAL_CHAIN_STAGES[2];

  // Headroom & signal calculation across the chain
  // Bridge sensitivity: 28.10 µV/Pa
  const vBridge_uV = testPressureInput * 28.10; // µV
  const vBridge_mV = vBridge_uV / 1000;
  const vINA_mV = vBridge_mV * 101.2; // Stage 3: Gain 101.2
  const vCoupled_mV = vINA_mV; // Stage 4: Gain 1.0 (DC stripped)
  const vOPA_V = (vCoupled_mV * 2.21) / 1000; // Stage 5: Gain 2.21
  const vFilter_V = vOPA_V * 1.59; // Stage 6: Gain 1.59 (single-ended swing)
  const vDiff_V = vFilter_V * 2.0; // Stage 7: ×2 differential drive
  const positiveLeg = 2.5 + vFilter_V;
  const negativeLeg = 2.5 - vFilter_V;

  return (
    <section id="architecture" className="py-24 border-t border-white/[0.08] relative overflow-hidden">
      {/* Section-specific atmospheric aura: Signal cyan & electric blue */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_90%_70%_at_25%_40%,rgba(14,165,233,0.18),rgba(37,99,235,0.16)_55%,transparent_80%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <div className="mono text-[12px] uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2 font-semibold">
              <Layers className="w-4 h-4 text-amber-400" />
              System Architecture &amp; Signal Chain
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-bold tracking-tight text-white">
              The 8-stage low-noise analog-to-digital pipeline
            </h2>
          </div>
          <p className="text-[15.5px] text-slate-200 max-w-xl leading-relaxed font-normal">
            From atmospheric acoustic plane waves through the 4-arm rosette down to 100 SPS 24-bit digital miniSEED packets. Total differential gain: <strong className="text-amber-300 font-bold">711.2× (57.0 dB)</strong>.
          </p>
        </div>

        {/* High-Level Visual Signal Chain Flowchart */}
        <div className="p-7 sm:p-8 rounded-2xl bg-slate-900/75 backdrop-blur-xl border border-white/[0.12] shadow-2xl shadow-indigo-950/20 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-white/[0.10] gap-2">
            <span className="mono text-[12px] text-slate-200 uppercase tracking-wider font-bold">
              Interactive Signal Chain Flow — Click Any Stage to Inspect Details
            </span>
            <span className="mono text-[12px] text-amber-300 font-bold px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 self-start sm:self-auto">
              Single 5V Rail · 2.5V Mid-Rail Pedestal
            </span>
          </div>

          {/* Grid stages */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {SIGNAL_CHAIN_STAGES.map((st) => {
              const isSelected = st.id === selectedStageId;
              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedStageId(st.id)}
                  className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between group relative ${
                    isSelected
                      ? 'border-indigo-500/80 bg-indigo-600/30 shadow-lg shadow-indigo-950/40 text-white'
                      : 'border-white/[0.12] bg-slate-950/60 text-slate-200 hover:border-white/30 hover:bg-slate-950/80 hover:text-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mono text-[11px] text-slate-300 mb-1.5 font-medium">
                      <span className="font-bold text-white">ST {st.step}</span>
                      <span className={isSelected ? 'text-amber-300 font-bold' : 'text-slate-300'}>{st.gain}</span>
                    </div>
                    <div className="text-[13.5px] font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                      {st.name}
                    </div>
                    <div className="text-[11.5px] mono text-slate-300 line-clamp-1 mt-0.5">
                      {st.component.split(' ')[0]}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/[0.10] text-[11px] mono text-slate-300 flex items-center justify-between font-medium">
                    <span>{st.fc}</span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.8)]"></span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Deep-Dive & Live Signal Level Simulator */}
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-8">
          
          {/* Stage Details Card */}
          <div className="p-7 rounded-2xl bg-slate-900/75 backdrop-blur-xl border border-white/[0.12] shadow-xl shadow-indigo-950/20 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between pb-4 mb-5 border-b border-white/[0.10] gap-3">
                <div>
                  <span className="mono text-[12px] text-amber-300 font-bold px-2.5 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/30">
                    Stage {selectedStage.step} of 8 · {selectedStage.role}
                  </span>
                  <h3 className="text-[20px] font-bold text-white mt-2">
                    {selectedStage.name}: {selectedStage.component}
                  </h3>
                </div>
                <div className="mono text-[13px] font-bold px-3 py-1.5 rounded-xl bg-slate-800/90 border border-white/15 text-amber-300">
                  Gain: {selectedStage.gain} ({selectedStage.gainDb})
                </div>
              </div>

              <p className="text-[15px] text-slate-200 leading-relaxed mb-5 font-normal">
                {selectedStage.technicalDetails}
              </p>

              <div className="mb-5">
                <span className="mono text-[12px] uppercase tracking-wider text-slate-200 block mb-2.5 font-bold">
                  Implementation Specifications:
                </span>
                <ul className="space-y-2 mono text-[12.5px] text-slate-200">
                  {selectedStage.schematicDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {selectedStage.headroomNotes && (
              <div className="mt-4 p-3.5 rounded-xl bg-slate-950/70 border border-white/[0.10] mono text-[12.5px] text-slate-200">
                <strong className="text-emerald-300 font-bold">Circuit Safeguard: </strong>
                {selectedStage.headroomNotes}
              </div>
            )}
          </div>

          {/* Interactive Dynamic Pressure vs Voltage Calculator */}
          <div className="p-7 rounded-2xl bg-slate-900/75 backdrop-blur-xl border border-white/[0.12] shadow-xl shadow-indigo-950/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.10]">
                <span className="mono text-[12px] uppercase tracking-wider text-slate-200 flex items-center gap-2 font-bold">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  Dynamic Headroom Calculator
                </span>
                <span className="mono text-[13px] font-bold text-amber-300 px-2.5 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/30">
                  P_in = {testPressureInput} Pa
                </span>
              </div>

              <p className="text-[14px] text-slate-200 leading-relaxed mb-5 font-normal">
                Simulate how any input pressure from 1 Pa to full-scale ±240 Pa propagates through the analog chain on the single 5.0 V supply.
              </p>

              <div className="mb-6">
                <div className="flex justify-between text-[11.5px] mono text-slate-300 mb-2 font-medium">
                  <span>1 Pa (Acoustic Anomaly)</span>
                  <span className="text-amber-300 font-bold">±{testPressureInput} Pa</span>
                  <span>240 Pa (Full Scale)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="240"
                  value={testPressureInput}
                  onChange={(e) => setTestPressureInput(parseInt(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>

              <div className="space-y-3 mono text-[12.5px]">
                <div className="flex justify-between p-3 rounded-xl bg-slate-950/70 border border-white/[0.10]">
                  <span className="text-slate-300 font-medium">Bridge Out (28.10 µV/Pa):</span>
                  <span className="text-white font-semibold">±{vBridge_uV.toFixed(1)} µV</span>
                </div>

                <div className="flex justify-between p-3 rounded-xl bg-slate-950/70 border border-white/[0.10]">
                  <span className="text-slate-300 font-medium">INA188 Output (Gain 101.2):</span>
                  <span className="text-white font-semibold">±{vINA_mV.toFixed(2)} mV</span>
                </div>

                <div className="flex justify-between p-3 rounded-xl bg-slate-950/70 border border-white/[0.10]">
                  <span className="text-slate-300 font-medium">Stage 6 Filter Out (355.6×):</span>
                  <span className="text-white font-semibold">±{vFilter_V.toFixed(3)} V single-ended</span>
                </div>

                <div className="flex justify-between p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/35">
                  <span className="text-emerald-300 font-bold">Stage 7 Diff Out (711.2×):</span>
                  <span className="text-emerald-200 font-bold">±{vDiff_V.toFixed(3)} V diff ({(vDiff_V*2).toFixed(2)} V p-p)</span>
                </div>
              </div>
            </div>

            <div className="mt-5 p-3.5 rounded-xl bg-slate-950/70 border border-white/[0.10] text-[12px] mono text-slate-300 flex items-center justify-between font-medium">
              <span>Positive Leg: <strong className="text-white font-semibold">{positiveLeg.toFixed(2)} V</strong></span>
              <span>Mid-Rail: <strong className="text-amber-300 font-bold">2.50 V</strong></span>
              <span>Negative Leg: <strong className="text-white font-semibold">{negativeLeg.toFixed(2)} V</strong></span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
