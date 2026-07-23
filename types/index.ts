// FactoryMind AI — Type Definitions

export type UserRole =
  | 'factory_admin'
  | 'production_manager'
  | 'plant_supervisor'
  | 'machine_operator'
  | 'maintenance_engineer'
  | 'quality_inspector'
  | 'ai_engineer'
  | 'ceo';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  factory: string;
  lastLogin: Date;
}

export type MachineStatus = 'running' | 'idle' | 'maintenance' | 'error' | 'offline';

export interface SensorReading {
  temperature: number; // Process Temperature
  airTemperature: number; // Air Temperature (AI4I 2020)
  processTemperature: number; // Process Temperature (AI4I 2020)
  pressure: number;
  voltage: number;
  current: number;
  power: number; // Power in kW
  rpm: number; // Rotational Speed (AI4I 2020)
  torque: number; // Torque in Nm (AI4I 2020)
  vibration: number;
  humidity: number;
  oilLevel: number;
  toolWear: number; // Tool Wear in min (AI4I 2020)
  energyConsumption: number;
  failureProbability: number; // Failure Probability (%)
}

export interface Machine {
  id: string;
  name: string;
  type: string;
  line: string;
  status: MachineStatus;
  healthScore: number;
  sensors: SensorReading;
  rulCycles: number; // Remaining Useful Life in cycles (NASA CMAPSS)
  defectCount: number;
  lastMaintenance: string;
  nextMaintenance: string;
  uptime: number;
  cycleCount: number;
}

export interface ProductionLine {
  id: string;
  name: string;
  machines: string[];
  status: 'active' | 'paused' | 'stopped';
  currentOutput: number;
  targetOutput: number;
  efficiency: number;
  oee: number;
  cycleTime: number;
  defectRate: number;
  shift: 'morning' | 'afternoon' | 'night';
}

export interface KPIData {
  label: string;
  value: number | string;
  unit: string;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  color: string;
}

export type AlertSeverity = 'critical' | 'warning' | 'info';
export type AlertType =
  | 'high_temperature'
  | 'abnormal_vibration'
  | 'low_pressure'
  | 'machine_failure_risk'
  | 'production_delay'
  | 'material_shortage'
  | 'quality_issue'
  | 'energy_spike';

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  machine?: string;
  line?: string;
  timestamp: string;
  acknowledged: boolean;
  channels: ('email' | 'sms' | 'push' | 'whatsapp')[];
}

export interface Prediction {
  id: string;
  type: string;
  title: string;
  value: number | string;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  features: FeatureImportance[];
  explanation: string;
  timestamp: string;
}

export interface FeatureImportance {
  name: string;
  importance: number;
  direction: 'positive' | 'negative';
}

export interface TimeSeriesPoint {
  timestamp: string;
  value: number;
  predicted?: number;
  lower?: number;
  upper?: number;
}

export interface DeepLearningModel {
  id: string;
  name: string;
  type: 'lstm' | 'gru' | 'transformer';
  accuracy: number;
  loss: number;
  epochs: number;
  status: 'training' | 'ready' | 'deployed';
  lastTrained: string;
}

export interface NLPAnalysis {
  text: string;
  sentiment: { label: string; score: number };
  entities: { text: string; type: string; start: number; end: number }[];
  keywords: { word: string; score: number }[];
  summary: string;
  recommendations: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
}

export interface AgentAction {
  id: string;
  agent: string;
  type: 'monitor' | 'detect' | 'recommend' | 'execute' | 'learn';
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  timestamp: string;
  confidence: number;
  requiresApproval: boolean;
  impact: 'low' | 'medium' | 'high';
}

export interface GenerativeScenario {
  id: string;
  name: string;
  type: 'sensor_data' | 'breakdown' | 'demand' | 'shortage' | 'optimization';
  status: 'idle' | 'generating' | 'complete';
  parameters: Record<string, number | string>;
  results?: Record<string, number | string>;
}

export interface OEEData {
  availability: number;
  performance: number;
  quality: number;
  overall: number;
}

export interface AnalyticsData {
  oee: OEEData;
  machineUtilization: { machine: string; utilization: number }[];
  downtimeReasons: { reason: string; hours: number }[];
  defectsByLine: { line: string; rate: number }[];
  energyByShift: { shift: string; kwh: number }[];
  maintenanceCost: TimeSeriesPoint[];
  revenueImpact: TimeSeriesPoint[];
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  whatsapp: boolean;
  criticalOnly: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  children?: NavigationItem[];
  roles?: UserRole[];
}
