import {
  ComplianceParameter,
  SystemHeadlineMetric,
  SignalChainStage,
  FilterMechanism,
  NoiseContributor,
  HardwareBlockSpec,
  CalibrationStep,
  TeamMember,
  OpenEngineeringItem
} from '../types';

export const COMPLIANCE_PARAMETERS: ComplianceParameter[] = [
  {
    parameter: 'Frequency band',
    target: '0.01 to 20 Hz',
    ourDesign: '-3.0 dB at 0.01 Hz and -1.5 dB at 20 Hz, flat in between',
    status: 'Met at -3 dB points',
    isMet: true,
    notes: 'Acoustic corner at 7.9 mHz + 4.8 mHz AC coupling sets lower edge; Sallen-Key 25.1 Hz sets upper edge.'
  },
  {
    parameter: 'Pressure sensitivity',
    target: '20 mV/Pa',
    ourDesign: '19.99 mV/Pa nominal differential (trimmed to 20.0 mV/Pa per unit)',
    status: 'Met after per-unit trim',
    isMet: true,
    notes: '9.99 mV/Pa per leg (single-ended); trimmed via stage-4 feedback resistor Rf.'
  },
  {
    parameter: 'Pressure resolution',
    target: 'Better than 0.05 Pa',
    ourDesign: '2.34 mPa RMS electronic noise floor (0.01 to 20 Hz)',
    status: 'Met with ~21× margin',
    isMet: true,
    notes: 'Equivalent to 0.52 mPa/√Hz; INA188 zero-drift instrumentation amp brings floor down from 8 mPa to 2.34 mPa.'
  },
  {
    parameter: 'Output voltage range',
    target: 'Max 24 V p-p',
    ourDesign: '±4.8 V differential (9.6 V p-p)',
    status: 'Met',
    isMet: true,
    notes: 'Differential drive allows full use of ±240 Pa range on single 5 V supply without exceeding limits.'
  },
  {
    parameter: 'Dynamic range',
    target: '> 100 dB',
    ourDesign: '100.2 dB (full-scale peak to RMS floor); 97.2 dB (full-scale RMS sine)',
    status: 'Borderline / Met',
    isMet: true,
    notes: 'At ±240 Pa vs 2.34 mPa floor; limit stems from sensor element range, not electronics.'
  },
  {
    parameter: 'Sampling rate',
    target: '≥ 50 Hz',
    ourDesign: '100 samples/s output (1000 samples/s raw)',
    status: 'Met',
    isMet: true,
    notes: 'ADS1256 samples at 1000 SPS; STM32 10:1 linear-phase FIR decimation yields 100 SPS output.'
  },
  {
    parameter: 'Compatibility',
    target: '24-bit digitizer',
    ourDesign: 'Onboard 24-bit ADS1256; ±4.8 V diff analog out also suits external digitizers',
    status: 'Met',
    isMet: true,
    notes: 'Complete autonomous digitizer subsystem onboard; streams miniSEED directly via USB.'
  }
];

export const SYSTEM_HEADLINE_METRICS: SystemHeadlineMetric[] = [
  {
    id: 'band',
    value: '0.01 – 20',
    unit: 'Hz',
    label: 'Measurement Band',
    description: '-3.0 dB at 0.01 Hz and -1.5 dB at 20 Hz, maximally flat passband.',
    category: 'band'
  },
  {
    id: 'system_sens',
    value: '20.0',
    unit: 'mV/Pa',
    label: 'Differential Sensitivity',
    description: '19.99 mV/Pa nominal, trimmed to 20.0 mV/Pa per unit (9.99 mV/Pa per leg).',
    category: 'sensitivity'
  },
  {
    id: 'noise_floor',
    value: '2.34',
    unit: 'mPa RMS',
    label: 'Computed Noise Floor',
    description: '0.52 mPa/√Hz over 20 Hz band. Exceeds 0.05 Pa target with 21× margin.',
    category: 'noise'
  },
  {
    id: 'total_gain',
    value: '711.2 (57.0 dB)',
    unit: 'Diff V/V',
    label: 'Total Analog Gain',
    description: '355.6× single-ended (51.0 dB), doubled to 711.2× via unity inverter differential drive.',
    category: 'gain'
  },
  {
    id: 'time_constant',
    value: '20.2',
    unit: 's',
    label: 'Acoustic Time Constant (τ)',
    description: '100 mL borosilicate bottle + trimmed PEEK capillary (acoustic corner 7.9 mHz).',
    category: 'acoustic'
  },
  {
    id: 'working_range',
    value: '±240',
    unit: 'Pa',
    label: 'Operating Working Range',
    description: 'Uses 96% of sensor ±249 Pa range, producing ±4.8 V differential (9.6 V p-p) swing.',
    category: 'operating'
  }
];

