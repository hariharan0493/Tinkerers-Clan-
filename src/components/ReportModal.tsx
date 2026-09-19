import { useState } from 'react';
import { X, FileText, Download, Copy, Check, ExternalLink } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportModal({ isOpen, onClose }: ReportModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<'overview' | 'sensor_afe' | 'acoustics' | 'calibration'>('overview');

  if (!isOpen) return null;

  const handleCopySummary = () => {
    const text = `High-Sensitivity Atmospheric Microbarometer (SIH26144)
Band: 0.01 - 20 Hz
System Sensitivity: 42.2 mV/Pa
Total Gain: 1499x (63.5 dB)
Noise Floor: 8.07 mPa RMS (1.81 mPa/√Hz)
Acoustic Time Constant: 15.9 s
Working Range: ±50 Pa (±2.11 V on 2.5 V mid-rail)
Sensor: All Sensors MLV-L01D raw Wheatstone bridge
Pre-Amp: INA333 + OPA2333 + ADS1256 24-bit ADC
Rejection: 4-arm 1m spatial rosette + 247mm PEEK capillary + Sallen-Key 25Hz filter`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bracket-frame panel w-full max-w-4xl max-h-[90vh] rounded-sm flex flex-col shadow-2xl overflow-hidden border border-[var(--line)]">
        <span className="bf-tr"></span>
        <span className="bf-br"></span>

        {/* Modal Header */}
        <div className="p-5 border-b border-[var(--line)] flex items-center justify-between bg-[#151B27]">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[var(--signal)]" />
            <div>
              <h3 className="text-[16px] font-semibold text-[var(--text)]">
                Technical Design Report &amp; System Architecture
              </h3>
              <div className="mono text-[11px] text-[var(--text-faint)]">
                SIH26144 · Atmospheric Infrasound Microbarometer (Blocks a to i)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="btn-secondary px-3 py-1.5 rounded-sm mono text-[11px] flex items-center gap-1.5"
              title="Copy Executive Specs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Specs'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[var(--text-dim)] hover:text-white rounded-sm hover:bg-[var(--line)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation */}
        <div className="flex border-b border-[var(--line)] bg-[#0E131E] px-5 py-2 gap-3 overflow-x-auto mono text-[11.5px]">
          {[
            { id: 'overview', label: '1. System Overview & Figures' },
            { id: 'sensor_afe', label: '2. Sensor & Analog Front End (a, d)' },
            { id: 'acoustics', label: '3. Transducer & Acoustics (b, c, g, h)' },
            { id: 'calibration', label: '4. Calibration Procedures (i)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`px-3 py-1 rounded-sm whitespace-nowrap transition-colors ${
                activeSection === tab.id
                  ? 'bg-[var(--signal-soft)] text-[var(--signal)] font-medium border border-[var(--signal-border)]'
                  : 'text-[var(--text-dim)] hover:text-[var(--text)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-[13.5px] text-[var(--text-dim)] leading-relaxed">
          {activeSection === 'overview' && (
            <div className="space-y-4">
              <h4 className="text-[17px] font-semibold text-[var(--text)]">
                System Signal Chain &amp; Headline Specifications
              </h4>
              <p>
                The instrument captures atmospheric infrasound across <strong className="text-[var(--text)]">0.01 – 20 Hz</strong> with a chain-limited working range of <strong className="text-[var(--text)]">±57 Pa</strong> (±50 Pa nominal design point). The raw bridge sensitivity of 28.1 µV/Pa is amplified by 1499× (63.5 dB composite gain) to yield an overall system sensitivity of 42.2 mV/Pa.
              </p>
              
              <div className="p-4 bg-[#0A0E16] border border-[var(--line)] rounded-sm font-mono text-[11.5px] space-y-1 text-[var(--text)]">
                <div>Atmosphere → 4-Arm Rosette (1m arms) [Spatial Wind Rejection]</div>
                <div>→ Port A Manifold Entry</div>
                <div>→ MLV-L01D Bridge ← Port B, Sealed 100 mL Reference via 247 mm × 0.30 mm PEEK Capillary</div>
                <div>→ INA333, Gain 100 [40.0 dB]</div>
                <div>→ AC Coupling, 22 µF Film / 1.5 MΩ to 2.5V [Strips Bridge Offset, 4.8 mHz]</div>
                <div>→ OPA2333, Gain 9.45 [19.5 dB]</div>
                <div>→ Sallen-Key Butterworth, 25 Hz [4.0 dB, Anti-Alias]</div>
                <div>→ ADS1256, 24-bit Delta-Sigma, 1000 SPS</div>
                <div>→ 20:1 FIR Decimation → 50 Hz Output</div>
              </div>
            </div>
          )}

          {activeSection === 'sensor_afe' && (
            <div className="space-y-4">
              <h4 className="text-[17px] font-semibold text-[var(--text)]">
                Transducer Physics &amp; Analog Front End Staging
              </h4>
              <p>
                <strong className="text-[var(--text)]">Why MLV-L01D over ELVH-L01D:</strong> The ELVH-L01D derives its analog output from an internal 11-bit conversion, imposing a permanent resolution floor near 0.24 Pa. Information discarded inside the ASIC cannot be recovered downstream. The raw-bridge MLV-L01D performs no internal digitization; our custom front end reaches a computed noise floor of 8.07 mPa RMS.
              </p>
              <p>
                <strong className="text-[var(--text)]">Gain Staging Rationale:</strong> The bridge carries up to ±750 µV of combined offset and thermal drift, comparable to the ±1.4 mV signal at ±50 Pa. Applying full gain in one stage would slam into the 5 V rail. Gain is split into 100× (INA333), stripped of DC by the 22 µF / 1.5 MΩ coupling node (4.8 mHz), scaled by 9.45× (OPA2333), and buffered by the 25 Hz Butterworth filter (1.586×), resulting in ±2.11 V output centered on 2.5 V.
              </p>
            </div>
          )}

          {activeSection === 'acoustics' && (
            <div className="space-y-4">
              <h4 className="text-[17px] font-semibold text-[var(--text)]">
                Acoustics, Enclosure &amp; Rosette Spatial Coherence
              </h4>
              <p>
                <strong className="text-[var(--text)]">Borosilicate Reference Volume:</strong> A 100 mL heavy-wall borosilicate glass bottle provides complete mechanical rigidity. Plastic bottles flex under sub-pascal pressure, adding parasitic mechanical compliance in parallel with acoustic compliance Ca and shifting the corner frequency unpredictably.
              </p>
              <p>
                <strong className="text-[var(--text)]">Dual-Chamber Enclosure:</strong> The acoustic chamber is hermetically sealed and lined with 15–20 mm closed-cell EPDM/PE foam to buffer thermal slew rate (dT/dt). Conversely, the electronics bay is vented with a Gore-style ePTFE membrane to equalize internal ambient pressure without admitting moisture.
              </p>
              <p>
                <strong className="text-[var(--text)]">4-Arm Rosette:</strong> 1.0 m arms (6–8 mm ID) provide an organ-pipe resonance of c/4L = 86 Hz (&gt;4× above the 20 Hz passband edge), avoiding resonance skirt peaking while canceling incoherent wind turbulence by 6 dB.
              </p>
            </div>
          )}

          {activeSection === 'calibration' && (
            <div className="space-y-4">
              <h4 className="text-[17px] font-semibold text-[var(--text)]">
                The 80-Second Calibration Paradox &amp; 5 Evaluation Procedures
              </h4>
              <p>
                Because τ = 15.9 s, 5τ ≈ 80 s. The instrument bleeds off static pressure in ~80 seconds, rendering static manometers useless.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-[var(--text)]">Procedure 1 (Sensitivity):</strong> Pressurize reference Port B or use fast-step response extrapolated to t=0, measuring sensitivity (42.2 mV/Pa) and validating τ = 15.9 s simultaneously.</li>
                <li><strong className="text-[var(--text)]">Procedure 2 (Noise Floor):</strong> 8.07 mPa RMS budget where INA333 dominates 96.9% and ADC sits 14× below analog floor.</li>
                <li><strong className="text-[var(--text)]">Procedure 3 (Frequency Response):</strong> Confirms 4.8 mHz electrical, 0.01 Hz acoustic, and 25 Hz electrical corners.</li>
                <li><strong className="text-[var(--text)]">Procedure 4 (Thermal Stability):</strong> 24–72 hour diurnal logging with 2nd-order polynomial compensation nulling drift below noise floor.</li>
                <li><strong className="text-[var(--text)]">Procedure 5 (1 Hz Detection):</strong> Tests 10 Pa, 1 Pa, 0.1 Pa, and 8 mPa threshold via spectral FFT analysis.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[var(--line)] bg-[#151B27] flex items-center justify-between">
          <span className="mono text-[11px] text-[var(--text-faint)]">
            Source: All Sensors DS-0274 Rev D &amp; SIH26144 Final Report
          </span>
          <button
            onClick={onClose}
            className="btn-primary px-4 py-1.5 rounded-sm mono text-[12px]"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
