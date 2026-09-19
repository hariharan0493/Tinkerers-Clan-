import { Activity, BookOpen, ExternalLink, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const citations = [
    { title: 'All Sensors DS-0274 Rev D', desc: 'MLV Series Low Voltage Pressure Sensors (CoBeam² Piezoresistive die)' },
    { title: 'Texas Instruments INA333', desc: 'MicroPower (50µA), Zero-Drift, Rail-to-Rail Out Instrumentation Amp' },
    { title: 'Texas Instruments OPA2333', desc: '1.8V, 17µA, Dual, Zero-Drift Precision Chopper-Stabilized Op-Amp' },
    { title: 'Texas Instruments ADS1256', desc: 'Very Low Noise, 24-Bit, 30 kSPS Delta-Sigma ADC with SPI' },
    { title: 'Texas Instruments TMP117', desc: 'High-Accuracy ±0.1°C Precision Digital Temperature Sensor' },
    { title: 'Analog Devices ADR443', desc: 'Ultralow Noise, High Accuracy 3.000 V XFET Voltage Reference' }
  ];

  return (
    <footer className="border-t border-[var(--line)] bg-[#070A10] py-16 text-[var(--text-dim)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 pb-12 border-b border-[var(--line)]">
          
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-sm bg-[#151B27] border border-[var(--line)] flex items-center justify-center">
                <Activity className="w-3.5 h-3.5 text-[var(--signal)]" />
              </div>
              <span className="mono text-[14px] font-semibold text-[var(--text)] tracking-wider">
                SIH26144 — High-Sensitivity Atmospheric Microbarometer
              </span>
            </div>

            <p className="text-[13.5px] text-[var(--text-dim)] max-w-xl leading-relaxed mb-6">
              Precision infrasound instrumentation architecture submitted for Smart India Hackathon. Designed to resolve micro-pascal pressure anomalies across 0.01 – 20 Hz through physical, pneumatic, and electrical noise rejection.
            </p>

            <div className="flex flex-wrap gap-4 mono text-[11.5px] text-[var(--text-faint)]">
              <span className="px-2.5 py-1 bg-[#10151F] border border-[var(--line)] rounded-sm text-[var(--signal)]">
                Status: Verified in LTspice XVII
              </span>
              <span className="px-2.5 py-1 bg-[#10151F] border border-[var(--line)] rounded-sm">
                Single 5V Supply · Star Ground
              </span>
              <span className="px-2.5 py-1 bg-[#10151F] border border-[var(--line)] rounded-sm text-emerald-400">
                Noise: 8.07 mPa RMS
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mono text-[11px] text-[var(--text-faint)] uppercase tracking-wider mb-4">
              <BookOpen className="w-3.5 h-3.5 text-[var(--signal)]" />
              Primary Component Datasheet Citations
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] mono">
              {citations.map((c, i) => (
                <div key={i} className="p-2.5 bg-[#0C1019] border border-[var(--line)] rounded-sm">
                  <div className="text-[var(--text)] font-semibold">{c.title}</div>
                  <div className="text-[var(--text-faint)] mt-0.5">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[12px] mono text-[var(--text-faint)]">
          <p className="italic max-w-2xl leading-relaxed">
            All figures presented in this interface are derived from component specifications, verified arithmetic, and LTspice simulations per the final design report.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[var(--text-dim)] hover:text-[var(--signal)] transition-colors self-start sm:self-auto"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
