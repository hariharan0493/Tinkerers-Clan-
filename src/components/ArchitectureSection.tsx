import { useState } from 'react';
import { SIGNAL_CHAIN_STAGES, THREE_FILTERS_DATA } from '../data/reportData';
import { SignalChainStage } from '../types';
import { Layers, ChevronRight, Cpu, Zap, Activity, Filter, CheckCircle2, ShieldAlert, Sparkles, Sliders } from 'lucide-react';

export function ArchitectureSection() {
  const [selectedStageId, setSelectedStageId] = useState<string>('stage-3');
  const [testPressureInput, setTestPressureInput] = useState<number>(25); // Pa dynamic pressure

  const selectedStage: SignalChainStage = SIGNAL_CHAIN_STAGES.find(s => s.id === selectedStageId) || SIGNAL_CHAIN_STAGES[2];

  // Headroom & signal calculation across the chain
  // Bridge sensitivity: 28.1 µV/Pa
  const vBridge_uV = testPressureInput * 28.1; // µV
  const vBridge_mV = vBridge_uV / 1000;
  const vINA_mV = vBridge_mV * 100; // Stage 2: Gain 100
  const vCoupled_mV = vINA_mV; // Stage 3: Gain 1 (DC stripped)
  const vOPA_V = (vCoupled_mV * 9.45) / 1000; // Stage 4: Gain 9.45
  const vFilter_V = vOPA_V * 1.586; // Stage 5: Gain 1.586
  const vFinalADC_Pedestal = 2.5 + vFilter_V;

  return (
    <section id="architecture" className="py-20 sm:py-28 border-t border-[var(--line)] bg-[#0A0E16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="mono text-[11px] uppercase tracking-wider text-[var(--text-faint)] mb-2 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[var(--signal)]" />
              System Architecture &amp; Signal Chain
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-semibold tracking-tight text-[var(--text)]">
              Tri-filtered signal chain &amp; gain staging
            </h2>
          </div>
          <p className="text-[14.5px] text-[var(--text-dim)] max-w-xl leading-relaxed">
            Wind noise, weather drift, and infrasound share identical physical mediums. Three independent filtering mechanisms operate in serial succession across mechanical, pneumatic, and electrical domains.
          </p>
        </div>

        {/* The Three Filters Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <span className="mono text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
              Three Filters, Three Distinct Physical Mechanisms
            </span>
            <span className="mono text-[11px] text-[var(--signal)]">Non-overlapping isolation</span>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {THREE_FILTERS_DATA.map(f => (
              <div key={f.num} className="card p-6 rounded-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <span className="mono text-[12px] font-semibold text-[var(--text-faint)]">{f.num}</span>
                    <span
                      className="mono text-[10px] px-2 py-0.5 rounded-sm font-medium tracking-wide"
                      style={{
                        color: f.tagColor,
                        backgroundColor: f.tagColor === 'var(--signal)' ? 'var(--signal-soft)' : 'var(--noise-soft)'
                      }}
                    >
                      {f.mechanism}
                    </span>
                  </div>

                  <h3 className="text-[17px] font-semibold text-[var(--text)] mb-1">{f.title}</h3>
                  <div className="mono text-[11.5px] text-[var(--text-dim)] mb-3">{f.cutoff}</div>
                  
                  <p className="text-[13px] text-[var(--text-dim)] leading-relaxed mb-4">{f.summary}</p>
                  
                  <p className="text-[12px] text-[var(--text-faint)] leading-relaxed border-t border-[var(--line)] pt-3 mb-4">
                    {f.physicsRationale}
                  </p>
                </div>

                <div className="bg-[#0D121C] border border-[var(--line)] rounded-sm p-3 space-y-1.5 mono text-[10.5px]">
                  {f.physicalSpecs.map((spec, i) => (
                    <div key={i} className="flex justify-between text-[var(--text-dim)]">
                      <span className="text-[var(--text-faint)]">{spec.label}:</span>
                      <span className="text-[var(--text)] text-right font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Signal Chain Pipeline */}
        <div className="bracket-frame panel p-6 sm:p-8 rounded-sm mb-12">
          <span className="bf-tr"></span>
          <span className="bf-br"></span>

          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--line)]">
            <div>
              <span className="mono text-[12px] font-semibold text-[var(--signal)]">END-TO-END SIGNAL PIPELINE</span>
              <p className="text-[12.5px] text-[var(--text-dim)] mt-0.5">
                Click any stage to inspect circuit topology, gain calculations, and headroom safety margins.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-3 mono text-[11px] text-[var(--text-faint)]">
              <span>Composite Gain: <strong className="text-[var(--signal)]">1499× (63.5 dB)</strong></span>
              <span>•</span>
              <span>Sensitivity: <strong className="text-[var(--signal)]">42.2 mV/Pa</strong></span>
            </div>
          </div>

          {/* Interactive Stage Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-8">
            {SIGNAL_CHAIN_STAGES.map((s) => {
              const isSelected = s.id === selectedStageId;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedStageId(s.id)}
                  className={`p-3 rounded-sm text-left transition-all relative flex flex-col justify-between min-h-[110px] border ${
                    isSelected
                      ? 'border-[var(--signal)] bg-[#151B27] shadow-md'
                      : 'border-[var(--line)] bg-[#0C1019] hover:border-[var(--text-faint)]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="mono text-[10px] text-[var(--text-faint)]">Stage {s.step}</span>
                      <span className={`mono text-[10px] font-semibold ${isSelected ? 'text-[var(--signal)]' : 'text-[var(--text-dim)]'}`}>
                        {s.gainDb}
                      </span>
                    </div>
                    <div className="text-[12px] font-semibold text-[var(--text)] line-clamp-1">{s.name}</div>
                    <div className="mono text-[10px] text-[var(--text-dim)] mt-0.5 line-clamp-1">{s.component}</div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[var(--line)] flex items-center justify-between text-[9.5px] mono text-[var(--text-faint)]">
                    <span>{s.gain}</span>
                    <span className="text-[var(--signal)]">{s.fc}</span>
                  </div>

                  {isSelected && (
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--signal)] rotate-45"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Stage Deep Inspector */}
          <div className="panel-alt p-5 sm:p-6 rounded-sm border border-[var(--line)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[var(--line)]">
              <div>
                <span className="mono text-[10.5px] text-[var(--signal)] uppercase">
                  Stage {selectedStage.step} Inspector · {selectedStage.role}
                </span>
                <h3 className="text-[19px] font-semibold text-[var(--text)] mt-0.5">
                  {selectedStage.name} — <span className="mono text-[var(--signal)]">{selectedStage.component}</span>
                </h3>
              </div>
              <div className="flex items-center gap-4 mono text-[12px]">
                <div className="px-3 py-1 bg-[#0A0E16] border border-[var(--line)] rounded-sm">
                  <span className="text-[var(--text-faint)]">Stage Gain: </span>
                  <span className="text-[var(--signal)] font-medium">{selectedStage.gain} ({selectedStage.gainDb})</span>
                </div>
                <div className="px-3 py-1 bg-[#0A0E16] border border-[var(--line)] rounded-sm">
                  <span className="text-[var(--text-faint)]">Corner: </span>
                  <span className="text-[var(--text)] font-medium">{selectedStage.fc}</span>
                </div>
              </div>
            </div>

            <p className="text-[14px] text-[var(--text-dim)] leading-relaxed mb-5">
              {selectedStage.technicalDetails}
            </p>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-[#0A0E16] p-4 rounded-sm border border-[var(--line)]">
                <span className="mono text-[11px] text-[var(--text-faint)] uppercase block mb-2.5">
                  Circuit Implementation &amp; Passive Tolerances
                </span>
                <ul className="space-y-2 text-[12px] mono text-[var(--text-dim)]">
                  {selectedStage.schematicDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--signal)] mt-0.5">▸</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0A0E16] p-4 rounded-sm border border-[var(--line)] flex flex-col justify-between">
                <div>
                  <span className="mono text-[11px] text-[var(--text-faint)] uppercase block mb-2.5">
                    Engineering Rationale &amp; Dynamic Headroom
                  </span>
                  <p className="text-[12.5px] text-[var(--text-dim)] leading-relaxed">
                    {selectedStage.headroomNotes || 'Provides fundamental impedance buffering and stages voltage swing symmetrically around the 2.5 V mid-rail.'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between text-[11.5px] mono text-[var(--text-faint)]">
                  <span>Supply Rail: 5.0 V Single</span>
                  <span className="text-emerald-400">Headroom Verified</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Headroom & Signal Propagation Calculator */}
        <div className="grid lg:grid-cols-[1fr,1fr] gap-8 items-start mb-12">
          
          <div className="card p-6 rounded-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="mono text-[11px] text-[var(--signal)] uppercase flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                Live Gain &amp; Headroom Simulator
              </span>
              <span className="mono text-[11px] text-[var(--text-faint)]">Working Point ±50 Pa Max</span>
            </div>

            <p className="text-[13px] text-[var(--text-dim)] leading-relaxed mb-5">
              Simulate dynamic pressure input and verify how the split-gain architecture prevents saturation while stripping bridge DC offset.
            </p>

            <div className="bg-[#0D121C] p-4 rounded-sm border border-[var(--line)] mb-5">
              <div className="flex justify-between items-center mb-2">
                <span className="mono text-[12px] text-[var(--text)] font-medium">Input Differential Pressure:</span>
                <span className="mono text-[14px] text-[var(--signal)] font-semibold">±{testPressureInput.toFixed(1)} Pa</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="57"
                step="0.5"
                value={testPressureInput}
                onChange={(e) => setTestPressureInput(parseFloat(e.target.value))}
                className="w-full accent-[var(--signal)] cursor-pointer h-1.5 bg-[#232E40] rounded-lg"
              />
              <div className="flex justify-between text-[10px] mono text-[var(--text-faint)] mt-1.5">
                <span>0.1 Pa (Min detectable)</span>
                <span>±50 Pa (Design point)</span>
                <span>±57 Pa (Chain Rail Limit)</span>
              </div>
            </div>

            <div className="space-y-2 mono text-[11.5px]">
              <div className="flex justify-between p-2.5 bg-[#0A0E16] border border-[var(--line)] rounded-sm">
                <span className="text-[var(--text-dim)]">Bridge Output (28.1 µV/Pa):</span>
                <span className="text-[var(--text)] font-semibold">±{vBridge_uV.toFixed(1)} µV (±{vBridge_mV.toFixed(3)} mV)</span>
              </div>
              <div className="flex justify-between p-2.5 bg-[#0A0E16] border border-[var(--line)] rounded-sm">
                <span className="text-[var(--text-dim)]">Stage 2 (INA333 Gain 100×):</span>
                <span className="text-[var(--text)] font-semibold">±{vINA_mV.toFixed(2)} mV</span>
              </div>
              <div className="flex justify-between p-2.5 bg-[#0A0E16] border border-[var(--line)] rounded-sm">
                <span className="text-[var(--text-dim)]">Stage 4 (OPA2333 Gain 9.45×):</span>
                <span className="text-[var(--text)] font-semibold">±{(vOPA_V * 1000).toFixed(1)} mV (±{vOPA_V.toFixed(3)} V)</span>
              </div>
              <div className="flex justify-between p-2.5 bg-[#0A0E16] border border-[var(--line)] rounded-sm">
                <span className="text-[var(--text-dim)]">Stage 5 (Sallen-Key Gain 1.586×):</span>
                <span className="text-[var(--signal)] font-semibold">±{vFilter_V.toFixed(3)} V</span>
              </div>
              <div className="flex justify-between p-2.5 bg-[var(--signal-soft)] border border-[var(--signal-border)] rounded-sm">
                <span className="text-[var(--signal)] font-medium">ADC Input (Centered on 2.5V Pedestal):</span>
                <span className="text-[var(--signal)] font-bold">{vFinalADC_Pedestal.toFixed(3)} V</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between text-[11px] mono">
              <span className="text-[var(--text-faint)]">Rail Headroom (0 to 5.0 V):</span>
              <span className="text-emerald-400 font-semibold">{(2.5 - Math.abs(vFilter_V)).toFixed(2)} V safety margin</span>
            </div>
          </div>

          {/* LTspice Simulation Verification Matrix */}
          <div className="card p-6 rounded-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="mono text-[11px] text-emerald-400 uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                LTspice XVII Simulation Verification
              </span>
              <span className="mono text-[11px] text-[var(--text-faint)]">Closed-Loop AC &amp; DC Checks</span>
            </div>

            <p className="text-[13px] text-[var(--text-dim)] leading-relaxed mb-4">
              The analog filter chain was modeled end-to-end in LTspice. A key engineering check was the DC operating point: ensuring mid-rail referencing prevents 2.5 V pedestal saturation.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left mono text-[11.5px]">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[var(--text-faint)]">
                    <th className="pb-2 font-normal">Parameter</th>
                    <th className="pb-2 font-normal">LTspice Result</th>
                    <th className="pb-2 font-normal">Design Target</th>
                    <th className="pb-2 font-normal text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)] text-[var(--text-dim)]">
                  <tr>
                    <td className="py-2 text-[var(--text)]">Passband Plateau (Stages 4–5)</td>
                    <td className="py-2 text-[var(--signal)]">23.5 dB</td>
                    <td className="py-2">23.52 dB</td>
                    <td className="py-2 text-right text-emerald-400">Match</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-[var(--text)]">Low Frequency Corner (fc1)</td>
                    <td className="py-2 text-[var(--signal)]">4.82 mHz</td>
                    <td className="py-2">4.80 mHz</td>
                    <td className="py-2 text-right text-emerald-400">Match</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-[var(--text)]">High Frequency Corner (fc2)</td>
                    <td className="py-2 text-[var(--signal)]">25.0 Hz</td>
                    <td className="py-2">25.0 Hz</td>
                    <td className="py-2 text-right text-emerald-400">Match</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-[var(--text)]">High-End Roll-off Slope</td>
                    <td className="py-2 text-[var(--signal)]">-40 dB/decade</td>
                    <td className="py-2">-40 dB/dec (2nd-order)</td>
                    <td className="py-2 text-right text-emerald-400">Match</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-[var(--text)]">Attenuation at 500 Hz (Nyquist)</td>
                    <td className="py-2 text-[var(--signal)]">52.1 dB</td>
                    <td className="py-2">&gt;50 dB</td>
                    <td className="py-2 text-right text-emerald-400">Match</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-[var(--text)]">DC Operating Point (U1 Stage 4)</td>
                    <td className="py-2 text-emerald-400 font-semibold">2.4999 V</td>
                    <td className="py-2">2.500 V (Mid-Rail)</td>
                    <td className="py-2 text-right text-emerald-400">Pass</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-[var(--text)]">DC Operating Point (U2 Stage 5)</td>
                    <td className="py-2 text-emerald-400 font-semibold">2.4969 V</td>
                    <td className="py-2">2.500 V (Mid-Rail)</td>
                    <td className="py-2 text-right text-emerald-400">Pass</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-[#080B11] border border-[var(--line)] rounded-sm text-[11.5px] text-[var(--text-faint)] leading-relaxed">
              <strong className="text-[var(--text)]">Operating Point Revelation:</strong> Grounding the Sallen-Key Rg resistor would have amplified the 2.5 V pedestal by 1.586×, forcing the output to 3.98 V and severely clipping dynamic signals on a 5 V rail. Referencing Rg to buffered 2.5 V preserves full ±2.11 V swing.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
