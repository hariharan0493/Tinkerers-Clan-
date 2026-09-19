import { BookOpen, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const citations = [
    { title: 'All Sensors DS-0274 Rev D', desc: 'MLV Series Low Voltage Pressure Sensors (CoBeam² Piezoresistive die)' },
    { title: 'Texas Instruments INA188', desc: 'Precision, Low-Noise (12.5 nV/√Hz), Zero-Drift Instrumentation Amplifier' },
    { title: 'Texas Instruments OPA2333', desc: '1.8V, 17µA, Dual, Zero-Drift Precision Chopper-Stabilized Op-Amp' },
    { title: 'Texas Instruments ADS1256', desc: 'Very Low Noise, 24-Bit, 30 kSPS Delta-Sigma ADC with SPI' },
    { title: 'Texas Instruments TMP117', desc: 'High-Accuracy ±0.1°C Precision Digital Temperature Sensor' },
    { title: 'Analog Devices ADR441', desc: 'Ultralow Noise, High Accuracy 2.500 V XFET Voltage Reference' }
  ];

  return (
    <footer className="border-t border-white/[0.08] bg-slate-950/70 backdrop-blur-2xl py-16 text-slate-300 relative z-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(37,99,235,0.18),transparent_75%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 pb-12 border-b border-white/[0.08]">
          
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-slate-900/90 border border-emerald-500/30 p-1 flex items-center justify-center shadow-sm">
                <img src="/team-logo.svg" alt="Tinkerers Clan Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <div>
                <span className="mono text-[14.5px] font-bold text-white tracking-wider block">
                  Tinkerers Clan · SIH26144
                </span>
                <span className="text-[12px] text-slate-300 font-medium">Atmospheric Infrasound Microbarometer</span>
              </div>
            </div>

            <p className="text-[14.5px] text-slate-200 max-w-xl leading-relaxed mb-6 font-normal">
              Precision infrasound instrumentation architecture submitted for Smart India Hackathon. Designed to resolve micro-pascal pressure anomalies across 0.01 – 20 Hz through physical, pneumatic, and electrical noise rejection.
            </p>

            <div className="flex flex-wrap gap-2.5 mono text-[11.5px]">
              <span className="px-3 py-1 bg-slate-900/90 border border-white/[0.12] rounded-full text-amber-300 font-semibold">
                Hardware Track · SIH 2026
              </span>
              <span className="px-3 py-1 bg-slate-900/90 border border-white/[0.12] rounded-full text-slate-200 font-medium">
                Single 5V Supply · Star Ground
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-emerald-300 font-bold">
                Noise: 2.34 mPa RMS (21× Margin)
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mono text-[12px] text-slate-200 uppercase tracking-wider mb-4 font-bold">
              <BookOpen className="w-4 h-4 text-amber-400" />
              Component Datasheet Citations &amp; Standards
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px] mono">
              {citations.map((c, i) => (
                <div key={i} className="p-3.5 bg-slate-900/75 border border-white/[0.10] rounded-xl hover:border-indigo-500/40 transition-colors">
                  <div className="text-white font-bold">{c.title}</div>
                  <div className="text-slate-300 mt-1 text-[11.5px] leading-snug font-normal">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[12px] mono text-slate-300 gap-4 font-medium">
          <div>
            SIH 2026 Hardware Edition · Problem Statement SIH26144 · Engineered by <span className="text-emerald-400 font-semibold">Tinkerers Clan</span>
          </div>
          <button
            onClick={scrollToTop}
            id="footer-back-to-top"
            className="flex items-center gap-2 text-slate-200 hover:text-amber-300 transition-colors px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/[0.12] hover:border-amber-400/40 font-medium"
          >
            <span>Top of instrument</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
