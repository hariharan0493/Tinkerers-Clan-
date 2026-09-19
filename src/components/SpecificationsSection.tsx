import { COMPLIANCE_PARAMETERS } from '../data/reportData';
import { CheckCircle2, FileCheck } from 'lucide-react';

export function SpecificationsSection() {
  return (
    <section id="specifications" className="py-24 border-t border-white/[0.08] relative overflow-hidden">
      {/* Section-specific atmospheric aura: Atmospheric cyan & deep blue */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_85%_70%_at_20%_40%,rgba(6,182,212,0.16),rgba(37,99,235,0.15)_55%,transparent_75%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <div className="mono text-[12px] uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2 font-semibold">
              <FileCheck className="w-4 h-4 text-amber-400" />
              Evaluation Criteria Compliance
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-bold tracking-tight text-white">
              Target requirements vs. our computed design
            </h2>
          </div>
          <p className="text-[15.5px] text-slate-200 max-w-xl leading-relaxed font-normal">
            Direct comparison with the Smart India Hackathon 2026 evaluation criteria
          </p>
        </div>

        {/* Compliance Table Card */}
        <div className="rounded-2xl bg-slate-900/75 backdrop-blur-xl border border-white/[0.12] shadow-2xl shadow-indigo-950/20 overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left mono text-[13.5px]">
              <thead className="bg-slate-950/80 border-b border-white/[0.10] text-slate-200">
                <tr>
                  <th className="py-4 px-6 font-bold text-white">Evaluation Parameter</th>
                  <th className="py-4 px-6 font-bold text-slate-200">SIH Target</th>
                  <th className="py-4 px-6 font-bold text-amber-300">Our Design (Computed)</th>
                  <th className="py-4 px-6 font-bold text-emerald-300">Compliance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.08] text-slate-200">
                {COMPLIANCE_PARAMETERS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-white flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{item.parameter}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-300 font-medium">{item.target}</td>
                    <td className="py-4 px-6 font-bold text-amber-200">{item.ourDesign}</td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-[12px] inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Range Engineering Clarification Note */}
        <div className="p-5 rounded-2xl bg-slate-900/75 backdrop-blur-md border border-white/[0.12] text-[13.5px] text-slate-200 leading-relaxed mono shadow-lg font-normal">
          <strong className="text-amber-300 font-bold">Technical Note on Dynamic Range (100 dB Target):</strong> The All Sensors MLV-L01D element saturates at ±249 Pa, and our analog chain utilizes ±240 Pa of that range. Against the 2.34 mPa computed electronic noise floor, this yields <strong className="text-white font-semibold">100.2 dB</strong> if dynamic range is defined as full-scale peak over RMS noise (20·log10(240 / 0.00234)), and <strong className="text-white font-semibold">97.2 dB</strong> if defined as the RMS of a full-scale sine wave over RMS noise (20·log10((240/√2) / 0.00234)). The physical limit stems from the sensing diaphragm and its thermal noise, not the electronics.
        </div>

      </div>
    </section>
  );
}
