import {
  SystemHeadlineMetric,
  SignalChainStage,
  FilterMechanism,
  NoiseContributor,
  HardwareBlockSpec,
  CalibrationStep,
  TeamMember,
  OpenEngineeringItem
} from '../types';

export const SYSTEM_HEADLINE_METRICS: SystemHeadlineMetric[] = [
  {
    id: 'band',
    value: '0.01 – 20',
    unit: 'Hz',
    label: 'Measurement Band',
    description: 'Target infrasound window spanning micro-barometric fluctuations up to upper boundary.',
    category: 'band'
  },
  {
    id: 'system_sens',
    value: '42.2',
    unit: 'mV/Pa',
    label: 'System Sensitivity',
    description: 'End-to-end electrical sensitivity at ADC input after 1499× composite analog amplification.',
    category: 'sensitivity'
  },
  {
    id: 'noise_floor',
    value: '8.07',
    unit: 'mPa RMS',
    label: 'Computed Noise Floor',
    description: 'Equivalent to 1.81 mPa/√Hz over 20 Hz bandwidth, dominated 96.9% by INA333 input noise.',
    category: 'noise'
  },
  {
    id: 'total_gain',
    value: '1499 (63.5 dB)',
    unit: 'V/V',
    label: 'Total Analog Gain',
    description: 'Staged across 3 active blocks (100 × 9.45 × 1.586) with DC stripping between stages.',
    category: 'gain'
  },
  {
    id: 'time_constant',
    value: '15.9',
    unit: 's',
    label: 'Acoustic Time Constant (τ)',
    description: 'Formed by 100 mL borosilicate cavity and 247 mm × 0.30 mm PEEK capillary (fc = 0.01 Hz).',
    category: 'acoustic'
  },
  {
    id: 'working_range',
    value: '±50',
    unit: 'Pa',
    label: 'Design Operating Point',
    description: 'Produces ±2.11 V swing centered on a 2.5 V pedestal, leaving 0.4 V rail headroom on 5 V supply.',
    category: 'operating'
  }
];

export const THREE_FILTERS_DATA: FilterMechanism[] = [
  {
    num: '01',
    title: 'Spatial Coherence Rosette',
    mechanism: 'MECHANICAL',
    actsOn: 'Spatial Coherence',
    rejects: 'In-band wind turbulence & micro-eddies',
    cutoff: 'c/4L ≈ 86 Hz acoustic resonance',
    tagColor: 'var(--signal)',
    formula: 'A_sum = \\sum_{i=1}^{4} P_{coherent} + \\sqrt{4} \\cdot P_{incoherent}',
    summary: 'A 4-arm, 1-meter rosette rejects spatially incoherent wind turbulence while constructively summing coherent infrasound waves.',
    physicsRationale: 'Wind noise and infrasound occupy the exact same frequencies (0.01–20 Hz), making electrical frequency filtering mathematically incapable of separating them. Wind turbulence fluctuates randomly across 1-meter baselines, while distant wavefronts arrive with high coherence, allowing spatial averaging to cancel noise without attenuating signal.',
    physicalSpecs: [
      { label: 'Configuration', value: '4-arm radial rosette, 90° spacing' },
      { label: 'Arm Length (L)', value: '1.0 m equal length (prevents phase skew)' },
      { label: 'Arm Internal Bore', value: '6 – 8 mm ID (acoustic resistance << capillary)' },
      { label: 'Acoustic Resonance', value: 'c/4L = 343 / 4 ≈ 86 Hz (>4.3× above passband)' },
      { label: 'Aperture Footprint', value: '2.0 m ground diameter' }
    ]
  },
  {
    num: '02',
    title: 'Rate-of-Change Capillary Filter',
    mechanism: 'PNEUMATIC',
    actsOn: 'Rate of Pressure Change (dP/dt)',
    rejects: 'Barometric weather drift below 0.01 Hz',
    cutoff: 'fc = 0.01 Hz (τ = 15.9 s, 5τ ≈ 80 s)',
    tagColor: 'var(--noise)',
    formula: '\\tau = R_a \\times C_a = \\left(\\frac{8\\eta L}{\\pi r^4}\\right) \\left(\\frac{V}{\\gamma P_0}\\right)',
    summary: 'A 100 mL rigid borosilicate reference volume paired with a 247 mm × 0.30 mm PEEK capillary equalizes slow atmospheric changes.',
    physicsRationale: 'Diurnal weather trends fluctuate by kilopascals, which would instantly saturate a high-gain ±50 Pa instrument. The pneumatic RC network allows slow barometric shifts to equalize into Port B, preserving high-differential sensitivity exclusively for dynamic infrasonic perturbations above 0.01 Hz.',
    physicalSpecs: [
      { label: 'Reference Volume', value: '100 mL borosilicate glass (rigid GL45)' },
      { label: 'Capillary Material', value: 'Chromatography-grade PEEK, 1/16" OD' },
      { label: 'Capillary Dimensions', value: '247 mm length × 0.30 mm bore' },
      { label: 'Acoustic Resistance (Ra)', value: '2.25 × 10¹⁰ Pa·s/m³' },
      { label: 'Acoustic Compliance (Ca)', value: '7.05 × 10⁻¹⁰ m³/Pa' }
    ]
  },
  {
    num: '03',
    title: 'Sallen-Key Active Low-Pass',
    mechanism: 'ELECTRICAL',
    actsOn: 'Frequency Domain',
    rejects: 'High-frequency acoustic & EMI noise > 25 Hz',
    cutoff: 'fc = 25 Hz (-40 dB/decade roll-off)',
    tagColor: 'var(--signal)',
    formula: 'f_c = \\frac{1}{2\\pi \\sqrt{R_1 R_2 C_1 C_2}}, \\quad Q = 0.707',
    summary: 'A 2nd-order active Butterworth filter provides maximally flat in-band response while attenuating fold-over frequencies before digitization.',
    physicsRationale: 'Content above the Nyquist frequency (500 Hz at 1000 SPS) permanently folds into the infrasound band if not suppressed prior to sampling. Butterworth alignment guarantees zero passband ripple, preserving calibration integrity across 0.01–20 Hz with ≈52 dB attenuation at 500 Hz.',
    physicalSpecs: [
      { label: 'Topology', value: '2nd-order Sallen-Key Butterworth' },
      { label: 'Op-Amp IC', value: 'OPA2333 zero-drift chopper' },
      { label: 'Passband Gain', value: '1.586 (+4.0 dB)' },
      { label: 'Passive Values', value: 'R1=R2=63.4 kΩ (0.1%), C1=C2=100 nF (C0G/film)' },
      { label: 'Reference Return', value: 'Buffered 2.5 V mid-rail (prevents DC clipping)' }
    ]
  }
];

