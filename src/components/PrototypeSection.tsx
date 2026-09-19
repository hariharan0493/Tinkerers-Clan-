import { useState } from 'react';
import { OPEN_ENGINEERING_ITEMS, TEAM_MEMBERS_DATA } from '../data/reportData';
import { Box, ShieldCheck, Terminal, User } from 'lucide-react';

export function PrototypeSection() {
  const [activeTab, setActiveTab] = useState<'mechanical' | 'firmware' | 'risk'>('mechanical');

  const priorityColors = {
    High: 'text-rose-300 bg-rose-500/10 border-rose-500/30',
    Medium: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
    Low: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30'
  };

  return (
    <section id="prototype" className="py-24 border-t border-white/[0.08] relative overflow-hidden">
      {/* Section-specific atmospheric aura: Deep ocean blue & subtle cyan */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_90%_75%_at_30%_45%,rgba(37,99,235,0.20),rgba(14,165,233,0.14)_55%,transparent_75%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading: Final Prototype */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <div className="mono text-[12px] uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2 font-semibold">
              <Box className="w-4 h-4 text-amber-400" />
              Physical Implementation &amp; Prototype
            </div>
            <h2 className="text-[28px] sm:text-[36px] font-bold tracking-tight text-white">
              Prototype hardware, firmware &amp; open risk register
            </h2>
          </div>
          <p className="text-[15.5px] text-slate-200 max-w-xl leading-relaxed font-normal">
            Engineered for physical deployment: 3D PETG airtight manifold, 1000 SPS to 100 SPS FIR decimation, miniSEED telemetry, and transparent engineering risk mitigation.
          </p>
        </div>

        {/* Prototype Segmented Tabs */}
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-950/70 border border-white/[0.12] mb-10 gap-2 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('mechanical')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2.5 mono text-[12.5px] font-medium transition-all ${
              activeTab === 'mechanical'
                ? 'bg-indigo-600/30 text-white border border-indigo-500/50 shadow-md shadow-indigo-950/40 font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Box className="w-4 h-4 text-amber-400" />
            <span>Mechanical &amp; Manifold</span>
          </button>

          <button
            onClick={() => setActiveTab('firmware')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2.5 mono text-[12.5px] font-medium transition-all ${
              activeTab === 'firmware'
                ? 'bg-indigo-600/30 text-white border border-indigo-500/50 shadow-md shadow-indigo-950/40 font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Firmware &amp; miniSEED DSP</span>
          </button>

          <button
            onClick={() => setActiveTab('risk')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2.5 mono text-[12.5px] font-medium transition-all ${
              activeTab === 'risk'
                ? 'bg-indigo-600/30 text-white border border-indigo-500/50 shadow-md shadow-indigo-950/40 font-semibold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Risk Register ({OPEN_ENGINEERING_ITEMS.length} Items)</span>
          </button>
        </div>

        {/* Tab 1: Mechanical & Manifold */}
        {activeTab === 'mechanical' && (
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mono text-[12px] text-amber-300 mb-2 uppercase font-bold">
                BLOCKS (b), (c) &amp; (g) PHYSICAL HOUSING
              </div>
              <h3 className="text-[22px] font-bold text-white mb-3">
                Airtight 3D PETG Manifold &amp; Dual Enclosure
              </h3>
              <p className="text-[15px] text-slate-200 leading-relaxed mb-5 font-normal">
                Pneumatic leaks destroy microbarometer calibration by altering the 7.9 mHz corner frequency. The sensor block is enclosed in a custom 3D-printed PETG manifold (35 &times; 35 &times; 45 mm) printed with 100% infill and coated in polyurethane sealant to prevent micro-porosity.
              </p>

              <div className="space-y-3 mono text-[12.5px]">
                <div className="p-3.5 bg-slate-900/75 border border-white/[0.10] rounded-xl backdrop-blur-md">
                  <span className="text-emerald-300 font-bold">100 mL Reference Bottle:</span>
                  <span className="text-slate-200 ml-2 font-normal">Heavy-wall borosilicate glass with GL45 cap and PEEK capillary tube pass-through sealed with Cyanoacrylate/Epoxy.</span>
                </div>
                <div className="p-3.5 bg-slate-900/75 border border-white/[0.10] rounded-xl backdrop-blur-md">
                  <span className="text-amber-300 font-bold">Acoustic Foam Insulation:</span>
                  <span className="text-slate-200 ml-2 font-normal">Acoustic chamber lined with 20 mm closed-cell EPDM/PE foam to slow thermal transfer and suppress 0.35 Pa/mK gas-thermometer drift.</span>
                </div>
                <div className="p-3.5 bg-slate-900/75 border border-white/[0.10] rounded-xl backdrop-blur-md">
                  <span className="text-blue-300 font-bold">Electronics Breather:</span>
                  <span className="text-slate-200 ml-2 font-normal">ePTFE hydrophobic vent on electronics chamber equalizes weather pressure without admitting moisture.</span>
                </div>
              </div>
            </div>

            {/* Visual Specs Card */}
            <div className="p-7 rounded-2xl bg-slate-900/75 backdrop-blur-xl border border-white/[0.12] shadow-xl shadow-indigo-950/20">
              <span className="mono text-[12px] text-slate-200 uppercase font-bold tracking-wider block mb-4">
                Physical Specifications Summary
              </span>

              <div className="space-y-2.5 mono text-[12.5px]">
                <div className="flex justify-between p-3 bg-slate-950/70 border border-white/[0.08] rounded-xl">
                  <span className="text-slate-300 font-medium">Manifold Material:</span>
                  <span className="text-white font-semibold">PETG (100% infill, ≥3mm walls)</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-950/70 border border-white/[0.08] rounded-xl">
                  <span className="text-slate-300 font-medium">Port Barb Size:</span>
                  <span className="text-white font-semibold">1.5 mm ID / 3.0 mm OD</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-950/70 border border-white/[0.08] rounded-xl">
                  <span className="text-slate-300 font-medium">Capillary Tube:</span>
                  <span className="text-amber-200 font-bold">PEEK, 0.30 mm ID × 330 mm L</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-950/70 border border-white/[0.08] rounded-xl">
                  <span className="text-slate-300 font-medium">Array Arms:</span>
                  <span className="text-white font-semibold">4 arms × 1.0 m, 6–8 mm ID vinyl/PE</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-950/70 border border-white/[0.08] rounded-xl">
                  <span className="text-slate-300 font-medium">Array Footprint:</span>
                  <span className="text-emerald-300 font-bold">2.0 m diameter cross pattern</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Firmware & miniSEED DSP */}
        {activeTab === 'firmware' && (
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mono text-[12px] text-amber-300 mb-2 uppercase font-bold">
                BLOCK (e) EMBEDDED DSP &amp; TELEMETRY
              </div>
              <h3 className="text-[22px] font-bold text-white mb-3">
                STM32 DMA SPI &amp; 10:1 Decimation FIR
              </h3>
              <p className="text-[15px] text-slate-200 leading-relaxed mb-5 font-normal">
                The STM32 micro-controller queries the ADS1256 at 1000 SPS via non-blocking DMA SPI. An on-chip 64-tap symmetric linear-phase FIR low-pass filter decimates by 10:1, rejecting alias noise with &gt;60 dB stopband attenuation and outputting a clean 100 SPS stream.
              </p>

              <div className="space-y-3 mono text-[12.5px]">
                <div className="p-3.5 bg-slate-900/75 border border-white/[0.10] rounded-xl backdrop-blur-md">
                  <span className="text-emerald-300 font-bold">Standard miniSEED Streaming:</span>
                  <span className="text-slate-200 ml-2 font-normal">Packets conform directly to IRIS/FDSN seismic data formats, immediately ingestible by ObsPy and SeisComP.</span>
                </div>
                <div className="p-3.5 bg-slate-900/75 border border-white/[0.10] rounded-xl backdrop-blur-md">
                  <span className="text-amber-300 font-bold">Dual Storage:</span>
                  <span className="text-slate-200 ml-2 font-normal">USB Virtual COM stream for real-time telemetry + onboard microSD FAT32 continuous circular buffer logging.</span>
                </div>
                <div className="p-3.5 bg-slate-900/75 border border-white/[0.10] rounded-xl backdrop-blur-md">
                  <span className="text-blue-300 font-bold">Precision Temperature:</span>
                  <span className="text-slate-200 ml-2 font-normal">TMP117 digital thermometer sampled at 1 Hz via I2C to apply 2nd-order polynomial thermal compensation in firmware.</span>
                </div>
              </div>
            </div>

            {/* Firmware Block Diagram */}
            <div className="p-7 rounded-2xl bg-slate-900/75 backdrop-blur-xl border border-white/[0.12] shadow-xl shadow-indigo-950/20">
              <span className="mono text-[12px] text-slate-200 uppercase font-bold tracking-wider block mb-4">
                Embedded Pipeline Sequence
              </span>

              <div className="space-y-2.5 mono text-[12.5px]">
                <div className="p-3 bg-slate-950/70 border border-white/[0.08] rounded-xl flex items-center justify-between">
                  <span className="text-slate-300 font-medium">1. ADS1256 Raw Conversion:</span>
                  <span className="text-white font-semibold">1000 SPS (24-bit delta-sigma)</span>
                </div>
                <div className="p-3 bg-slate-950/70 border border-white/[0.08] rounded-xl flex items-center justify-between">
                  <span className="text-slate-300 font-medium">2. SPI Data Transfer:</span>
                  <span className="text-amber-200 font-bold">DMA Circular Buffer (0% CPU)</span>
                </div>
                <div className="p-3 bg-slate-950/70 border border-white/[0.08] rounded-xl flex items-center justify-between">
                  <span className="text-slate-300 font-medium">3. Digital FIR Filter:</span>
                  <span className="text-emerald-300 font-bold">64-Tap Linear Phase (fc = 20 Hz)</span>
                </div>
                <div className="p-3 bg-slate-950/70 border border-white/[0.08] rounded-xl flex items-center justify-between">
                  <span className="text-slate-300 font-medium">4. Decimation Factor:</span>
                  <span className="text-white font-semibold">10:1 Downsampling</span>
                </div>
                <div className="p-3 bg-slate-950/70 border border-white/[0.08] rounded-xl flex items-center justify-between">
                  <span className="text-slate-300 font-medium">5. Telemetry Output:</span>
                  <span className="text-amber-200 font-bold">100 SPS miniSEED over USB/UART</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Risk Register */}
        {activeTab === 'risk' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="mono text-[12px] text-slate-200 uppercase font-bold tracking-wider">
                Prioritized Action Items for Physical Commissioning
              </span>
              <span className="mono text-[12px] text-amber-300 font-bold px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30">
                {OPEN_ENGINEERING_ITEMS.length} Engineering Risks Catalogued
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {OPEN_ENGINEERING_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-slate-900/75 backdrop-blur-xl border border-white/[0.10] rounded-2xl flex flex-col justify-between hover:border-indigo-500/50 transition-all shadow-lg shadow-black/15"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="mono text-[11.5px] text-slate-300 font-semibold">{item.block}</span>
                      <span className={`mono text-[11px] px-2.5 py-0.5 rounded-full border font-semibold ${priorityColors[item.priority]}`}>
                        {item.priority} Priority
                      </span>
                    </div>

                    <h4 className="text-[15px] font-bold text-white mb-1.5">
                      {item.item}
                    </h4>

                    <p className="text-[14px] text-slate-200 leading-relaxed mb-4 font-normal">
                      {item.impact}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.10] text-[12px] mono flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Status:</span>
                    <span className="text-emerald-300 font-bold">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Credits Strip */}
        <div className="mt-10 pt-6 border-t border-white/[0.08]">
          <div className="flex items-center justify-between mb-3.5">
            <span className="mono text-[12px] uppercase tracking-wider text-slate-300 flex items-center gap-2.5 font-semibold">
              <img src="/team-logo.svg" alt="Tinkerers Clan Logo" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
              <span>Our Tinkering Team — <span className="text-emerald-400 font-bold">Tinkerers Clan</span></span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {TEAM_MEMBERS_DATA.map((member, i) => (
              <div 
                key={i} 
                className="px-3 py-2 rounded-xl bg-slate-900/70 backdrop-blur-md border border-white/[0.08] hover:border-indigo-500/40 transition-all text-center flex items-center justify-center"
              >
                <span className="mono text-[12.5px] font-semibold text-slate-200 hover:text-white transition-colors truncate">
                  {member.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
