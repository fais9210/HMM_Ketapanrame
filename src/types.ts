export type AttributeCategory = 'Gender' | 'Umur' | 'Peran' | 'Jenjang Pendidikan';

export interface InformantAttribute {
  category: AttributeCategory;
  value: string;
}

export interface Informant {
  id: string;
  name: string;
  code: string;
  gender: string;
  ageGroup: string;
  role: string;
  education: string;
  avatarColor: string;
  totalCodedThemes: number;
}

export interface QualitativeNode {
  id: string;
  label: string;
  category: 'parent_concept' | 'theme';
  parentCategory?: string;
  totalReferences: number;
  caseCount: number;
  description?: string;
}

export interface GraphEdge {
  id: string;
  source: string; // Informant ID
  target: string; // Node ID or Attribute ID
  type: 'Codes' | 'Value';
  label: string;
  weight: number;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'informant' | 'attribute' | 'theme' | 'parent_concept';
  group: string;
  val: number;
  color?: string;
  details?: Record<string, string | number>;
}

export interface CrosstabMatrixRow {
  nodeId: string;
  nodeLabel: string;
  category: 'parent_concept' | 'theme';
  informants: Record<string, number>; // { informan_1: 1, informan_2: 1, ... }
  genderBreakdown: Record<string, number>; // { 'Laki-laki': 4, 'Perempuan': 1 }
  ageBreakdown: Record<string, number>; // { '26-35': 1, '36-45': 2, '46-55': 2 }
  roleBreakdown: Record<string, number>;
  educationBreakdown: Record<string, number>;
  totalCases: number;
}

export interface WordFrequencyItem {
  word: string;
  length: number;
  count: number;
  weightedPercentage: string;
}

export interface StructuredCrosstabDataset {
  metadata: {
    projectTitle: string;
    description: string;
    studySubject: string;
    extractionDate: string;
    totalInformants: number;
    totalActiveThemes: number;
    totalTheoreticalNodes: number;
    totalEdges: number;
  };
  informants: Informant[];
  attributes: {
    gender: string[];
    umur: string[];
    peran: string[];
    pendidikan: string[];
  };
  nodes: QualitativeNode[];
  edges: GraphEdge[];
  crosstabMatrix: CrosstabMatrixRow[];
  wordFrequencyTop: WordFrequencyItem[];
}

// ----------------------------------------------------
// HMM & Integrative Project Map Types (Gambar 1 & Gambar 2)
// ----------------------------------------------------

export type HmmStepId =
  | 'actor'
  | 'comm_practice'
  | 'platform'
  | 'prod_digital'
  | 'info'
  | 'interaction'
  | 'visibility'
  | 'activity'
  | 'legitimacy';

export interface HmmFlowStep {
  id: HmmStepId;
  order: number;
  title: string;
  subtitle: string;
  colorType: 'green' | 'light_blue' | 'purple' | 'orange' | 'blue' | 'yellow' | 'pink';
  bgClass: string;
  borderClass: string;
  textClass: string;
  pillClass: string;
  items: string[];
  description?: string;
  columnGroup?: 'parallel_3';
}

export type ProjectMapNodeType =
  | 'actor'
  | 'attribute'
  | 'main_theme'
  | 'supporting_theme'
  | 'outcome';

export interface ProjectMapNode {
  id: string;
  label: string;
  type: ProjectMapNodeType;
  subType?: string; // e.g., 'Gender', 'Age', 'Education', 'Role'
  color: string;
  shape: 'ellipse' | 'round-rectangle' | 'diamond' | 'rectangle';
  posX?: number;
  posY?: number;
  description?: string;
}

export interface ProjectMapEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  style?: 'solid' | 'dashed';
  color?: string;
  bidirectional?: boolean;
}

export interface IntegrativeDataset {
  title: string;
  subtitle: string;
  nodes: ProjectMapNode[];
  edges: ProjectMapEdge[];
  hmmSteps: HmmFlowStep[];
}