export const SIGNAL_CHAIN_STAGES: SignalChainStage[] = [
  {
    id: 'stage-1',
    step: 1,
    name: 'Spatial Collector',
    component: '4-Arm Wind Rosette',
    gain: '1.0×',
    gainDb: '0.0 dB',
    fc: '86 Hz res',
    role: 'Coherent Infrasound Summation',
    technicalDetails: 'Four 1.0 m arms (6–8 mm ID) feed a central summing chamber. Spatially averages ambient pressure fields, providing 6 dB incoherent wind noise rejection while constructively summing planar waves.',
    schematicDetails: [
      'Four 1000 mm × 7 mm ID tubes connected in star topology',
      'Central manifold volume < 30 mL',
      'Sintered 20–40 µm polypropylene inlet covers'
    ]
  },
  {
    id: 'stage-2',
    step: 2,
    name: 'Transducer & Bridge',
    component: 'All Sensors MLV-L01D-E1BD-N',
    gain: '28.1 µV/Pa',
    gainDb: 'Transducer',
    fc: 'DC to 2 kHz',
    role: 'Differential Pressure to Millivolts',
    technicalDetails: 'Raw piezoresistive Wheatstone bridge based on CoBeam² micro-machined die. Port A receives ambient signal; Port B couples to sealed 100 mL borosilicate volume via 247 mm PEEK capillary.',
    schematicDetails: [
      '5.0 V ultra-low-noise excitation from TPS7A4700 linear LDO',
      'Bridge output impedance: 3 kΩ typical, input impedance: 12 kΩ',
      'Zero-pressure offset: ±500 µV; temp shift: ±250 µV (0–50 °C)'
    ],
    headroomNotes: 'Raw bridge eliminates 11-bit ASIC quantization limits (0.24 Pa floor in earlier ELVH parts).'
  },
  {
    id: 'stage-3',
    step: 3,
    name: 'Instrumentation Amp',
    component: 'INA333 Zero-Drift',
    gain: '100×',
    gainDb: '40.0 dB',
    fc: 'Broadband',
    role: 'Primary Differential Amplification',
    technicalDetails: 'Extracts microvolt differential pressure signal atop 2.5 V common-mode bridge pedestal. On-die laser-trimmed thin-film resistors deliver >100 dB CMRR. Gain set by single precision resistor.',
    schematicDetails: [
      'Gain setting resistor Rg = 1.02 kΩ (0.1%, 25 ppm/°C)',
      'Differential input filter: 1 kΩ series each input + 1 nF differential cap',
      'REF pin driven by low-impedance buffered 2.5 V rail (OPA2333 follower)'
    ],
    headroomNotes: 'Gain capped strictly at 100 to prevent ±750 µV offset and drift from railing the 5 V single supply.'
  },
  {
    id: 'stage-4',
    step: 4,
    name: 'AC Coupling High-Pass',
    component: '22 µF Film + 1.5 MΩ Shunt',
    gain: '1.0×',
    gainDb: '0.0 dB',
    fc: '4.8 mHz',
    role: 'Bridge Offset Stripping & Baseline Centering',
    technicalDetails: 'Strips the amplified bridge DC offset (up to ±75 mV) and low-frequency thermal drift before secondary gain. Shunt resistor returns to buffered 2.5 V pedestal to prevent negative rail clipping.',
    schematicDetails: [
      'Capacitor: 22 µF non-electrolytic polypropylene film (zero leakage)',
      'Shunt Resistor: 1.5 MΩ metal film (0.1%) tied to buffered 2.5 V',
      'Corner frequency: 1 / (2π · 1.5MΩ · 22µF) = 4.82 mHz (-0.9 dB at 0.01 Hz)'
    ],
    headroomNotes: 'Film dielectric mandatory: electrolytic leakage current would create significant DC voltage drops across 1.5 MΩ.'
  },
  {
    id: 'stage-5',
    step: 5,
    name: 'Secondary Gain Stage',
    component: 'OPA2333 Non-Inverting',
    gain: '9.45×',
    gainDb: '19.5 dB',
    fc: 'Passband',
    role: 'Intermediate Voltage Scaling',
    technicalDetails: 'Non-inverting configuration presents ultra-high input impedance, avoiding resistive loading on the preceding 1.5 MΩ coupling network. Feedback resistor Rg returns to buffered 2.5 V.',
    schematicDetails: [
      'Feedback loop: Rf = 8.45 kΩ (0.1%), Rg = 1.00 kΩ (0.1%)',
      'Theoretical gain: 1 + (8.45 / 1.00) = 9.45×',
      'Rg tied to buffered 2.5 V so only deviations from mid-rail are amplified'
    ],
    headroomNotes: 'DC operating point verified at 2.4999 V in LTspice simulation.'
  },
  {
    id: 'stage-6',
    step: 6,
    name: 'Anti-Aliasing Filter',
    component: 'OPA2333 Sallen-Key',
    gain: '1.586×',
    gainDb: '4.0 dB',
    fc: '25 Hz',
    role: 'Butterworth Active Low-Pass',
    technicalDetails: '2nd-order Sallen-Key low-pass filter with maximally flat passband (Q = 0.707). Provides 40 dB/decade roll-off, yielding ≈52 dB attenuation at the 500 Hz ADC Nyquist boundary.',
    schematicDetails: [
      'R1 = R2 = 63.4 kΩ (0.1%, 25 ppm/°C)',
      'C1 = C2 = 100 nF (C0G/film, non-microphonic)',
      'Rf = 5.9 kΩ, Rg = 10 kΩ (sets Q = 0.707 and stage gain to 1.586×)',
      'Rg returns to buffered 2.5 V reference'
    ],
    headroomNotes: 'DC operating point simulated at 2.4969 V, preserving symmetrical ±2.11 V swing for ±50 Pa signals.'
  },
  {
    id: 'stage-7',
    step: 7,
    name: 'Digitizer & Decimation',
    component: 'ADS1256 + STM32 MCU',
    gain: 'ADC 24-bit',
    gainDb: 'Digital',
    fc: '50 Hz output',
    role: 'Differential Delta-Sigma Sampling & FIR Decimation',
    technicalDetails: 'ADS1256 measures AIN0 (stage 6 output) differentially against AIN1 (buffered 2.5 V reference) using an ultra-stable external ADR443 3.0 V reference. Sampled at 1000 SPS, then 20:1 FIR decimated to 50 Hz.',
    schematicDetails: [
      'Differential input rejects common-mode 2.5 V pedestal entirely',
      'ADR443 3.0 V precision reference (3 ppm/°C drift)',
      '20:1 software linear-phase FIR decimation filter executing on STM32 with DMA'
    ],
    headroomNotes: 'Quantization noise contribution is 0.57 mPa RMS, ≈ 14× below the analog noise floor.'
  }
];

