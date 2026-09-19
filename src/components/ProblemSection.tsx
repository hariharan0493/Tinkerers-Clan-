import { useState, useMemo } from 'react';
import { Wind, Gauge, Cpu, ShieldAlert, CheckCircle2 } from 'lucide-react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { THREE_FILTERS_DATA } from '../data/reportData';

export function ProblemSection() {
  const [selectedFilterId, setSelectedFilterId] = useState<string>('01');

  const problems = [
    {
      id: '01',
      title: 'Turbulent Wind Noise',
      icon: Wind,
      badge: 'SPATIAL OVERLAP',
      badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
      challenge: 'Wind turbulence creates local pressure fluctuations directly inside the 0.01 – 20 Hz infrasound band. Because frequency spectra overlap completely, no electronic filter can tell them apart.',
      solution: '4-Arm Spatial Rosette: Incoherent wind eddies average out by up to 6 dB, while coherent distant infrasound wavefronts sum in-phase.'
    },
    {
      id: '02',
      title: 'Kilopascal Weather Drift',
      icon: Gauge,
      badge: 'DYNAMIC RANGE (10⁶:1)',
      badgeColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      challenge: 'Natural weather fronts shift barometric pressure by thousands of pascals over hours. A direct DC-coupled sensor with ±249 Pa range would be pushed far past saturation.',
      solution: 'Pneumatic Capillary Filter: A sealed 100 mL bottle venting via a 0.30 mm PEEK capillary (τ = 20.2 s, fc = 7.9 mHz) bleeds off slow weather drift so only infrasound reaches the bridge.'
    },
    {
      id: '03',
      title: 'Quantization vs Drift Traps',
      icon: Cpu,
      badge: 'TRANSDUCER PHYSICS',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      challenge: 'Commercial digital barometers (e.g. ELVH-L01D) have 11-bit internal ASIC quantization floors (0.24 Pa). Meanwhile, raw bridges have up to ±0.95 mV of offset and drift that would saturate high-gain amplifiers.',
      solution: 'Raw Bridge + Split-Gain Architecture: Uses unconditioned MLV-L01D die, strips offset at Stage 3 with a 4.8 mHz AC coupling stage, and reaches a 2.34 mPa RMS noise floor.'
    }
  ];

  const selectedFilter = THREE_FILTERS_DATA.find(f => f.num === selectedFilterId) || THREE_FILTERS_DATA[0];

  const renderedFormulaHtml = useMemo(() => {
    try {
      return katex.renderToString(selectedFilter.formula, {
        displayMode: true,
        throwOnError: false,
      });
    } catch {
      return selectedFilter.formula;
    }
  }, [selectedFilter.formula]);

  return (
    <section id="problem" className="py-24 border-t border-white/[0.08] relative overflow-hidden">
      {/* Section-specific atmospheric aura: Oceanic deep cyan & indigo wash */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_65%_at_15%_45%,rgba(6,182,212,0.18),transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Problem to Proposed Solution */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <div className="mono text-[12px] uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2 font-semibold">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Problem &amp; Proposed Solution
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-bold tracking-tight text-white">
              The 3 core physical dilemmas &amp; the 3-part solution
            </h2>
          </div>
          <p className="text-[15.5px] text-slate-200 max-w-xl leading-relaxed font-normal">
            Infrasound detection cannot be solved by electronics alone. Wind turbulence and weather drift overwhelm micro-pascal signals by orders of magnitude unless filtered through coordinated mechanical, pneumatic, and electrical stages.
          </p>
        </div>

        {/* 3 Problems Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {problems.map(prob => {
            return (
              <div
                key={prob.id}
                className="p-6 rounded-2xl bg-slate-900/75 backdrop-blur-xl border border-white/[0.12] flex flex-col justify-between hover:border-indigo-500/50 transition-all shadow-xl shadow-black/25 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-xl bg-slate-800/90 border border-white/15 text-white flex items-center justify-center mono text-[13px] font-bold group-hover:border-indigo-400/50 transition-colors">
                      {prob.id}
                    </span>
                    <span className={`mono text-[11px] px-3 py-1 rounded-full border ${prob.badgeColor} font-semibold`}>
                      {prob.badge}
                    </span>
                  </div>

                  <h3 className="text-[18px] font-bold text-white mb-2.5">
                    {prob.title}
                  </h3>

                  <p className="text-[14px] text-slate-200 leading-relaxed mb-5 font-normal">
                    {prob.challenge}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.10] text-[13px] mono text-emerald-300 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-400" />
                  <span className="text-slate-200 font-normal">
                    <strong className="text-white font-semibold">Fix: </strong>
                    {prob.solution}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* The 3-Part Filter Matrix Showcase */}
        <div className="p-7 sm:p-9 rounded-2xl bg-slate-900/75 backdrop-blur-xl border border-white/[0.12] shadow-2xl shadow-indigo-950/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-white/[0.10] gap-3">
            <div>
              <span className="mono text-[12px] text-amber-300 font-bold uppercase tracking-wider">
                PROPOSED SOLUTION: THE 3-PART FILTER MATRIX
              </span>
              <h3 className="text-[22px] font-bold text-white mt-1">
                Three filters targeting three distinct physical mechanisms
              </h3>
            </div>
            <span className="mono text-[12px] text-slate-300 px-3 py-1 rounded-full bg-slate-800/80 border border-white/[0.10] self-start sm:self-auto font-medium">
              No Single Filter Can Solve All Three
            </span>
          </div>

          {/* Filter Selection Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-7">
            {THREE_FILTERS_DATA.map(f => {
              const isSelected = f.num === selectedFilterId;
              return (
                <button
                  key={f.num}
                  onClick={() => setSelectedFilterId(f.num)}
                  className={`p-4 rounded-xl text-left border transition-all mono text-[12px] ${
                    isSelected
                      ? 'border-indigo-500/70 bg-indigo-500/20 text-white shadow-md shadow-indigo-950/40'
                      : 'border-white/[0.12] bg-slate-950/60 text-slate-200 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1.5 font-medium">
                    <span className="font-bold text-white">FILTER {f.num}</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800/90 text-amber-300 border border-white/[0.10] font-semibold">{f.mechanism}</span>
                  </div>
                  <div className="font-bold text-[14.5px] text-white line-clamp-1">{f.title}</div>
                  <div className="text-[12px] text-slate-300 mt-1">Acts on: {f.actsOn}</div>
                </button>
              );
            })}
          </div>

          {/* Filter Details View */}
          <div className="p-6 rounded-xl bg-slate-950/70 border border-white/[0.10]">
            <div className="grid lg:grid-cols-[1.3fr,0.7fr] gap-7">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3.5">
                  <span className="mono text-[12px] text-amber-300 font-bold px-2.5 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/30">
                    {selectedFilter.mechanism} DOMAIN FILTER
                  </span>
                  <span className="mono text-[12px] text-slate-300">·</span>
                  <span className="mono text-[12px] text-emerald-300 font-semibold">
                    Rejects: {selectedFilter.rejects}
                  </span>
                </div>

                <p className="text-[15px] text-slate-200 leading-relaxed mb-5 font-normal">
                  {selectedFilter.physicsRationale}
                </p>

                <div className="p-4 sm:p-5 rounded-xl bg-[#070B14]/95 border border-white/[0.12] mono text-[13px] text-amber-300 mb-2">
                  <span className="text-[11.5px] text-slate-300 block mb-1.5 font-medium uppercase tracking-wider">
                    Governing Equation:
                  </span>
                  <code
                    className="block w-full overflow-x-auto py-2.5 px-3 rounded-lg bg-slate-950/80 border border-white/[0.08] text-white text-[15px] sm:text-[16px] text-center font-normal tracking-wide shadow-inner"
                    dangerouslySetInnerHTML={{ __html: renderedFormulaHtml }}
                  />
                </div>
              </div>

              {/* Physical Parameters List */}
              <div className="p-5 rounded-xl bg-slate-900/75 border border-white/[0.10] flex flex-col justify-between">
                <div>
                  <span className="mono text-[12px] uppercase tracking-wider text-slate-200 block mb-3.5 font-bold">
                    Physical Specifications
                  </span>
                  <div className="space-y-2.5 mono text-[12.5px]">
                    {selectedFilter.physicalSpecs.map((spec, i) => (
                      <div key={i} className="flex justify-between pb-2 border-b border-white/[0.08] last:border-0 last:pb-0">
                        <span className="text-slate-300 font-medium">{spec.label}:</span>
                        <span className="text-white font-semibold text-right ml-2">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