export const THREE_FILTERS_DATA: FilterMechanism[] = [
  {
    num: '01',
    title: 'Spatial Coherence Rosette',
    mechanism: 'MECHANICAL',
    actsOn: 'Spatial Coherence',
    rejects: 'Incoherent wind turbulence & micro-eddies',
    cutoff: 'c/4L ≈ 61 Hz resonance',
    tagColor: 'var(--signal)',
    formula: '\\text{SNR}_{\\text{gain}} = 10 \\log_{10}(N) = 6.02\\text{ dB} \\quad (\\text{for } N=4)',
    summary: 'Four 1.0 m arms (6–8 mm ID) sum coherent infrasound wavefronts while averaging out random turbulent wind eddies.',
    physicsRationale: 'Wind noise and infrasound share the exact same 0.01–20 Hz frequencies, making frequency-domain electrical filters incapable of separating them. What differs is spatial coherence: turbulence fluctuates point-to-point over a meter, while distant wavefronts arrive in-phase, yielding up to 6 dB noise reduction.',
    physicalSpecs: [
      { label: 'Configuration', value: '4-arm symmetric rosette, equal lengths' },
      { label: 'Arm Length / Bore', value: '1.0 m / 6 to 8 mm ID polyurethane' },
      { label: 'Aperture Footprint', value: '≈ 2.0 m ground diameter' },
      { label: 'First Acoustic Resonance', value: '≈ 61 Hz (quarter wave over 1.4 m arm + outlet)' },
      { label: 'Viscous Low-Pass', value: '≈ 450 Hz (negligible in-band resistance)' }
    ]
  },
  {
    num: '02',
    title: 'Capillary Reference Filter',
    mechanism: 'PNEUMATIC',
    actsOn: 'Rate of Pressure Change (dP/dt)',
    rejects: 'Barometric weather drift below 0.01 Hz',
    cutoff: 'fc = 7.9 mHz (τ = 20.2 s, 5τ ≈ 100 s)',
    tagColor: 'var(--noise)',
    formula: '\\tau = R_a \\times C_a = 20.2\\text{ s}, \\quad f_c = \\frac{1}{2\\pi \\tau} = 7.9\\text{ mHz}',
    summary: 'A sealed 100 mL borosilicate glass bottle communicating via a 0.30 mm bore PEEK capillary cancels slow barometric weather shifts.',
    physicsRationale: 'Weather shifts pressure by kilopascals over hours, which would drive a sensitive ±249 Pa sensor far into saturation. The capillary leaks slow weather changes to Port B so they cancel across the diaphragm, while dynamic infrasound (>0.01 Hz) cannot leak through and registers at full sensitivity.',
    physicalSpecs: [
      { label: 'Reference Volume', value: '100 mL borosilicate GL45 glass bottle' },
      { label: 'Capillary Spec', value: 'PEEK, 0.30 mm bore, 1/16" (1.59 mm) OD' },
      { label: 'Cut Length', value: 'Cut at 320 mm; trimmed to 221–309 mm for τ = 20.2 s' },
      { label: 'Acoustic Compliance', value: '7.19 × 10⁻¹⁰ (adiabatic) to 1.01 × 10⁻⁹ m³/Pa' },
      { label: 'Settling Time (5τ)', value: '≈ 100 seconds ("The 100-Second Paradox")' }
    ]
  },
  {
    num: '03',
    title: 'Sallen-Key Active Low-Pass',
    mechanism: 'ELECTRICAL',
    actsOn: 'Frequency Domain',
    rejects: 'Acoustic noise and interference > 25 Hz',
    cutoff: 'fc = 25.1 Hz (-40 dB/dec roll-off)',
    tagColor: 'var(--signal)',
    formula: 'f_c = \\frac{1}{2\\pi \\sqrt{R_1 R_2 C_1 C_2}} = 25.1\\text{ Hz}, \\quad Q = 0.709',
    summary: 'A 2nd-order Butterworth active low-pass prevents Nyquist fold-over before 1000 SPS sampling, delivering 64 dB attenuation at 1000 Hz.',
    physicsRationale: 'High-frequency acoustic energy above Nyquist (500 Hz at 1000 SPS) permanently folds into 0–20 Hz if sampled unattenuated. Maximally flat Butterworth alignment preserves exact passband calibration (-1.5 dB at 20 Hz) while achieving 52 dB at 500 Hz and 64 dB at 980–1020 Hz.',
    physicalSpecs: [
      { label: 'Topology', value: '2nd-order Sallen-Key Butterworth' },
      { label: 'Op-Amp IC', value: 'OPA2333 zero-drift chopper' },
      { label: 'Passband Gain (K)', value: '1.59 (Rf = 5.9 kΩ, Rg = 10 kΩ to 2.5 V)' },
      { label: 'Passive Values', value: 'R1=R2=63.4 kΩ (0.1%), C1=C2=100 nF (C0G/film)' },
      { label: 'Attenuation at 500/980 Hz', value: '52 dB / 64 dB (ADS1256 sinc notch at 1000 Hz)' }
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
    fc: '61 Hz res',
    role: 'Wind Noise Rejection',
    technicalDetails: 'Four 1.0 m arms (6–8 mm ID) feed a central summing manifold. Spatially averages local turbulent pressure fluctuations, providing up to 6 dB incoherent wind noise rejection while constructively summing planar infrasound wavefronts.',
    schematicDetails: [
      'Four 1000 mm × 7 mm ID polyurethane tubes',
      'Central summing manifold: 40 × 40 × 20 mm, 4 inlets, 1 outlet',
      'Mesh/foam protective inlet caps'
    ]
  },
  {
    id: 'stage-2',
    step: 2,
    name: 'Transducer & Bridge',
    component: 'All Sensors MLV-L01D-E1BD-N',
    gain: '28.10 µV/Pa',
    gainDb: 'Transducer',
    fc: 'DC – 2 kHz',
    role: 'Differential Pressure Sensing',
    technicalDetails: 'Raw piezoresistive Wheatstone bridge (CoBeam² die, ±249 Pa range). Port A receives ambient pressure; Port B communicates with sealed 100 mL borosilicate reference volume via PEEK capillary. Raw bridge bypasses internal ASIC 11-bit limits.',
    schematicDetails: [
      '5.0 V excitation from dedicated TPS7A4700 linear LDO',
      'Bridge output: 3 kΩ typ; zero offset: ±500 µV max',
      'Port B positive convention: rising ambient at Port A gives negative-going output (sign inverted in firmware)'
    ],
    headroomNotes: 'Unconditioned raw bridge retains factory 0–50 °C compensation without quantization traps.'
  },
  {
    id: 'stage-3',
    step: 3,
    name: 'Pre-Amplifier',
    component: 'INA188 Zero-Drift Instrumentation Amp',
    gain: '101.2×',
    gainDb: '40.1 dB',
    fc: 'Broadband',
    role: 'Low-Noise Common-Mode Rejection',
    technicalDetails: 'INA188 replaced INA333. Its 12.5 nV/√Hz noise density (vs 50 nV/√Hz in INA333) brings the computed noise floor from 8 mPa down to 2.34 mPa RMS, unlocking the >100 dB dynamic range. Provides >104 dB CMRR on 2.5 V common-mode bridge pedestal.',
    schematicDetails: [
      'RG = 499 Ω (0.1%, 25 ppm/°C) sets Gain = 1 + 50 kΩ / RG = 101.2',
      'Input network: 100 Ω in series with each input + 1 nF differential capacitor',
      'REF pin driven by low-impedance buffered 2.5 V rail (OPA2333 follower)'
    ],
    headroomNotes: 'At ±240 Pa full-scale, INA188 output swings ±0.71 V from signal + ±0.1 V offset, leaving ample margin on 5 V supply.'
  },
  {
    id: 'stage-4',
    step: 4,
    name: 'AC Coupling High-Pass',
    component: '22 µF Film + 1.5 MΩ Shunt',
    gain: '1.0×',
    gainDb: '0.0 dB',
    fc: '4.8 mHz',
    role: 'Sensor DC Offset Stripping',
    technicalDetails: 'Strips the amplified bridge offset (up to ±0.95 mV × 101 ≈ ±96 mV) so subsequent stages can apply high gain without saturation. Returns to buffered 2.5 V node rather than ground to prevent negative rail clipping.',
    schematicDetails: [
      '22 µF polypropylene film capacitor (low leakage prevents DC error across 1.5 MΩ)',
      '1.5 MΩ metal film shunt to buffered 2.5 V (corner = 4.8 mHz, time constant 33 s)',
      '1.5 MΩ thermal noise is capacitively shunted to low-impedance output in-band (0.003 mPa RTI)'
    ],
    headroomNotes: 'Acoustic corner at 7.9 mHz + 4.8 mHz electrical corner combine to yield exactly -3.0 dB at 0.01 Hz with 64° lead.'
  },
  {
    id: 'stage-5',
    step: 5,
    name: 'Second Gain Stage',
    component: 'OPA2333 Non-Inverting',
    gain: '2.21×',
    gainDb: '6.9 dB',
    fc: 'Passband',
    role: 'Intermediate Scaling & Sensitivity Trim',
    technicalDetails: 'Non-inverting configuration presents ultra-high input impedance, preventing loading on the 1.5 MΩ coupling node. Feedback resistor Rf is trimmed per unit during Procedure 1 calibration to achieve exactly 20.0 mV/Pa sensitivity.',
    schematicDetails: [
      'Rf = 1.21 kΩ, Rg = 1.00 kΩ (0.1%, 25 ppm/°C) gives Gain = 1 + 1.21/1.00 = 2.21',
      'Rg tied to buffered 2.5 V virtual ground (amplifies only AC deviations)',
      'Rf selected per unit to calibrate out sensor’s ±14% unit-to-unit span spread'
    ],
    headroomNotes: 'Verified DC operating point: 2.4999 V in LTspice.'
  },
  {
    id: 'stage-6',
    step: 6,
    name: 'Anti-Aliasing Filter',
    component: 'OPA2333 Sallen-Key Low-Pass',
    gain: '1.59×',
    gainDb: '4.0 dB',
    fc: '25.1 Hz',
    role: '2nd-Order Butterworth Anti-Alias',
    technicalDetails: 'Maximally flat passband Butterworth filter (Q = 0.709) with 25.1 Hz cutoff. -1.5 dB at 20 Hz, 52 dB attenuation at 500 Hz Nyquist, and 64 dB at 980–1020 Hz fold-over band.',
    schematicDetails: [
      'R1 = R2 = 63.4 kΩ (0.1%), C1 = C2 = 100 nF (C0G/film, non-microphonic)',
      'Rf = 5.9 kΩ, Rg = 10 kΩ to 2.5 V (sets K = 1.59, Q = 0.709)',
      'Single-ended chain total gain: 355.6× (51.0 dB)'
    ],
    headroomNotes: 'Rg returning to 2.5 V prevents the 2.5 V pedestal from being multiplied to 4.0 V.'
  },
  {
    id: 'stage-7',
    step: 7,
    name: 'Differential Driver',
    component: 'OPA2333 Unity Inverter',
    gain: '2.0× diff',
    gainDb: '6.0 dB',
    fc: 'Passband',
    role: 'Dual-Leg Differential Driver',
    technicalDetails: 'A third OPA2333 op-amp inverts the filter output about 2.5 V using matched 10 kΩ 0.1% resistors. Filter output drives AIN0; inverted copy drives AIN1. Each leg swings 0.1 V to 4.9 V, producing a ±4.8 V differential signal (9.6 V p-p).',
    schematicDetails: [
      'Matched 10 kΩ (0.1%) precision inverter around 2.5 V reference',
      'Total differential gain: 711.2× (57.0 dB)',
      'Differential system sensitivity: 19.99 mV/Pa (9.99 mV/Pa per leg)'
    ],
    headroomNotes: 'Allows utilizing ±240 Pa of the sensor ±249 Pa range on a single 5 V rail.'
  },
  {
    id: 'stage-8',
    step: 8,
    name: 'Digitizer & Decimator',
    component: 'ADS1256 + STM32 MCU',
    gain: '24-bit',
    gainDb: 'Digital',
    fc: '100 SPS out',
    role: 'Delta-Sigma Sampling & FIR Decimation',
    technicalDetails: 'ADS1256 measures AIN0 to AIN1 differentially (PGA=1, buffer off) against ADR441 2.5 V reference at 1000 SPS. STM32 applies 10:1 linear-phase FIR decimation filter, outputting 100 samples/s 24-bit data stream via USB miniSEED.',
    schematicDetails: [
      'Full-scale range: ±5.0 V differential (±2 × VREF / PGA)',
      'Input-referred noise: 0.56 µV RMS over 0.01–20 Hz (0.028 mPa at 19.99 mV/Pa, 80× below analog floor)',
      'Monitor channel: AIN2 to AIN3 reads INA188 output against 2.5 V DC-coupled for step calibration'
    ],
    headroomNotes: 'Data is timestamped and saved in standard miniSEED format compatible with ObsPy.'
  }
];

export const NOISE_BUDGET_CONTRIBUTORS: NoiseContributor[] = [
  {
    source: 'INA188 Voltage Noise (12.5 nV/√Hz)',
    rtiDensity: '12.5 nV/√Hz',
    noisePaRms: 1.989,
    powerPercentage: 72.1,
    significance: 'Dominant Noise Term (INA188 upgrade reduced floor from 8 mPa)',
    isDominant: true
  },
  {
    source: 'MLV Bridge Thermal Noise (3 kΩ)',
    rtiDensity: '7.0 nV/√Hz',
    noisePaRms: 1.109,
    powerPercentage: 22.4,
    significance: 'Fundamental Piezoresistive Die Physics Limit'
  },
  {
    source: 'INA188 Gain Resistor RG (499 Ω)',
    rtiDensity: '2.8 nV/√Hz',
    noisePaRms: 0.452,
    powerPercentage: 3.7,
    significance: 'Johnson-Nyquist Noise of 499 Ω Resistor'
  },
  {
    source: 'Input Resistors (2 × 100 Ω)',
    rtiDensity: '1.8 nV/√Hz',
    noisePaRms: 0.286,
    powerPercentage: 1.5,
    significance: 'Differential Protection Network'
  },
  {
    source: 'Stage 4 OPA2333 & Resistors',
    rtiDensity: '0.55 nV/√Hz',
    noisePaRms: 0.087,
    powerPercentage: 0.1,
    significance: 'Suppressed 101.2× by Stage 2 Gain'
  },
  {
    source: 'Sallen-Key Filter & Resistors',
    rtiDensity: '0.32 nV/√Hz',
    noisePaRms: 0.051,
    powerPercentage: 0.05,
    significance: 'Negligible in-band contribution'
  },
  {
    source: 'ADS1256 24-bit Digitizer',
    rtiDensity: '0.56 µV RMS in-band',
    noisePaRms: 0.028,
    powerPercentage: 0.01,
    significance: '80× below analog noise floor'
  },
  {
    source: 'Inverter Leg (OPA2333)',
    rtiDensity: '0.16 nV/√Hz',
    noisePaRms: 0.025,
    powerPercentage: 0.01,
    significance: 'Complementary leg noise contribution'
  },
  {
    source: 'AC Coupling Resistor (1.5 MΩ)',
    rtiDensity: 'Capacitively shunted',
    noisePaRms: 0.003,
    powerPercentage: 0.001,
    significance: 'Shunted to 362 Ω reactance at 20 Hz'
  }
];

export const HARDWARE_BLOCKS_SPECS: HardwareBlockSpec[] = [
  {
    blockId: 'block-a',
    blockTitle: 'Block (a) — Pressure Sensing Mechanism',
    parameters: [
      { param: 'Transducer Model', value: 'All Sensors MLV-L01D-E1BD-N' },
      { param: 'Technology', value: 'Piezoresistive MEMS, proprietary CoBeam²' },
      { param: 'Range', value: '±1 inH₂O (±249 Pa), differential' },
      { param: 'Output Format', value: 'Raw Wheatstone bridge, unamplified millivolt' },
      { param: 'Nominal Span', value: '6 / 7 / 8 mV (min / typ / max) at 5.0 V excitation' },
      { param: 'Bridge Sensitivity', value: '28.10 µV/Pa nominal (one-sided span interpretation)' },
      { param: 'Impedance', value: '12 kΩ input typ, 3 kΩ output typ' },
      { param: 'Compensated Temp Range', value: '0 to 50 °C (factory trimmed zero and span)' },
      { param: 'Zero Offset', value: '±500 µV max at zero differential pressure' },
      { param: 'Offset & Span Temp Shift', value: '±250 µV max each, 0 to 50 °C relative to 25 °C' },
      { param: 'Port Polarity', value: 'Port A → Atmosphere (via Rosette); Port B → Reference cavity' },
      { param: 'Inversion Convention', value: 'Port B is positive in datasheet; atmospheric compression produces negative voltage, inverted in firmware' }
    ],
    architecturalDecisions: [
      {
        decision: 'Raw Bridge vs ELVH-L01D Digital ASIC',
        reasoning: 'The ELVH-L01D generates its analog output via internal 11-bit ADC conversion, capping resolution at ~0.24 Pa. Choosing the raw-bridge MLV-L01D avoids this irreversible quantization loss, allowing our custom analog chain to reach a 2.34 mPa RMS noise floor (over 21× better than the 0.05 Pa target).'
      },
      {
        decision: 'One-Sided Span Convention (28.10 µV/Pa)',
        reasoning: 'Datasheet note 4 defines span as difference between full-scale and zero offset at 1 inH2O (7 mV / 249 Pa = 28.10 µV/Pa). Supported by MLV-015A and MLV-015D listing identical 37.5 mV span. Per-unit trimming in Procedure 1 guarantees exact sensitivity regardless of unit spread.'
      },
      {
        decision: 'Port Protection Filter',
        reasoning: 'A 20 to 40 µm sintered polypropylene filter disc protects Port A from dust and particulates without adding acoustic resistance. Parylene coating inquiry submitted to factory.'
      }
    ]
  },
  {
    blockId: 'block-b',
    blockTitle: 'Block (b) — Mechanical Transducer Manifold',
    parameters: [
      { param: 'Material', value: '3D-printed PETG with epoxy wash on internal cavity walls' },
      { param: 'Outer Envelope', value: '35 × 35 × 45 mm compact block' },
      { param: 'Sensor Pocket', value: '19 × 13 mm, 12 mm deep (1.5 mm clearance for 16.0 × 9.8 mm DIP body)' },
      { param: 'Port Channel Bore', value: '2 to 3 mm smooth bore, <20 mm length each' },
      { param: 'Minimum Wall Thickness', value: '3 mm (airtightness specification preventing FDM inter-layer leaks)' },
      { param: 'Sensor Seal', value: 'Mechanically compressed O-ring (nitrile or silicone)' },
      { param: 'Port B Dead Volume', value: '< 2.0 mL total (<2% shift against 100 mL reference bottle)' }
    ],
    architecturalDecisions: [
      {
        decision: '3 mm Wall Thickness as Airtightness Specification',
        reasoning: 'Standard mechanical loads would only require 1.2 mm, but FDM 3D printing leaks along layer boundaries. 3 mm forces airtight perimeter redundancy, sealed with an internal epoxy wash.'
      },
      {
        decision: 'Removable 10-32 Coned PEEK Ferrules',
        reasoning: 'PEEK has low surface energy and bonds poorly with adhesives. 10-32 coned compression fittings provide airtight, vibration-proof seals while allowing capillary length adjustments during calibration.'
      }
    ]
  },
  {
    blockId: 'block-c-f',
    blockTitle: 'Blocks (c & f) — Differential Pressure & Equalization',
    parameters: [
      { param: 'Reference Volume', value: '100 mL borosilicate GL45 bottle (rigid glass)' },
      { param: 'Capillary Tube', value: 'Chromatography-grade PEEK, 0.30 mm bore, 1/16" (1.59 mm) OD' },
      { param: 'Poiseuille Flow Resistance', value: '9.10 × 10¹⁰ Pa·s/m³ per meter (air at 20 °C)' },
      { param: 'Acoustic Compliance (Ca)', value: '7.19 × 10⁻¹⁰ (adiabatic) to 1.01 × 10⁻⁹ m³/Pa (isothermal)' },
      { param: 'Target Time Constant (τ)', value: '20.2 seconds (Ra × Ca)' },
      { param: 'Target Acoustic Corner', value: 'fc = 7.9 mHz' },
      { param: 'Tuning Strategy', value: 'Cut at 320 mm; trimmed experimentally to 221–309 mm for τ = 20.2 s' }
    ],
    architecturalDecisions: [
      {
        decision: 'Why Acoustic Corner is Set at 7.9 mHz',
        reasoning: 'The acoustic high-pass acts in series with the 4.8 mHz electrical high-pass. If both sat at 0.01 Hz, the combined response at 0.01 Hz would be well below -3 dB. Setting the acoustic corner to 7.9 mHz makes the combined response exactly -3.0 dB at 0.01 Hz with 64° phase lead.'
      },
      {
        decision: 'Why Capillary is Trimmed by Length',
        reasoning: 'Flow resistance scales as L / r⁴. A 10% bore tolerance creates a -32% to +52% resistance error, whereas length scales strictly linearly and can be cut precisely. PEEK tubing is cut long (320 mm) and shortened until τ = 20.2 s.'
      },
      {
        decision: 'Rigid Borosilicate Glass vs Plastic',
        reasoning: 'Any flex in plastic bottle walls introduces parasitic mechanical compliance in parallel with Ca, shifting the corner unpredictably. Borosilicate is completely rigid, gas-tight, and has low thermal expansion.'
      }
    ]
  },
  {
    blockId: 'block-d',
    blockTitle: 'Block (d) — Low-Noise Analog Front End & Power',
    parameters: [
      { param: 'Stage 2 Component', value: 'INA188 Zero-Drift Instrumentation Amp (Gain = 101.2, RG = 499 Ω 0.1%)' },
      { param: 'Stage 3 AC Coupling', value: '22 µF Polypropylene Film + 1.5 MΩ Shunt to 2.5 V (fc = 4.8 mHz)' },
      { param: 'Stage 4 Component', value: 'OPA2333 Non-Inverting Op-Amp (Gain = 2.21, Rf = 1.21 kΩ, Rg = 1.00 kΩ)' },
      { param: 'Stage 5 Anti-Alias', value: 'OPA2333 2nd-Order Sallen-Key Butterworth (fc = 25.1 Hz, Gain = 1.59)' },
      { param: 'Stage 6 Inverter', value: 'OPA2333 Unity Inverter creating differential drive (Gain = ×2 diff)' },
      { param: 'Total Analog Gain', value: '355.6× single-ended (51.0 dB), 711.2× differential (57.0 dB)' },
      { param: 'System Sensitivity', value: '19.99 mV/Pa differential (9.99 mV/Pa per leg), trimmed to 20.0 mV/Pa' },
      { param: 'Full-Scale Dynamic Range', value: '±240 Pa yields ±4.8 V differential (9.6 V p-p, 0.1 V to 4.9 V per leg)' },
      { param: 'Power Source', value: '2S Li-ion battery pack (7.4 V nominal, 6.0–8.4 V, ≥3000 mAh) / 7.5 V bench supply' },
      { param: 'Linear Regulators', value: '5.0V Sensor (TPS7A4700), 5.0V Analog (TPS7A4700/ADM7150), 3.3V Digital (LDO)' }
    ],
    architecturalDecisions: [
      {
        decision: 'INA188 Zero-Drift Upgrade',
        reasoning: 'Replacing the initial INA333 (50 nV/√Hz) with the INA188 (12.5 nV/√Hz) reduced the amplifier noise from 8 mPa to 1.99 mPa, bringing the overall system noise floor down to 2.34 mPa RMS and making the >100 dB dynamic range achievable.'
      },
      {
        decision: 'Split Gain Architecture with AC Coupling',
        reasoning: 'Sensor offset and thermal drift can total ±0.95 mV, comparable to the signal range. Applying 711× gain directly would saturate the amplifier at rail. Stage 2 applies moderate gain (101.2×), Stage 3 strips DC offset at 4.8 mHz, and Stages 4–6 apply remaining gain cleanly.'
      },
      {
        decision: 'Differential Drive via Stage 6 Unity Inverter',
        reasoning: 'Generating a complementary inverted signal around 2.5 V allows the ADS1256 to see a ±4.8 V differential swing on a single 5 V rail, doubling dynamic range and utilizing ±240 Pa of the sensor ±249 Pa range.'
      },
      {
        decision: 'Triple Linear LDO Rail Isolation',
        reasoning: 'Digital current pulses from MCU SPI operations on a shared rail would modulate the bridge excitation (which is ratiometric). Three independent linear LDOs isolate excitation, analog, and digital loads with star grounding at the battery negative terminal.'
      }
    ]
  },
  {
    blockId: 'block-e',
    blockTitle: 'Block (e) — Temperature Compensation',
    parameters: [
      { param: 'Temperature Sensor', value: 'TI TMP117 (±0.1 °C accuracy, 0.0078 °C resolution, I²C)' },
      { param: 'Mounting Location', value: 'Inside the acoustic chamber, on the manifold directly adjacent to the sensor' },
      { param: 'Characterisation Profile', value: '0 to 50 °C in 10 °C increments' },
      { param: 'Dwell Criterion', value: 'Until reading changes < 0.01 °C over 10 minutes (30–60 min thermal settling)' },
      { param: 'Correction Model', value: 'Second-order least-squares polynomial in firmware' }
    ],
    architecturalDecisions: [
      {
        decision: 'What Firmware Corrects vs What Enclosure Handles',
        reasoning: 'Firmware polynomial compensates for sensitivity drift (±250 µV span shift over 0–50 °C, ~3.6% of span). However, rapid temperature fluctuations in the reference volume create gas-thermometer pressure noise (P/T × ΔT = 0.35 Pa/mK). To keep this below 2.34 mPa, the reference gas must stay stable to ~7 µK over 1–100 s. No firmware can correct this; it is strictly controlled by the 20 mm foam enclosure insulation.'
      }
    ]
  },
  {
    blockId: 'block-g',
    blockTitle: 'Block (g) — Environmental Enclosure',
    parameters: [
      { param: 'Outer Shell', value: 'IP66 ABS or polycarbonate, 3 mm wall, gasketed lid, ≈ 140 × 140 × 295 mm' },
      { param: 'Acoustic Chamber (Internal)', value: '134 × 134 × 205 mm, hermetically sealed from electronics' },
      { param: 'Foam Thermal Lining', value: 'Closed-cell EPDM/PE, 20 mm on all faces (usable space 94 × 94 × 165 mm)' },
      { param: 'Electronics Bay (Internal)', value: '134 × 134 × 80 mm, separated by 3 mm internal wall' },
      { param: 'Breather Vent', value: 'Gore-style ePTFE membrane breather (~10 mm) in electronics bay outer wall only' },
      { param: 'Desiccant', value: '5 to 10 g regenerative silica gel sachet in electronics bay' },
      { param: 'Cable Glands', value: 'IP68, PG7 or PG9' }
    ],
    architecturalDecisions: [
      {
        decision: 'Opposite Compartment Needs',
        reasoning: 'The acoustic chamber must be hermetically sealed (any leak acts in parallel with the capillary and shortens τ). The electronics bay must be vented to equalize case pressure during weather changes and prevent seal stress/moisture pumping.'
      },
      {
        decision: 'Vibration Decoupling on Foam Mounts',
        reasoning: 'The sensor has a position sensitivity of up to 20 µV/g (~0.7 Pa/g). Mounting the bottle and manifold on vibration-damping foam isolates the transducer from structural ground vibrations up to 20 Hz.'
      }
    ]
  },
  {
    blockId: 'block-h',
    blockTitle: 'Block (h) — Wind-Noise Reduction Interface',
    parameters: [
      { param: 'Configuration', value: '4-arm radial rosette, equal lengths' },
      { param: 'Arm Length / Bore', value: '1.0 m / 6 to 8 mm ID polyurethane' },
      { param: 'Summing Manifold', value: '40 × 40 × 20 mm, 4 inlets, 1 outlet run (0.3 to 0.5 m to Port A)' },
      { param: 'Inlet Protection', value: 'Mesh or foam protective caps' },
      { param: 'Aperture Footprint', value: '≈ 2.0 m ground diameter' },
      { param: 'First Acoustic Resonance', value: '≈ 61 Hz (quarter wave over 1.4 m arm + outlet path)' },
      { param: 'Viscous Low-Pass', value: '≈ 450 Hz (negligible resistance compared to capillary)' }
    ],
    architecturalDecisions: [
      {
        decision: '1.0 m Arms vs 2.0 m Arms',
        reasoning: 'First acoustic resonance of 1.0 m arm + outlet (1.4 m) is ≈61 Hz—three times the 20 Hz upper band edge. With 2.0 m arms, resonance drops to 36 Hz, too close to the band edge. Equal arm lengths ensure zero phase skew.'
      },
      {
        decision: 'Realistic Noise Reduction Boundaries',
        reasoning: 'With four inlets, incoherent noise reduction is at most a factor of two (6 dB), effective for turbulent eddies smaller than the 2 m aperture (mainly above a few hertz). Longer arms or porous hoses can be used for full field deployments.'
      }
    ]
  }
];

export const CALIBRATION_STEPS_DATA: CalibrationStep[] = [
  {
    id: 'cal-proc-1',
    num: '01',
    name: 'Sensitivity Estimation & Capillary Trim',
    deliverable: 'Deliverable (d)',
    objective: 'Measure transfer function (mV/Pa), offset, linearity, and trim capillary to τ = 20.2 s.',
    method: 'Primary method: Pressure source connected to Port B (reference side). Capillary is only escape path; controller maintains steady pressure indefinitely. Points applied across ±50 Pa and full ±240 Pa. Cross-check: Fast step applied to Port A and recorded on DC-coupled monitor channel (AIN2–AIN3, INA188 output). Single exponential fit gives τ; capillary is shortened until τ = 20.2 s.',
    formulaOrSetup: 'V_{out}(t) = V_0 \\cdot e^{-t / \\tau} + V_{offset}, \\quad \\tau = 20.2\\text{ s}',
    reportingOutput: 'Calibration curve with residuals, sensitivity in mV/Pa (trimmed to 20.0 mV/Pa via stage-4 Rf), offset, linearity, hysteresis, and front-to-back linearity.',
    paradoxMitigation: 'The 100-Second Paradox: Applied static pressure leaks away in 5τ ≈ 100 s. Pressurizing reference side Port B solves this completely.'
  },
  {
    id: 'cal-proc-2',
    num: '02',
    name: 'Noise Floor & Power Spectral Density',
    deliverable: 'Deliverable (c)',
    objective: 'Measure electronic noise floor and assess low-frequency sensor 1/f noise.',
    method: 'Record quiet baseline through complete chain with Port A connected to a sealed, thermally lagged volume. Compute PSD via Welch’s method, convert to pascals with Procedure 1 sensitivity, and compare with 2.34 mPa RMS (0.52 mPa/√Hz) budget.',
    formulaOrSetup: 'P_{RMS} = \\sqrt{\\int_{0.01}^{20} S_{pp}(f) \\, df} \\quad [\\text{Computed Budget: } 2.34\\text{ mPa RMS}]',
    reportingOutput: 'PSD plot, integrated 0.01–20 Hz RMS pressure noise floor, empirical vs theoretical budget comparison.',
    paradoxMitigation: 'Confirms that INA188 dominates (72.1%) and ADS1256 digitizer is 80× below analog noise floor.'
  },
  {
    id: 'cal-proc-3',
    num: '03',
    name: 'Frequency Response Verification',
    deliverable: 'Deliverable (b)',
    objective: 'Empirically verify all four corner frequencies and passband flatness.',
    method: 'Split job: Electrical stages (4.8 mHz AC coupling & 25.1 Hz Sallen-Key) measured via test signal injection at amplifier input. Acoustic corner (7.9 mHz) measured from Procedure 1 step fit. Combined analytically and verified pneumatically at 0.1, 1, and 10 Hz.',
    formulaOrSetup: 'f_{c1}=4.8\\text{ mHz (elec)}, \\; f_{c2}=7.9\\text{ mHz (acoust)} \\rightarrow -3.0\\text{ dB at } 0.01\\text{ Hz}; \\; f_{c3}=25.1\\text{ Hz}',
    reportingOutput: 'Bode magnitude and phase curve confirming -3.0 dB at 0.01 Hz (64° lead), -1.5 dB at 20 Hz, and -40 dB/dec roll-off.',
    paradoxMitigation: 'Avoids spending 10+ hours taking discrete sub-millihertz acoustic frequency points in an acoustic chamber.'
  },
  {
    id: 'cal-proc-4',
    num: '04',
    name: 'Thermal Drift & Stability Run',
    deliverable: 'Deliverable (e)',
    objective: 'Demonstrate 2nd-order polynomial firmware compensation across natural diurnal cycles.',
    method: 'Run continuously for 24 to 72 hours on a linear bench supply (7.5 V). Natural day/night thermal cycle provides excitation. Log raw pressure output and TMP117 temperature together.',
    formulaOrSetup: 'P_{corrected} = P_{raw} - (a\\cdot T^2 + b\\cdot T + c)',
    reportingOutput: 'Tri-trace plot: raw output, temperature, and corrected output on one time axis. Peak-to-peak drift before and after correction, and drift reduction ratio.',
    paradoxMitigation: 'Shows baseline stability holding flat within noise floor despite diurnal ambient temperature excursions.'
  },
  {
    id: 'cal-proc-5',
    num: '05',
    name: 'Detection Demonstration & SNR at 1 Hz',
    deliverable: 'Deliverable (a)',
    objective: 'Demonstrate detection threshold and spectral SNR at 1.0 Hz test frequency.',
    method: 'A loudspeaker in a small sealed chamber around Port A inlet produces 1 Hz pressure signals at 10 Pa, 1 Pa, 0.1 Pa, and reduced towards noise floor. Record waveform and compute FFT.',
    formulaOrSetup: '\\text{SNR} = 20 \\log_{10} \\left( \\frac{V_{signal, RMS}}{V_{noise, RMS}} \\right)',
    reportingOutput: 'Time-domain waveform, power spectrum showing sharp 1 Hz line above floor, SNR at each amplitude, and minimum reliable detection limit.',
    paradoxMitigation: 'Proves practical detection capability at sub-pascal levels where time-domain signals are submerged in noise.'
  }
];

export const OPEN_ENGINEERING_ITEMS: OpenEngineeringItem[] = [
  {
    priority: 'High',
    block: 'Block (a)',
    item: 'Manufacturer confirmation of the span convention (one-sided vs differential)',
    impact: 'Resolved empirically via Procedure 1 calibration curve; per-unit trim guarantees 20.0 mV/Pa.',
    status: 'In Review'
  },
  {
    priority: 'High',
    block: 'Block (d)',
    item: 'Re-run LTspice with revised stage-4 values (G=2.21) and inverter stage',
    impact: 'Confirms DC operating points (2.5 V pedestal) and phase margins with differential drive.',
    status: 'Verified in Simulation'
  },
  {
    priority: 'High',
    block: 'Block (i)',
    item: 'Measure sensor’s low-frequency noise in Procedure 2',
    impact: 'Piezoresistor 1/f noise is not published in datasheet; experimental measurement determines real-world floor.',
    status: 'Pending Build Phase'
  },
  {
    priority: 'Medium',
    block: 'Block (a)',
    item: 'Ask factory whether parylene coating suits this range',
    impact: 'Determines whether internal die moisture barrier can be factory-applied or relies on external filter.',
    status: 'In Review'
  },
  {
    priority: 'Medium',
    block: 'Block (d)',
    item: 'FIR order, window, and stopband attenuation for 10:1 decimator',
    impact: 'STM32 DSP filter design to ensure linear phase and >60 dB alias rejection.',
    status: 'In Review'
  },
  {
    priority: 'Medium',
    block: 'Block (g)',
    item: 'Final bottle dimensions from supplier drawing; capillary vent wind shield',
    impact: 'Guarantees mechanical fit in acoustic chamber and shields external capillary mouth from gusts.',
    status: 'Pending Build Phase'
  },
  {
    priority: 'Medium',
    block: 'Block (b)',
    item: 'Confirm E1BD (DIP 8-pin) versus E1BS (SIP 4-pin) package variant',
    impact: 'Ensures printed manifold lead exit geometry matches final procurement order.',
    status: 'In Review'
  },
  {
    priority: 'Low',
    block: 'Block (d)',
    item: 'PCB layout drawing with guard rings and 1.5 MΩ trace isolation',
    impact: 'Prevents micro-ampere surface board leakage from shifting DC mid-rail operating point.',
    status: 'Verified in Simulation'
  },
  {
    priority: 'Low',
    block: 'Block (b)',
    item: 'Diaphragm mechanical resonance check by sine sweep',
    impact: 'Ensures mechanical sensor resonance sits well above 20 Hz passband (>2 kHz expected from 500 µs response).',
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
    focus: 'Low-noise preamplifier design, INA188/OPA2333 staging, power supply LDO isolation, and PCB layout.',
    subsystem: 'Analog Front End & PCB',
    avatarInitials: 'KR'
  },
  {
    name: 'Hariharan C',
    role: 'Embedded Firmware Developer',
    focus: 'STM32 SPI driver with DMA, ADS1256 digitizer interfacing, 10:1 linear-phase FIR decimation, and miniSEED stream.',
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