export const NOISE_BUDGET_CONTRIBUTORS: NoiseContributor[] = [
  {
    source: 'INA333 Input Voltage Noise',
    rtiDensity: '50.0 nV/√Hz',
    noisePaRms: 7.95,
    powerPercentage: 96.9,
    significance: 'Primary Noise Floor Limit',
    isDominant: true
  },
  {
    source: 'MLV Bridge Thermal Noise (3 kΩ)',
    rtiDensity: '7.0 nV/√Hz',
    noisePaRms: 1.12,
    powerPercentage: 1.9,
    significance: 'Fundamental Sensor Physics Limit'
  },
  {
    source: 'INA333 Gain Resistor Rg (1.02 kΩ)',
    rtiDensity: '4.1 nV/√Hz',
    noisePaRms: 0.65,
    powerPercentage: 0.6,
    significance: 'Johnson-Nyquist Resistor Noise'
  },
  {
    source: 'ADS1256 Quantization & Thermal',
    rtiDensity: 'Converted at PGA=1',
    noisePaRms: 0.57,
    powerPercentage: 0.5,
    significance: 'Digitizer Noise Floor (14× below analog)'
  },
  {
    source: 'Stage 4 OPA2333 Second Amp',
    rtiDensity: '0.55 nV/√Hz (RTI)',
    noisePaRms: 0.087,
    powerPercentage: 0.01,
    significance: 'Suppressed 100× by Stage 2 Gain'
  },
  {
    source: 'AC Coupling Resistor (1.5 MΩ)',
    rtiDensity: '0.04 nV/√Hz (in-band)',
    noisePaRms: 0.006,
    powerPercentage: 0.001,
    significance: 'Capacitively shunted to source at >0.01 Hz'
  },
  {
    source: 'Sallen-Key Filter Resistors',
    rtiDensity: '0.017 nV/√Hz (RTI)',
    noisePaRms: 0.003,
    powerPercentage: 0.0001,
    significance: 'Negligible RTI contribution'
  }
];

