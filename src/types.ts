export type Priority = 'High' | 'Medium' | 'Low';

export interface ComplianceParameter {
  parameter: string;
  target: string;
  ourDesign: string;
  status: string;
  isMet: boolean;
  notes?: string;
}

export interface SystemHeadlineMetric {
  id: string;
  value: string;
  unit: string;
  label: string;
  description: string;
  category: 'band' | 'sensitivity' | 'noise' | 'gain' | 'acoustic' | 'operating';
}

export interface SignalChainStage {
  id: string;
  step: number;
  name: string;
  component: string;
  gain: string;
  gainDb: string;
  fc: string;
  role: string;
  technicalDetails: string;
  schematicDetails: string[];
  headroomNotes?: string;
}

export interface FilterMechanism {
  num: string;
  title: string;
  mechanism: 'MECHANICAL' | 'PNEUMATIC' | 'ELECTRICAL';
  actsOn: string;
  rejects: string;
  cutoff: string;
  tagColor: string;
  formula: string;
  summary: string;
  physicsRationale: string;
  physicalSpecs: { label: string; value: string }[];
}

export interface NoiseContributor {
  source: string;
  rtiDensity: string;
  noisePaRms: number;
  powerPercentage: number;
  significance: string;
  isDominant?: boolean;
}

export interface HardwareBlockSpec {
  blockId: string;
  blockTitle: string;
  parameters: {
    param: string;
    value: string;
    note?: string;
  }[];
  architecturalDecisions: {
    decision: string;
    reasoning: string;
  }[];
}

export interface CalibrationStep {
  id: string;
  num: string;
  name: string;
  deliverable: string;
  objective: string;
  method: string;
  formulaOrSetup: string;
  reportingOutput: string;
  paradoxMitigation?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  focus: string;
  subsystem: string;
  avatarInitials: string;
}

export interface OpenEngineeringItem {
  priority: Priority;
  block: string;
  item: string;
  impact: string;
  status: 'In Review' | 'Verified in Simulation' | 'Pending Build Phase';
}
