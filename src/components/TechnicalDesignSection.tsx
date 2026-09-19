import { useState } from 'react';
import { Cpu, Zap, ShieldCheck, BatteryCharging, CheckCircle2, ChevronRight } from 'lucide-react';

export function TechnicalDesignSection() {
  const [activeCardId, setActiveCardId] = useState<string>('transducer');

  const technicalHighlights = [
    {
      id: 'transducer',
      title: 'Transducer: Raw Bridge vs Digital ASIC',
      icon: Cpu,
      badge: 'BLOCK (a)',
      summary: 'Why MLV-L01D raw die avoids the irreversible 11-bit ASIC quantization trap.',
      details: 'The ELVH-L01D digital sensor uses an internal 11-bit ASIC conversion, capping resolution at ~0.24 Pa. No downstream amplifier or DSP can recover information discarded inside the chip. By utilizing the raw-bridge MLV-L01D (28.10 µV/Pa), the noise floor is governed by our low-noise front end, reaching 2.34 mPa RMS (over 21× better than the 0.05 Pa target).'
    },
    {
      id: 'preamp',
      title: 'Preamp: Zero-Drift INA188 Upgrade',
      icon: Zap,
      badge: 'BLOCK (d)',
      summary: '12.5 nV/√Hz noise density unlocks the >100 dB dynamic range target.',
      details: 'Ordinary amplifiers suffer from severe 1/f flicker noise in the 0.01 – 20 Hz infrasound band. The zero-drift INA188 continuously auto-zeroes down to DC with 12.5 nV/√Hz noise density (compared to 50 nV/√Hz for INA333, which would have contributed 8 mPa on its own). Gain is set to 101.2 via a precision 499 Ω resistor (0.1%, 25 ppm/°C) with a buffered 2.5 V REF pin maintaining >104 dB CMRR.'
    },
    {
      id: 'enclosure',
      title: 'Enclosure: Dual-Compartment IP66 Shell',
      icon: ShieldCheck,
      badge: 'BLOCK (g)',
      summary: 'Hermetic foam acoustic bay paired with an ePTFE-vented electronics bay.',
      details: 'The acoustic chamber is hermetically sealed and lined with 20 mm closed-cell EPDM/PE foam to slow thermal slew rate (dT/dt), suppressing gas-thermometer pressure fluctuations (0.35 Pa/mK) below 2.34 mPa. Conversely, the electronics bay is vented with an ePTFE membrane breather to relieve internal barometric pressure without admitting moisture.'
    },
    {
      id: 'power',
      title: 'Power: Triple Linear LDO Rail Isolation',
      icon: BatteryCharging,
      badge: 'POWER & GROUND',
      summary: 'Sensor excitation, analog op-amps, and digital MCU strictly decoupled.',
      details: 'Running off a 2S Li-ion pack (7.4 V, 3000 mAh), the bridge gets a dedicated pin-strapped TPS7A4700 regulator. Because the raw bridge output is ratiometric to excitation, current pulses from MCU SPI operations on a shared rail would directly inject microvolt noise. Three independent linear LDOs isolate excitation, analog, and digital rails with star grounding at the battery terminal.'
    }
  ];

  const activeHighlight = technicalHighlights.find(h => h.id === activeCardId) || technicalHighlights[0];

  return (
    <section id="design" className="py-24 border-t border-white/[0.08] relative overflow-hidden">
      {/* Section-specific atmospheric aura: Deep royal indigo & cobalt */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_85%_65%_at_80%_45%,rgba(99,102,241,0.20),rgba(59,130,246,0.15)_50%,transparent_75%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <div className="mono text-[12px] uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2 font-semibold">
              <Cpu className="w-4 h-4 text-amber-400" />
              Key Technical Design Decisions
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-bold tracking-tight text-white">
              Subsystem engineering &amp; hardware architecture
            </h2>
          </div>
          <p className="text-[15.5px] text-slate-200 max-w-xl leading-relaxed font-normal">
            The four pivotal engineering choices that guarantee 2.34 mPa RMS resolution, 20.0 mV/Pa sensitivity, and physical reliability.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {technicalHighlights.map(h => {
            const Icon = h.icon;
            const isSelected = h.id === activeCardId;
            return (
              <button
                key={h.id}
                onClick={() => setActiveCardId(h.id)}
                className={`p-6 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-500/80 bg-indigo-600/30 shadow-xl shadow-indigo-950/40 text-white'
                    : 'border-white/[0.12] bg-slate-900/75 backdrop-blur-md text-slate-200 hover:border-white/30 hover:bg-slate-900/90 shadow-lg shadow-black/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-slate-800/90 border border-white/15 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-amber-400" />
                    </div>
                    <span className="mono text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800/90 text-slate-200 border border-white/[0.12] font-semibold">
                      {h.badge}
                    </span>
                  </div>

                  <h3 className="text-[16px] font-bold text-white mb-1">
                    {h.title.split(':')[0]}
                  </h3>
                  <div className="mono text-[12px] text-amber-300 mb-2.5 font-semibold">
                    {h.title.split(':')[1]}
                  </div>

                  <p className="text-[13.5px] text-slate-200 leading-relaxed font-normal">
                    {h.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.10] flex items-center justify-between mono text-[12px] text-slate-300 font-medium">
                  <span>Inspect block</span>
                  <ChevronRight className="w-4 h-4 text-amber-400" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Highlight Deep-Dive Card */}
        <div className="p-7 sm:p-8 rounded-2xl bg-slate-900/75 backdrop-blur-xl border border-white/[0.12] shadow-2xl shadow-indigo-950/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-white/[0.10] gap-3">
            <span className="mono text-[12px] text-amber-300 font-bold uppercase tracking-wider">
              DETAILED ARCHITECTURAL RATIONALE: {activeHighlight.title}
            </span>
            <span className="mono text-[12px] text-emerald-300 flex items-center gap-1.5 font-semibold px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 self-start sm:self-auto">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              SIH Specification Compliant
            </span>
          </div>

          <p className="text-[15.5px] text-slate-200 leading-relaxed mb-6 font-normal">
            {activeHighlight.details}
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mono text-[12.5px]">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-white/[0.10]">
              <span className="text-[11.5px] text-slate-300 block mb-1 font-medium">Design Rule:</span>
              <span className="text-white font-bold">Zero Unsolicited Conversion</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-white/[0.10]">
              <span className="text-[11.5px] text-slate-300 block mb-1 font-medium">Simulation Verification:</span>
              <span className="text-emerald-300 font-bold">LTspice Verified</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-white/[0.10]">
              <span className="text-[11.5px] text-slate-300 block mb-1 font-medium">Subsystem Margin:</span>
              <span className="text-amber-300 font-bold">&gt;20× Beyond Spec Limit</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