export const HARDWARE_BLOCKS_SPECS: HardwareBlockSpec[] = [
  {
    blockId: 'block-a',
    blockTitle: 'Block (a) — Pressure Sensing Mechanism',
    parameters: [
      { param: 'Transducer Part Number', value: 'All Sensors MLV-L01D-E1BD-N' },
      { param: 'Architecture', value: 'Piezoresistive MEMS, proprietary CoBeam² die' },
      { param: 'Measurement Range', value: '±1 inH₂O (±249 Pa), bidirectional differential' },
      { param: 'Output Format', value: 'Raw unamplified Wheatstone bridge (no internal ASIC)' },
      { param: 'Nominal Span', value: '7.0 mV typical at 5.0 V excitation (min 6, max 8 mV)' },
      { param: 'Bridge Sensitivity', value: '28.1 µV/Pa (one-sided span interpretation)' },
      { param: 'Excitation Voltage', value: '5.0 V DC (linear low-noise rail)' },
      { param: 'Impedances', value: '3 kΩ output typ, 12 kΩ input typ' },
      { param: 'Factory Compensation', value: '0 – 50 °C temperature compensated' },
      { param: 'Zero Offset Spec', value: '±500 µV at zero differential pressure' },
      { param: 'Port Assignment', value: 'Port A → Atmosphere (via Rosette); Port B → Sealed 100 mL Reference' },
      { param: 'Signal Polarity', value: 'Datasheet positive on Port B; atmospheric rise on Port A yields negative-going voltage' }
    ],
    architecturalDecisions: [
      {
        decision: 'Rejection of ELVH-L01D ASIC Digital Sensor',
        reasoning: 'The ELVH series derives its analog output from an internal 11-bit ADC, imposing a permanent quantization floor of 0.24 Pa. That information loss is mathematically irreversible. Choosing the raw-bridge MLV sensor unlocks the custom low-noise analog chain, achieving an 8.07 mPa RMS noise floor (30× superior resolution).'
      },
      {
        decision: 'True Differential Bridge vs Single-Ended',
        reasoning: 'A single-ended sensor removes common-mode voltage, eliminating the advantage of high-CMRR instrumentation amplifiers. The MLV Wheatstone bridge provides true differential polarity, allowing the INA333 to reject 2.5 V common-mode noise by >100 dB.'
      },
      {
        decision: 'External Port Protection Filter',
        reasoning: 'Parylene moisture barrier coating is unavailable on low-range sensors below ±10 inH₂O. A 20–40 µm sintered polypropylene filter disc is installed directly at the Port A manifold entry to prevent particulate contamination without adding acoustic resistance.'
      }
    ]
  },
  {
    blockId: 'block-b',
    blockTitle: 'Block (b) — Mechanical Transducer Manifold',
    parameters: [
      { param: 'Material & Construction', value: '3D-printed PETG with epoxy/cyanoacrylate internal cavity seal wash' },
      { param: 'Envelope Dimensions', value: '35 mm × 35 mm × 45 mm compact block' },
      { param: 'Sensor Pocket', value: '19 mm × 13 mm, 12 mm deep (fits 16.0 × 9.8 mm DIP body with 1.5 mm tolerance)' },
      { param: 'Internal Channel Bore', value: '2.0 – 3.0 mm smooth bore, <20 mm individual length' },
      { param: 'Minimum Wall Thickness', value: '3.0 mm (airtightness specification preventing FDM inter-layer leaks)' },
      { param: 'Port B Dead Volume', value: '< 2.0 mL total (<2% shift of the 100 mL reference compliance)' },
      { param: 'Sensor Mating Seal', value: 'Nitrile/Silicone O-ring compressed at pocket perimeter' }
    ],
    architecturalDecisions: [
      {
        decision: '3 mm Wall Thickness as Airtightness Specification',
        reasoning: 'Standard structural requirements would only require 1.2 mm, but FDM layer boundaries leak micro-scale air paths under differential pressures. 3 mm forces air to navigate dozens of fused perimeter shells, ensuring hermetic containment.'
      },
      {
        decision: 'Channel Bore Optimization (2–3 mm)',
        reasoning: 'Bore must be large enough that channel acoustic resistance is negligible against the capillary (2.25 × 10¹⁰ Pa·s/m³), yet small enough to constrain internal dead volume to <2 mL, keeping corner frequency drift under 2%.'
      },
      {
        decision: 'Removable 10-32 Coned PEEK Ferrules',
        reasoning: 'PEEK has low surface energy, making glued joints prone to micro-leaks over time. Coned mechanical compression ferrules provide leak-free high-pressure sealing while allowing capillary length adjustments during calibration.'
      }
    ]
  },
  {
    blockId: 'block-c-f',
    blockTitle: 'Blocks (c) & (f) — Differential Pressure & Equalization',
    parameters: [
      { param: 'Reference Chamber Volume', value: '100 mL round laboratory-grade borosilicate bottle (GL45)' },
      { param: 'Capillary Tube Spec', value: 'Chromatography-grade PEEK, 247 mm length × 0.30 mm ID × 1/16" OD' },
      { param: 'Acoustic Resistance (Ra)', value: '2.25 × 10¹⁰ Pa·s/m³ (calculated via Poiseuille flow)' },
      { param: 'Acoustic Compliance (Ca)', value: '7.05 × 10⁻¹⁰ m³/Pa (calculated via adiabatic bulk modulus)' },
      { param: 'Acoustic Time Constant (τ)', value: '15.9 seconds (Ra × Ca)' },
      { param: 'Acoustic Corner Frequency', value: 'fc = 1 / (2π · 15.9 s) = 0.0100 Hz' },
      { param: 'Equilization Settling Time', value: '5τ ≈ 80 seconds ("The 80-Second Calibration Constraint")' }
    ],
    architecturalDecisions: [
      {
        decision: 'Borosilicate Glass over Plastic Enclosures',
        reasoning: 'Wall flex under pressure changes creates parasitic mechanical compliance in parallel with acoustic compliance Ca, shifting the corner frequency unpredictably. Heavy borosilicate glass is completely rigid at sub-pascal pressures, impermeable to gas diffusion, and offers low thermal expansion.'
      },
      {
        decision: 'Tuning by Capillary Length, Not Diameter',
        reasoning: 'Poiseuille resistance scales with L / r⁴. A minor 10% tolerance in internal bore causes a 46% error in acoustic resistance. Length scales strictly linearly (10% error = 10% change) and can be trimmed to sub-millimeter precision.'
      }
    ]
  },
  {
    blockId: 'block-d',
    blockTitle: 'Block (d) — Low-Noise Analog Front End & Power',
    parameters: [
      { param: 'Stage 2 Component', value: 'INA333 Zero-Drift Instrumentation Amp (Gain = 100, 40.0 dB)' },
      { param: 'Stage 3 AC Coupling', value: '22 µF Film Capacitor + 1.5 MΩ Shunt (fc = 4.8 mHz, 0.0 dB)' },
      { param: 'Stage 4 Component', value: 'OPA2333 Non-Inverting Op-Amp (Gain = 9.45, 19.5 dB)' },
      { param: 'Stage 5 Anti-Alias', value: 'OPA2333 2nd-Order Sallen-Key Butterworth (fc = 25 Hz, Gain = 1.586, 4.0 dB)' },
      { param: 'Total Analog Gain', value: '1499× (63.5 dB composite voltage gain)' },
      { param: 'Full-Scale Dynamic Range', value: '±50 Pa design point = ±2.11 V swing on 2.5 V pedestal' },
      { param: 'DC Headroom Margins', value: '0.40 V to positive 5 V rail, 0.40 V to ground rail' },
      { param: 'LTspice DC Operating Points', value: 'Stage 4 U1 output = 2.4999 V; Stage 5 U2 output = 2.4969 V' },
      { param: 'Power Source', value: '2S Li-ion Battery Pack (7.4 V nominal, ≥3000 mAh) or bench linear supply' },
      { param: 'Linear Regulators', value: '3 separate LDOs: TPS7A4700 (Sensor 5V), TPS7A4700/ADM7150 (Analog 5V), AMS1117 (ADC/MCU)' },
      { param: 'Grounding Topology', value: 'Star ground at single battery negative terminal; analog/digital split planes' }
    ],
    architecturalDecisions: [
      {
        decision: 'Split Gain Architecture with Intermediate AC Coupling',
        reasoning: 'The raw bridge sensor exhibits up to ±750 µV combined offset and thermal drift, comparable to the entire ±1.4 mV signal at ±50 Pa. Applying full 1500× gain in a single stage would amplify the offset to ±1.12 V, slamming into rails on dynamic inputs. Splitting the gain (100× then AC coupling then 15×) strips the DC pedestal safely.'
      },
      {
        decision: 'Buffered 2.5 V Virtual Mid-Rail Reference',
        reasoning: 'On a single 5.0 V supply, referencing feedback resistors to ground would amplify the 2.5 V DC pedestal by stage gain, immediately saturating the amplifiers. Grounding the coupling resistor would clip negative signal halves. Referencing to a low-impedance buffered 2.5 V mid-rail allows symmetrical bipolar AC amplification.'
      },
      {
        decision: 'Pure Linear Regulation Architecture',
        reasoning: 'Switching converters inject high-frequency harmonic ripple that couples directly into high-impedance microvolt traces. Three dedicated linear regulators isolate pulsed digital sampling currents from the quiet sensor excitation and pre-amp rails.'
      }
    ]
  },
  {
    blockId: 'block-e',
    blockTitle: 'Block (e) — Precision Temperature Compensation',
    parameters: [
      { param: 'Temperature Sensor IC', value: 'Texas Instruments TMP117 (±0.1 °C absolute accuracy, 16-bit I²C)' },
      { param: 'Placement Location', value: 'Mounted directly inside the manifold, within 5 mm of MLV silicon die' },
      { param: 'Characterization Profile', value: '0 °C to 50 °C thermal sweep in 10 °C increments' },
      { param: 'Chamber Dwell Period', value: '15 – 20 minutes per step (permits 100 mL gas volume thermal equilibrium)' },
      { param: 'Firmware Algorithm', value: '2nd-order least-squares polynomial compensation (V_corr = V_raw - [a·T² + b·T + c])' },
      { param: 'Residual Drift Target', value: 'Post-compensation thermal drift < 8.07 mPa noise floor across 0–50 °C' }
    ],
    architecturalDecisions: [
      {
        decision: 'Internal Die-Adjacent Sensor Mounting',
        reasoning: 'Mounting the temperature sensor on the main electronics PCB measures the ambient electronics bay rather than the sealed gas reference cavity, creating phase lag and self-heating error. Placing TMP117 inside the manifold accurately mirrors reference cavity temperature.'
      },
      {
        decision: '2nd-Order Polynomial Model Selection',
        reasoning: 'A 6-point calibration profile gives 3 degrees of freedom for a quadratic model. Higher-order polynomials (e.g. cubics) overfit measurement noise. The physics—ideal gas expansion (linear), resistor tempco (linear), and dynamic air viscosity (mild curvature)—supports a 2nd-order equation.'
      }
    ]
  },
  {
    blockId: 'block-g',
    blockTitle: 'Block (g) — Dual-Chamber Environmental Enclosure',
    parameters: [
      { param: 'Outer Enclosure Rating', value: 'IP66 weather-sealed ABS/Polycarbonate with continuous silicone gasket' },
      { param: 'External Dimensions', value: '100 mm × 100 mm × 235 mm vertical pillar form-factor' },
      { param: 'Acoustic Chamber Isolation', value: 'Hermetically sealed, lined with 15–20 mm closed-cell EPDM/PE foam' },
      { param: 'Vibration Decoupling', value: 'Borosilicate bottle and PETG manifold mounted on elastomeric foam isolators' },
      { param: 'Electronics Bay Venting', value: 'Vented via waterproof Gore-style ePTFE membrane vent (equalizes case pressure)' },
      { param: 'Moisture Scavenging', value: '5 – 10 g regenerative silica desiccant pack in electronics bay' },
      { param: 'Inter-Chamber Feedthrough', value: 'Epoxy-potted hermetic wire gland (zero pneumatic communication)' }
    ],
    architecturalDecisions: [
      {
        decision: 'The Two-Compartment Design Tension',
        reasoning: 'The acoustic reference cavity must be hermetically isolated from ambient air (any auxiliary vent ruins acoustic resistance Ra). Conversely, the electronics bay must be pressure-vented to prevent thermal cycling from stressing PCB solder joints and sucking moisture through cable glands. Dual isolated compartments satisfy both criteria simultaneously.'
      },
      {
        decision: 'Thermal Buffering via Closed-Cell Foam',
        reasoning: 'The 15–20 mm foam does not stop temperature changes, but drastically dampens the thermal slew rate (dT/dt) entering the 100 mL gas volume, allowing the firmware polynomial to track equilibrium temperatures smoothly.'
      }
    ]
  },
  {
    blockId: 'block-h',
    blockTitle: 'Block (h) — Wind-Noise Reduction Rosette',
    parameters: [
      { param: 'Array Topology', value: '4-arm symmetric cross rosette array' },
      { param: 'Arm Length (L)', value: '1.0 meter per arm (2.0 m total ground diameter)' },
      { param: 'Internal Bore', value: '6 – 8 mm smooth interior flexible UV-stabilized polyurethane' },
      { param: 'Organ Pipe Resonance', value: 'f_res = c / (4L) = 343 / (4 · 1.0) = 85.75 Hz' },
      { param: 'Separation from Band Edge', value: '85.75 Hz / 20 Hz = 4.29× safety margin above passband' },
      { param: 'Summing Manifold', value: 'Star manifold combining 4 ports to single 0.3 m feed to Port A' },
      { param: 'Arm Length Tolerance', value: '±2 mm matching between all four arms (prevents phase skew)' }
    ],
    architecturalDecisions: [
      {
        decision: '1.0 Meter Arm Length Selection over 2.0 Meters',
        reasoning: 'While a 2.0 m arm improves spatial wind averaging, its fundamental organ-pipe resonance drops to 42.9 Hz, leaving its resonant skirt dangerously close to the 20 Hz passband edge. 1.0 m places resonance at 86 Hz (>4× above band), eliminating acoustic peaking.'
      },
      {
        decision: 'Strict Arm Length Symmetry',
        reasoning: 'Unequal arm lengths introduce differential acoustic propagation delays, causing destructive interference of high-frequency infrasound signals. Matching lengths within 2 mm ensures in-phase coherent acoustic summation.'
      }
    ]
  }
];

