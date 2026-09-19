import { OPEN_ENGINEERING_ITEMS } from '../data/reportData';
import { ShieldCheck, AlertCircle, HelpCircle, CheckCircle2, ChevronRight, FileCode, Layers } from 'lucide-react';

export function VerificationStatus() {
  const priorityColors = {
    High: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    Low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
  };

  const statusColors = {
    'In Review': 'text-amber-300',
    'Verified in Simulation': 'text-emerald-400',
    'Pending Build Phase': 'text-sky-300'
  };

  return (
    <section id="verification" className="py-20 sm:py-28 border-t border-[var(--line)] bg-[#0C1019]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="mono text-[11px] uppercase tracking-wider text-[var(--text-faint)] mb-2 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--signal)]" />
              Engineering Integrity &amp; Risk Register
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-semibold tracking-tight text-[var(--text)]">
              Verification status &amp; open engineering items
            </h2>
          </div>
          <p className="text-[14.5px] text-[var(--text-dim)] max-w-xl leading-relaxed">
            Honest engineering transparency: articulating theoretical computations versus physical build tasks, with active risk mitigations across all nine subsystems.
          </p>
        </div>

        {/* Computed vs Measured Performance Disclosure Banner */}
        <div className="bracket-frame panel p-6 rounded-sm mb-12 border-l-4 border-l-[var(--signal)]">
          <span className="bf-tr"></span>
          <span className="bf-br"></span>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[var(--line)] gap-2">
            <span className="mono text-[12px] font-semibold text-[var(--signal)] uppercase">
              Design Integrity Disclosure — Computed versus Measured Performance
            </span>
            <span className="mono text-[11px] text-[var(--text-faint)]">
              Per SIH Technical Evaluation Criteria
            </span>
          </div>

          <p className="text-[13.5px] text-[var(--text-dim)] leading-relaxed mb-3">
            Every figure presented in this report is derived from <strong className="text-[var(--text)]">verified component specifications, mathematical first principles, and LTspice XVII closed-loop simulations</strong>. The analog chain is simulated end-to-end with verified DC operating points; the acoustic time constant derives from laminar Poiseuille fluid dynamics; and the noise floor of <strong className="text-[var(--signal)]">8.07 mPa RMS</strong> is a rigorous theoretical budget.
          </p>

          <p className="text-[12.5px] text-[var(--text-faint)] italic leading-relaxed">
            As documented in Procedure 2, first-build physical instrumentation typically manifests noise floors 2–10× worse due to physical layout, ambient EMI, and thermal convection. The five calibration procedures in Section 10 define the precise empirical protocols to bridge computed models to physical hardware results.
          </p>
        </div>

        {/* Open Items Matrix */}
        <div className="panel-alt rounded-sm border border-[var(--line)] overflow-hidden mb-14">
          <div className="px-6 py-4 border-b border-[var(--line)] flex items-center justify-between bg-[#10151F]">
            <div>
              <span className="mono text-[11px] uppercase tracking-wider text-[var(--text-faint)] block">
                Subsystem Open Items &amp; Build-Phase Verification Matrix
              </span>
              <span className="text-[14px] font-semibold text-[var(--text)]">
                Active Engineering Action Register
              </span>
            </div>
            <span className="mono text-[11px] text-[var(--signal)]">
              8 Managed Items
            </span>
          </div>

          <div className="divide-y divide-[var(--line)]">
            {OPEN_ENGINEERING_ITEMS.map((item, idx) => (
              <div key={idx} className="p-5 hover:bg-[#151B27]/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2 py-0.5 rounded-sm mono text-[10px] font-semibold border ${priorityColors[item.priority]}`}>
                      {item.priority} Priority
                    </span>
                    <span className="mono text-[11px] text-[var(--text-faint)]">{item.block}</span>
                    <span className="text-[14px] font-semibold text-[var(--text)]">{item.item}</span>
                  </div>
                  <span className={`mono text-[11.5px] font-medium ${statusColors[item.status]}`}>
                    ● {item.status}
                  </span>
                </div>
                <p className="text-[12.5px] text-[var(--text-dim)] pl-0 sm:pl-4 border-l-0 sm:border-l sm:border-[var(--line)] mt-2 sm:mt-1">
                  <strong className="text-[var(--text-faint)]">Engineering Impact &amp; Resolution:</strong> {item.impact}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* The 3 Core Architectural Pillars */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-5 rounded-sm">
            <div className="mono text-[11px] text-[var(--signal)] mb-2 font-semibold">PILLAR 01</div>
            <h4 className="text-[15px] font-semibold text-[var(--text)] mb-2">The Calibration Paradox</h4>
            <p className="text-[12.5px] text-[var(--text-dim)] leading-relaxed">
              τ = 15.9 s causes applied static pressures to bleed off within 80 seconds. Solved by pressurizing the reference volume (Port B) directly, enabling steady-state testing while measuring τ.
            </p>
          </div>

          <div className="card p-5 rounded-sm">
            <div className="mono text-[11px] text-[var(--noise)] mb-2 font-semibold">PILLAR 02</div>
            <h4 className="text-[15px] font-semibold text-[var(--text)] mb-2">Irreplaceable Spatial Rosette</h4>
            <p className="text-[12.5px] text-[var(--text-dim)] leading-relaxed">
              Wind turbulence and infrasound occupy identical frequencies (0.01–20 Hz). Only spatial coherence averaging across 1 m baseline arms can separate coherent planar wavefronts from wind noise.
            </p>
          </div>

          <div className="card p-5 rounded-sm">
            <div className="mono text-[11px] text-emerald-400 mb-2 font-semibold">PILLAR 03</div>
            <h4 className="text-[15px] font-semibold text-[var(--text)] mb-2">The ASIC Resolution Breakthrough</h4>
            <p className="text-[12.5px] text-[var(--text-dim)] leading-relaxed">
              Eliminating the ELVH ASIC's 11-bit internal quantization floor (0.24 Pa) by switching to the raw MLV-L01D Wheatstone bridge die enabled an 8.07 mPa noise floor—a 30× resolution leap.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
