import { useState } from 'react';
import { HARDWARE_BLOCKS_SPECS } from '../data/reportData';
import { HardwareBlockSpec } from '../types';
import { Cpu, Box, Sliders, Thermometer, ShieldCheck, Wind, Layers, Compass, CheckCircle2, ChevronRight } from 'lucide-react';

export function ImplementationDetails() {
  const [activeBlockId, setActiveBlockId] = useState<string>('block-a');

  const activeBlock: HardwareBlockSpec = HARDWARE_BLOCKS_SPECS.find(b => b.blockId === activeBlockId) || HARDWARE_BLOCKS_SPECS[0];

  const blockNav = [
    { id: 'block-a', label: 'Block (a)', title: 'Sensing Element (MLV-L01D)', icon: Cpu },
    { id: 'block-b', label: 'Block (b)', title: 'PETG Manifold & Sealing', icon: Box },
    { id: 'block-c-f', label: 'Blocks (c & f)', title: 'Pneumatic Reference & RC', icon: Sliders },
    { id: 'block-d', label: 'Block (d)', title: 'Analog Front End & Power', icon: Layers },
    { id: 'block-e', label: 'Block (e)', title: 'Thermal Drift & TMP117', icon: Thermometer },
    { id: 'block-g', label: 'Block (g)', title: 'Dual-Chamber Enclosure', icon: ShieldCheck },
    { id: 'block-h', label: 'Block (h)', title: 'Spatial Wind Rosette', icon: Wind },
  ];

  return (
    <section id="implementation" className="py-20 sm:py-28 border-t border-[var(--line)] bg-[#0C1019]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="mono text-[11px] uppercase tracking-wider text-[var(--text-faint)] mb-2 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[var(--signal)]" />
              Comprehensive Implementation Details
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-semibold tracking-tight text-[var(--text)]">
              Hardware specifications &amp; mechanical design
            </h2>
          </div>
          <p className="text-[14.5px] text-[var(--text-dim)] max-w-xl leading-relaxed">
            Every physical tolerance, material choice, and circuit parameter extracted verbatim from the final engineering report and component datasheets.
          </p>
        </div>

        {/* Subsystem Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-3 mb-8 scrollbar-thin">
          {blockNav.map(item => {
            const Icon = item.icon;
            const isActive = item.id === activeBlockId;
            return (
              <button
                key={item.id}
                onClick={() => setActiveBlockId(item.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-sm border whitespace-nowrap transition-all mono text-[12px] ${
                  isActive
                    ? 'border-[var(--signal)] bg-[#151B27] text-[var(--signal)] shadow-sm'
                    : 'border-[var(--line)] bg-[#10151F] text-[var(--text-dim)] hover:border-[var(--text-faint)] hover:text-[var(--text)]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--signal)]' : 'text-[var(--text-faint)]'}`} />
                <span className="font-semibold">{item.label}:</span>
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Block Content Container */}
        <div className="bracket-frame panel p-6 sm:p-8 rounded-sm">
          <span className="bf-tr"></span>
          <span className="bf-br"></span>

          <div className="pb-5 mb-6 border-b border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="mono text-[11px] text-[var(--signal)] uppercase">
                Subsystem Specification Sheet
              </span>
              <h3 className="text-[22px] font-semibold text-[var(--text)] mt-1">
                {activeBlock.blockTitle}
              </h3>
            </div>
            <span className="mono text-[11px] px-2.5 py-1 rounded-sm bg-[#0A0E16] border border-[var(--line)] text-[var(--text-dim)]">
              Status: Production-Ready Specs
            </span>
          </div>

          <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-8">
            
            {/* Parameters Table */}
            <div>
              <span className="mono text-[11px] uppercase tracking-wider text-[var(--text-faint)] block mb-3">
                Key Engineering Parameters &amp; Tolerances
              </span>

              <div className="bg-[#080B11] border border-[var(--line)] rounded-sm overflow-hidden">
                <table className="w-full text-left mono text-[12px]">
                  <tbody className="divide-y divide-[var(--line)]">
                    {activeBlock.parameters.map((p, idx) => (
                      <tr key={idx} className="hover:bg-[#10151F]/60 transition-colors">
                        <td className="py-2.5 px-4 text-[var(--text-dim)] w-2/5 align-top">
                          {p.param}
                        </td>
                        <td className="py-2.5 px-4 text-[var(--text)] font-medium align-top">
                          {p.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Special Callout: Sealing Hierarchy for Block (b) */}
              {activeBlock.blockId === 'block-b' && (
                <div className="mt-6 p-4 bg-[#0A0E16] border border-[var(--line)] rounded-sm">
                  <span className="mono text-[11px] text-[var(--signal)] uppercase block mb-3">
                    Manifold Sealing Hierarchy &amp; Failure Modes
                  </span>
                  <div className="space-y-2 text-[11.5px] mono text-[var(--text-dim)]">
                    <div className="flex justify-between border-b border-[var(--line-soft)] pb-1.5">
                      <span className="text-[var(--text)]">Sensor ↔ Manifold:</span>
                      <span>O-ring mechanically compressed (Rigid-to-rigid seal)</span>
                    </div>
                    <div className="flex justify-between border-b border-[var(--line-soft)] pb-1.5">
                      <span className="text-[var(--text)]">Capillary ↔ Bottle:</span>
                      <span>10-32 Coned PEEK compression ferrule (Removable)</span>
                    </div>
                    <div className="flex justify-between border-b border-[var(--line-soft)] pb-1.5">
                      <span className="text-[var(--text)]">Bottle ↔ Cap:</span>
                      <span>GL45 with PTFE-lined silicone seal disc</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text)]">Port B ↔ Tubing:</span>
                      <span className="text-amber-400">Critical: Leak drops Ra and raises fc invisibly!</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Special Callout: Power Rails for Block (d) */}
              {activeBlock.blockId === 'block-d' && (
                <div className="mt-6 p-4 bg-[#0A0E16] border border-[var(--line)] rounded-sm">
                  <span className="mono text-[11px] text-[var(--signal)] uppercase block mb-3">
                    Triple Linear LDO Power Isolation Architecture
                  </span>
                  <div className="grid grid-cols-3 gap-2 mono text-[11px] text-center">
                    <div className="p-2 bg-[#121824] border border-[var(--line)] rounded-sm">
                      <div className="text-[var(--text-faint)] text-[9.5px]">Sensor Rail (5.0V)</div>
                      <div className="text-[var(--signal)] font-semibold mt-1">TPS7A4700</div>
                      <div className="text-[9px] text-[var(--text-dim)] mt-0.5">4.17 µV RMS noise</div>
                    </div>
                    <div className="p-2 bg-[#121824] border border-[var(--line)] rounded-sm">
                      <div className="text-[var(--text-faint)] text-[9.5px]">Analog Rail (5.0V)</div>
                      <div className="text-[var(--signal)] font-semibold mt-1">ADM7150 / TPS</div>
                      <div className="text-[9px] text-[var(--text-dim)] mt-0.5">Quiet Op-Amp supply</div>
                    </div>
                    <div className="p-2 bg-[#121824] border border-[var(--line)] rounded-sm">
                      <div className="text-[var(--text-faint)] text-[9.5px]">Digital Rail (5.0V)</div>
                      <div className="text-[var(--noise)] font-semibold mt-1">AMS1117-5.0</div>
                      <div className="text-[9px] text-[var(--text-dim)] mt-0.5">Isolates SPI pulse spikes</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Architectural Decisions & Physics Rationale */}
            <div>
              <span className="mono text-[11px] uppercase tracking-wider text-[var(--text-faint)] block mb-3">
                Architectural Rationale &amp; Physics Justification
              </span>

              <div className="space-y-4">
                {activeBlock.architecturalDecisions.map((ad, idx) => (
                  <div key={idx} className="p-4 bg-[#0A0E16] border border-[var(--line)] rounded-sm">
                    <div className="flex items-start gap-2.5 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-[var(--signal)] flex-shrink-0 mt-0.5" />
                      <h4 className="text-[14px] font-semibold text-[var(--text)] leading-snug">
                        {ad.decision}
                      </h4>
                    </div>
                    <p className="text-[12.5px] text-[var(--text-dim)] leading-relaxed pl-6">
                      {ad.reasoning}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