export const CALIBRATION_STEPS_DATA: CalibrationStep[] = [
  {
    id: 'cal-proc-1',
    num: '01',
    name: 'Sensitivity Estimation & Time Constant Extraction',
    deliverable: 'Deliverable (d)',
    objective: 'Measure end-to-end electrical sensitivity (mV/Pa) and validate acoustic corner τ.',
    method: 'Primary method: Pressurize the sealed reference side (Port B) rather than Port A; since capillary is the only bleed path, an external pressure controller maintains differential indefinitely. Cross-check: Apply fast step to Port A and record exponential decay curve back to baseline.',
    formulaOrSetup: 'V_{out}(t) = V_0 \\cdot e^{-t / \\tau} + V_{offset}, \\quad \\tau = 15.9\\text{ s}',
    reportingOutput: 'Linearity curve across ±50 Pa with residual errors; fitted sensitivity in mV/Pa and counts/Pa; fitted τ verifying absence of manifold leaks.',
    paradoxMitigation: 'The 80-Second Problem: Standard static manometers bleed away in 5τ ≈ 80 s. Pressurizing the reference side enables steady-state measurements.'
  },
  {
    id: 'cal-proc-2',
    num: '02',
    name: 'System Noise Floor & Power Spectral Density',
    deliverable: 'Deliverable (c)',
    objective: 'Measure equivalent RMS pressure noise floor across 0.01 – 20 Hz band.',
    method: 'Acoustically cap all manifold ports in a quiet basement environment. Record continuous time series at 1000 SPS for 2 hours. Compute PSD via Welch’s method with Hanning windowing and 50% overlap. Integrate across 0.01 – 20 Hz.',
    formulaOrSetup: 'P_{RMS} = \\sqrt{\\int_{0.01}^{20} S_{pp}(f) \\, df} \\quad \\text{[Computed Budget: } 8.07\\text{ mPa RMS]}',
    reportingOutput: 'PSD plot (Pa²/Hz vs Hz), integrated RMS pressure, comparison of empirical floor against theoretical 8.07 mPa budget.',
    paradoxMitigation: 'Confirms that INA333 dominates noise (96.9% power) and ADC sits 14× below analog floor.'
  },
  {
    id: 'cal-proc-3',
    num: '03',
    name: 'Three-Corner Frequency Response Verification',
    deliverable: 'Deliverable (b)',
    objective: 'Empirically verify all three design corner frequencies: 4.8 mHz, 0.01 Hz, 25 Hz.',
    method: 'Split measurement: Characterize electrical filter corners (4.8 mHz AC coupling & 25 Hz Sallen-Key) via synthesized microvolt signal injection at pre-amp inputs. Extract acoustic corner (0.01 Hz) from Procedure 1 step-decay exponential fit.',
    formulaOrSetup: 'f_{c1}=4.8\\text{ mHz (elec)}, \\; f_{c2}=0.010\\text{ Hz (acoust)}, \\; f_{c3}=25.0\\text{ Hz (elec)}',
    reportingOutput: 'Bode magnitude and phase plot spanning 1 mHz to 100 Hz showing -3 dB points and -40 dB/dec roll-off slope.',
    paradoxMitigation: 'Avoids spending 10+ hours taking discrete sub-millihertz acoustic frequency points in an acoustic chamber.'
  },
  {
    id: 'cal-proc-4',
    num: '04',
    name: 'Thermal Drift & Stability Characterization',
    deliverable: 'Deliverable (e)',
    objective: 'Demonstrate 2nd-order polynomial firmware compensation across natural diurnal cycles.',
    method: 'Run continuous 24–72 hour data logging on a bench linear power supply. Log raw pressure voltage alongside internal TMP117 temperature during natural day/night thermal cycling (15–35 °C). Apply compensation polynomial in real time.',
    formulaOrSetup: 'P_{corrected} = P_{raw} - (a\\cdot T^2 + b\\cdot T + c)',
    reportingOutput: 'Tri-trace time series: Raw output, Manifold Temperature, and Corrected output. Drift reduction factor and residual RMS drift.',
    paradoxMitigation: 'Shows baseline stability holding flat within noise floor despite dramatic ambient temperature excursions.'
  },
  {
    id: 'cal-proc-5',
    num: '05',
    name: 'Dynamic 1 Hz Detection Demonstration & SNR',
    deliverable: 'Deliverable (a)',
    objective: 'Demonstrate detection threshold and spectral SNR at 1.0 Hz test frequency.',
    method: 'Drive a calibrated acoustic sub-woofer chamber at 1.0 Hz across four distinct amplitudes: 10 Pa, 1.0 Pa, 0.1 Pa, and down to the detection threshold (≈8 mPa). Record waveform and compute FFT.',
    formulaOrSetup: '\\text{SNR} = 20 \\log_{10} \\left( \\frac{V_{signal, RMS}}{V_{noise, RMS}} \\right)',
    reportingOutput: 'Time-domain waveforms, FFT power spectra demonstrating sharp 1 Hz spectral line above floor, and minimum detectable signal limit.',
    paradoxMitigation: 'Proves practical detection capability at sub-pascal levels where time-domain signals are submerged in noise.'
  }
];

export const OPEN_ENGINEERING_ITEMS: OpenEngineeringItem[] = [
  {
    priority: 'High',
    block: 'Block (a)',
    item: 'Manufacturer confirmation of the span convention (one-sided vs differential)',
    impact: 'Determines whether raw sensitivity is 28.1 µV/Pa or 56.2 µV/Pa. Resolved empirically via Procedure 1 calibration.',
    status: 'In Review'
  },
  {
    priority: 'High',
    block: 'Block (d)',
    item: 'ADC effective resolution formal derivation (ENOB / noise-density basis at PGA=1)',
    impact: 'Validates that digitizer floor stays safely 14× below the analog INA333 noise floor.',
    status: 'Verified in Simulation'
  },
  {
    priority: 'Medium',
    block: 'Block (d)',
    item: 'STM32 FIR decimation filter order, window selection, and stopband attenuation',
    impact: 'Guarantees zero phase distortion in 0.01–20 Hz passband and >60 dB alias suppression.',
    status: 'In Review'
  },
  {
    priority: 'Medium',
    block: 'Block (i)',
    item: 'Verify INA333 50 nV/√Hz noise density holds flat down to 0.01 Hz from datasheet 1/f plot',
    impact: 'Theoretical 8.07 mPa RMS floor rests directly on chopper stabilization eliminating 1/f flicker.',
    status: 'Verified in Simulation'
  },
  {
    priority: 'Medium',
    block: 'Block (g)',
    item: 'Specify external capillary vent termination and aerodynamic wind shielding',
    impact: 'Prevents localized wind gusts across capillary orifice from injecting pressure spikes into reference cavity.',
    status: 'Pending Build Phase'
  },
  {
    priority: 'Medium',
    block: 'Block (b)',
    item: 'Confirm E1BD (DIP 8-pin) versus E1BS (SIP 4-pin) package lead exit in manifold',
    impact: 'Ensures printed manifold lead exit geometry matches final procurement order.',
    status: 'In Review'
  },
  {
    priority: 'Low',
    block: 'Block (d)',
    item: 'PCB layout guard-ring and 1.5 MΩ high-impedance trace shielding specification',
    impact: 'Prevents micro-ampere surface board leakage from shifting DC mid-rail operating point.',
    status: 'Verified in Simulation'
  },
  {
    priority: 'Low',
    block: 'Block (b)',
    item: 'Diaphragm mechanical resonance sine-sweep verification (>2 kHz expectation)',
    impact: 'Ensures mechanical sensor resonance does not interfere with acoustic signal band.',
    status: 'Pending Build Phase'
  }
];

export const TEAM_MEMBERS_DATA: TeamMember[] = [
  {
    name: 'Bejeish P B',
    role: 'Team Lead & Systems Architect',
    focus: 'Signal chain budgeting, end-to-end integration, LTspice modeling, and systems engineering.',
    subsystem: 'Overall Architecture & Systems',
    avatarInitials: 'BP'
  },
  {
    name: 'Kaushik R',
    role: 'Analog Hardware Engineer',
    focus: 'Low-noise preamplifier design, INA333/OPA2333 staging, power supply LDO isolation, and PCB design.',
    subsystem: 'Analog Front End & PCB',
    avatarInitials: 'KR'
  },
  {
    name: 'Hariharan C',
    role: 'Embedded Firmware Developer',
    focus: 'STM32 SPI driver with DMA, ADS1256 digitizer interfacing, linear-phase FIR decimation, and TMP117 calibration math.',
    subsystem: 'Firmware & DSP',
    avatarInitials: 'HC'
  },
  {
    name: 'Joel Joseph Cherian',
    role: 'Mechanical & Acoustic Designer',
    focus: '4-arm spatial rosette tuning, 3D PETG manifold fluid dynamics, borosilicate reference cavity, and IP66 enclosure.',
    subsystem: 'Acoustics & Mechanical',
    avatarInitials: 'JC'
  },
  {
    name: 'Dhanyasri M',
    role: 'Data Processing & Calibration Specialist',
    focus: '2nd-order polynomial thermal compensation modeling, PSD spectral estimation, and 5-stage calibration execution.',
    subsystem: 'Calibration & Algorithms',
    avatarInitials: 'DM'
  },
  {
    name: 'Riddhi Khandelwal',
    role: 'UI/UX & Documentation Lead',
    focus: 'Real-time oscilloscope visualization, technical reporting architecture, SIH compliance, and evaluation deliverables.',
    subsystem: 'Documentation & Interface',
    avatarInitials: 'RK'
  }
];
