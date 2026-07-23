// FactoryMind AI — Mock Data & Simulation Engine

import type {
  Machine, ProductionLine, Alert, Prediction, SensorReading,
  MachineStatus, AlertSeverity, AlertType, DeepLearningModel,
  NLPAnalysis, AgentAction, ChatMessage, OEEData, FeatureImportance,
  TimeSeriesPoint, GenerativeScenario
} from '@/types';

// ─── Helpers ─────────────────────────────────────────────

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
function randInt(min: number, max: number): number {
  return Math.floor(rand(min, max + 1));
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

// ─── Machine Data ────────────────────────────────────────

const MACHINE_NAMES = [
  'CNC Lathe Alpha', 'CNC Lathe Beta', 'Mill Station 1', 'Mill Station 2',
  'Injection Molder A', 'Injection Molder B', 'Press Brake X1', 'Press Brake X2',
  'Welding Robot R1', 'Welding Robot R2', 'Assembly Bot A1', 'Assembly Bot A2',
  'Conveyor C1', 'Conveyor C2', 'Packaging Unit P1', 'Packaging Unit P2',
  'Quality Scanner Q1', 'Quality Scanner Q2', 'Paint Booth PB1', 'Paint Booth PB2',
  'Laser Cutter L1', 'Laser Cutter L2', 'Stamping Press S1', 'Stamping Press S2',
  'Grinding Machine G1', 'Threading Machine T1', 'EDM Machine E1', 'Heat Treater H1',
  'Surface Finisher F1', 'Testing Rig TR1',
];

const MACHINE_TYPES = [
  'CNC Lathe', 'Milling Machine', 'Injection Molder', 'Press Brake',
  'Welding Robot', 'Assembly Robot', 'Conveyor', 'Packaging Unit',
  'Quality Scanner', 'Paint Booth', 'Laser Cutter', 'Stamping Press',
  'Grinding Machine', 'Threading Machine', 'EDM Machine',
];

const LINES = ['Line A', 'Line B', 'Line C', 'Line D', 'Line E'];

function generateSensors(): SensorReading {
  const airTemp = parseFloat(rand(20.0, 32.5).toFixed(1));
  const processTemp = parseFloat((airTemp + rand(10.0, 15.0)).toFixed(1));
  const current = parseFloat(rand(5.0, 28.0).toFixed(1));
  const voltage = parseFloat(rand(215.0, 240.0).toFixed(1));
  const power = parseFloat(((voltage * current * 0.85) / 1000).toFixed(2));
  const toolWear = randInt(10, 235);
  const failureProb = parseFloat(rand(1.2, 89.5).toFixed(1));

  return {
    temperature: processTemp,
    airTemperature: airTemp,
    processTemperature: processTemp,
    pressure: parseFloat(rand(2.0, 6.0).toFixed(2)),
    voltage,
    current,
    power,
    rpm: randInt(1200, 2850),
    torque: parseFloat(rand(15.0, 68.5).toFixed(1)),
    vibration: parseFloat(rand(0.5, 4.8).toFixed(2)),
    humidity: parseFloat(rand(35.0, 65.0).toFixed(1)),
    oilLevel: parseFloat(rand(40.0, 95.0).toFixed(1)),
    toolWear,
    energyConsumption: parseFloat((power * 1.5).toFixed(1)),
    failureProbability: failureProb,
  };
}

export function generateMachines(count: number = 30): Machine[] {
  return Array.from({ length: count }, (_, i) => {
    const statuses: MachineStatus[] = ['running', 'running', 'running', 'running', 'idle', 'maintenance', 'error'];
    const status = pick(statuses);
    const healthScore = status === 'error' ? randInt(10, 40) :
      status === 'maintenance' ? randInt(40, 65) :
        status === 'idle' ? randInt(60, 85) : randInt(75, 99);

    const sensors = generateSensors();
    const rulCycles = Math.max(5, Math.round(sensors.toolWear > 180 ? rand(10, 40) : (250 - sensors.toolWear) * 1.5));

    return {
      id: `machine-${i + 1}`,
      name: MACHINE_NAMES[i % MACHINE_NAMES.length],
      type: pick(MACHINE_TYPES),
      line: pick(LINES),
      status,
      healthScore,
      sensors,
      rulCycles,
      defectCount: status === 'error' ? randInt(8, 25) : randInt(0, 5),
      lastMaintenance: new Date(Date.now() - randInt(1, 30) * 86400000).toISOString(),
      nextMaintenance: new Date(Date.now() + randInt(1, 60) * 86400000).toISOString(),
      uptime: parseFloat(rand(85, 99.9).toFixed(1)),
      cycleCount: randInt(1000, 50000),
    };
  });
}

// ─── Production Lines ────────────────────────────────────

export function generateProductionLines(): ProductionLine[] {
  return [
    { id: 'line-a', name: 'Assembly Line A', machines: ['machine-1', 'machine-2', 'machine-3', 'machine-4', 'machine-5', 'machine-6'], status: 'active', currentOutput: randInt(850, 1100), targetOutput: 1000, efficiency: parseFloat(rand(82, 96).toFixed(1)), oee: parseFloat(rand(78, 92).toFixed(1)), cycleTime: parseFloat(rand(12, 18).toFixed(1)), defectRate: parseFloat(rand(0.5, 3.0).toFixed(2)), shift: 'morning' },
    { id: 'line-b', name: 'Assembly Line B', machines: ['machine-7', 'machine-8', 'machine-9', 'machine-10', 'machine-11'], status: 'active', currentOutput: randInt(700, 950), targetOutput: 900, efficiency: parseFloat(rand(78, 94).toFixed(1)), oee: parseFloat(rand(74, 90).toFixed(1)), cycleTime: parseFloat(rand(14, 22).toFixed(1)), defectRate: parseFloat(rand(0.8, 4.0).toFixed(2)), shift: 'morning' },
    { id: 'line-c', name: 'Machining Line C', machines: ['machine-12', 'machine-13', 'machine-14', 'machine-15', 'machine-16', 'machine-17', 'machine-18'], status: 'active', currentOutput: randInt(600, 800), targetOutput: 750, efficiency: parseFloat(rand(80, 95).toFixed(1)), oee: parseFloat(rand(76, 91).toFixed(1)), cycleTime: parseFloat(rand(20, 35).toFixed(1)), defectRate: parseFloat(rand(1.0, 5.0).toFixed(2)), shift: 'afternoon' },
    { id: 'line-d', name: 'Packaging Line D', machines: ['machine-19', 'machine-20', 'machine-21', 'machine-22', 'machine-23'], status: 'active', currentOutput: randInt(1200, 1600), targetOutput: 1500, efficiency: parseFloat(rand(85, 98).toFixed(1)), oee: parseFloat(rand(82, 95).toFixed(1)), cycleTime: parseFloat(rand(5, 10).toFixed(1)), defectRate: parseFloat(rand(0.2, 1.5).toFixed(2)), shift: 'afternoon' },
    { id: 'line-e', name: 'Quality Line E', machines: ['machine-24', 'machine-25', 'machine-26', 'machine-27'], status: 'paused', currentOutput: randInt(200, 400), targetOutput: 500, efficiency: parseFloat(rand(60, 80).toFixed(1)), oee: parseFloat(rand(55, 75).toFixed(1)), cycleTime: parseFloat(rand(30, 60).toFixed(1)), defectRate: parseFloat(rand(2.0, 6.0).toFixed(2)), shift: 'night' },
  ];
}

// ─── Alerts ──────────────────────────────────────────────

const ALERT_MESSAGES: Record<AlertType, string[]> = {
  high_temperature: ['Temperature exceeded 90°C on {machine}', 'Overheating detected on {machine} — coolant check required'],
  abnormal_vibration: ['Vibration spike detected on {machine} (7.2 mm/s)', 'Bearing vibration anomaly on {machine}'],
  low_pressure: ['Hydraulic pressure dropped below threshold on {machine}', 'Pneumatic pressure warning on {machine}'],
  machine_failure_risk: ['AI predicts 87% failure probability for {machine} within 48h', 'Critical wear detected on {machine} spindle assembly'],
  production_delay: ['Production target behind schedule on {line} — 15% below target', 'Bottleneck detected at {machine} in {line}'],
  material_shortage: ['Raw material inventory for aluminum below reorder point', 'Steel sheet inventory critically low — 2 days remaining'],
  quality_issue: ['Defect rate spike to 4.8% on {line}', 'Quality deviation detected in batch #B-2847'],
  energy_spike: ['Energy consumption 35% above normal on {machine}', 'Power factor anomaly detected in {line}'],
};

export function generateAlerts(count: number = 15): Alert[] {
  const types: AlertType[] = ['high_temperature', 'abnormal_vibration', 'low_pressure', 'machine_failure_risk', 'production_delay', 'material_shortage', 'quality_issue', 'energy_spike'];
  const severities: AlertSeverity[] = ['critical', 'warning', 'warning', 'info'];
  const machines = MACHINE_NAMES.slice(0, 10);

  return Array.from({ length: count }, (_, i) => {
    const type = pick(types);
    const machine = pick(machines);
    const line = pick(LINES);
    const message = pick(ALERT_MESSAGES[type])
      .replace('{machine}', machine)
      .replace('{line}', line);

    return {
      id: `alert-${generateId()}`,
      type,
      severity: type === 'machine_failure_risk' || type === 'high_temperature' ? 'critical' : pick(severities),
      message,
      machine,
      line,
      timestamp: new Date(Date.now() - randInt(0, 7200) * 1000).toISOString(),
      acknowledged: Math.random() > 0.6,
      channels: ['email', 'push'] as ('email' | 'sms' | 'push' | 'whatsapp')[],
    };
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

// ─── AI Predictions ──────────────────────────────────────

function genFeatures(): FeatureImportance[] {
  const features = [
    'Tool Wear (min)', 'Torque (Nm)', 'Process Temp (°C)', 'Air Temp (°C)',
    'Rotational Speed (RPM)', 'Vibration Level (mm/s)', 'Power Consumption (kW)',
    'CMAPSS Sensor S4', 'MIMII Acoustic Level (dB)', 'Tennessee Eastman Pressure',
    'SECOM Sensor 590', 'Oil Viscosity (%)',
  ];
  return features.slice(0, randInt(5, 8)).map(name => ({
    name,
    importance: parseFloat(rand(0.02, 0.25).toFixed(3)),
    direction: Math.random() > 0.5 ? 'positive' as const : 'negative' as const,
  })).sort((a, b) => b.importance - a.importance);
}

export function generatePredictions(): Prediction[] {
  return [
    { id: 'pred-1', type: 'efficiency', title: 'Production Efficiency', value: `${rand(82, 96).toFixed(1)}%`, confidence: parseFloat(rand(0.85, 0.97).toFixed(2)), trend: 'up', features: genFeatures(), explanation: 'Based on current machine utilization patterns and historical throughput data, efficiency is projected to increase due to optimized cycle times across Line A and Line B.', timestamp: new Date().toISOString() },
    { id: 'pred-2', type: 'failure', title: 'Machine Failure Risk', value: 'CNC Lathe Alpha', confidence: parseFloat(rand(0.78, 0.95).toFixed(2)), trend: 'up', features: genFeatures(), explanation: 'Vibration patterns and temperature trends on CNC Lathe Alpha match historical failure signatures. Bearing replacement recommended within 48 hours.', timestamp: new Date().toISOString() },
    { id: 'pred-3', type: 'downtime', title: 'Predicted Downtime', value: `${rand(2, 8).toFixed(1)} hrs`, confidence: parseFloat(rand(0.80, 0.93).toFixed(2)), trend: 'down', features: genFeatures(), explanation: 'Scheduled maintenance and predicted micro-stops suggest total downtime reduction compared to last week.', timestamp: new Date().toISOString() },
    { id: 'pred-4', type: 'maintenance', title: 'Next Maintenance', value: `${randInt(3, 14)} days`, confidence: parseFloat(rand(0.82, 0.96).toFixed(2)), trend: 'stable', features: genFeatures(), explanation: 'Based on wear patterns and operational hours, the next maintenance window is optimally scheduled to minimize production impact.', timestamp: new Date().toISOString() },
    { id: 'pred-5', type: 'energy', title: 'Energy Consumption', value: `${rand(450, 680).toFixed(0)} kWh`, confidence: parseFloat(rand(0.88, 0.96).toFixed(2)), trend: 'down', features: genFeatures(), explanation: 'Energy optimization algorithms predict 12% reduction through intelligent load balancing across shifts.', timestamp: new Date().toISOString() },
    { id: 'pred-6', type: 'quality', title: 'Production Quality', value: `${rand(96, 99.5).toFixed(1)}%`, confidence: parseFloat(rand(0.84, 0.95).toFixed(2)), trend: 'up', features: genFeatures(), explanation: 'Quality metrics trending upward due to calibration improvements and material batch consistency.', timestamp: new Date().toISOString() },
    { id: 'pred-7', type: 'material', title: 'Material Consumption', value: `${rand(12, 25).toFixed(1)} tons`, confidence: parseFloat(rand(0.80, 0.92).toFixed(2)), trend: 'stable', features: genFeatures(), explanation: 'Material usage prediction aligned with current production volume targets and waste reduction initiatives.', timestamp: new Date().toISOString() },
    { id: 'pred-8', type: 'bottleneck', title: 'Bottleneck Prediction', value: 'Mill Station 2', confidence: parseFloat(rand(0.75, 0.90).toFixed(2)), trend: 'up', features: genFeatures(), explanation: 'Queue analysis identifies Mill Station 2 as emerging bottleneck due to increasing cycle times and upstream throughput growth.', timestamp: new Date().toISOString() },
  ];
}

// ─── Deep Learning Models ────────────────────────────────

export function generateDLModels(): DeepLearningModel[] {
  return [
    { id: 'dl-1', name: 'Production Forecaster', type: 'lstm', accuracy: parseFloat(rand(0.91, 0.97).toFixed(3)), loss: parseFloat(rand(0.02, 0.08).toFixed(4)), epochs: 150, status: 'deployed', lastTrained: new Date(Date.now() - 2 * 86400000).toISOString() },
    { id: 'dl-2', name: 'Failure Predictor', type: 'transformer', accuracy: parseFloat(rand(0.88, 0.95).toFixed(3)), loss: parseFloat(rand(0.03, 0.10).toFixed(4)), epochs: 200, status: 'deployed', lastTrained: new Date(Date.now() - 1 * 86400000).toISOString() },
    { id: 'dl-3', name: 'Energy Optimizer', type: 'gru', accuracy: parseFloat(rand(0.85, 0.93).toFixed(3)), loss: parseFloat(rand(0.04, 0.12).toFixed(4)), epochs: 120, status: 'ready', lastTrained: new Date(Date.now() - 5 * 86400000).toISOString() },
    { id: 'dl-4', name: 'Quality Classifier', type: 'lstm', accuracy: parseFloat(rand(0.93, 0.98).toFixed(3)), loss: parseFloat(rand(0.01, 0.05).toFixed(4)), epochs: 180, status: 'deployed', lastTrained: new Date(Date.now() - 3 * 86400000).toISOString() },
    { id: 'dl-5', name: 'Anomaly Detector', type: 'transformer', accuracy: parseFloat(rand(0.90, 0.96).toFixed(3)), loss: parseFloat(rand(0.02, 0.07).toFixed(4)), epochs: 250, status: 'training', lastTrained: new Date().toISOString() },
  ];
}

// ─── NLP Analysis ────────────────────────────────────────

export function generateNLPAnalysis(text: string): NLPAnalysis {
  return {
    text,
    sentiment: { label: pick(['Positive', 'Neutral', 'Negative', 'Concerned']), score: parseFloat(rand(-1, 1).toFixed(2)) },
    entities: [
      { text: 'CNC Lathe Alpha', type: 'MACHINE', start: 0, end: 15 },
      { text: 'bearing assembly', type: 'COMPONENT', start: 20, end: 36 },
      { text: 'Line A', type: 'PRODUCTION_LINE', start: 40, end: 46 },
      { text: '48 hours', type: 'TIME', start: 50, end: 58 },
    ],
    keywords: [
      { word: 'vibration', score: 0.95 },
      { word: 'bearing', score: 0.88 },
      { word: 'maintenance', score: 0.82 },
      { word: 'temperature', score: 0.76 },
      { word: 'replacement', score: 0.71 },
      { word: 'calibration', score: 0.65 },
    ],
    summary: 'Maintenance report indicates elevated vibration levels on CNC Lathe Alpha bearing assembly, with recommended replacement within 48 hours. Temperature readings within acceptable range but trending upward.',
    recommendations: [
      'Schedule bearing replacement for CNC Lathe Alpha during next planned downtime',
      'Increase vibration monitoring frequency from hourly to every 15 minutes',
      'Order replacement bearings (Part #BRG-4420) — current inventory: 2 units',
      'Review temperature calibration on Line A heat sensors',
    ],
  };
}

// ─── Agent Actions ───────────────────────────────────────

export function generateAgentActions(): AgentAction[] {
  return [
    { id: 'agent-1', agent: 'Sensor Monitor', type: 'monitor', description: 'Scanning 156 active sensors across 5 production lines', status: 'completed', timestamp: new Date(Date.now() - 30000).toISOString(), confidence: 0.99, requiresApproval: false, impact: 'low' },
    { id: 'agent-2', agent: 'Anomaly Detector', type: 'detect', description: 'Detected abnormal vibration pattern on Welding Robot R1 — 2.3σ deviation', status: 'completed', timestamp: new Date(Date.now() - 25000).toISOString(), confidence: 0.94, requiresApproval: false, impact: 'medium' },
    { id: 'agent-3', agent: 'Maintenance Planner', type: 'recommend', description: 'Recommending preventive maintenance for Welding Robot R1 in next 72 hours', status: 'pending', timestamp: new Date(Date.now() - 20000).toISOString(), confidence: 0.89, requiresApproval: true, impact: 'medium' },
    { id: 'agent-4', agent: 'Production Optimizer', type: 'execute', description: 'Auto-adjusted Line C speed from 92% to 88% to reduce defect rate', status: 'approved', timestamp: new Date(Date.now() - 15000).toISOString(), confidence: 0.91, requiresApproval: true, impact: 'high' },
    { id: 'agent-5', agent: 'Energy Manager', type: 'execute', description: 'Shifted peak-hour loads to off-peak — estimated $2,400/day savings', status: 'completed', timestamp: new Date(Date.now() - 10000).toISOString(), confidence: 0.96, requiresApproval: false, impact: 'medium' },
    { id: 'agent-6', agent: 'Quality Controller', type: 'detect', description: 'Batch #B-2851 showing 0.8% higher defect rate — investigating root cause', status: 'completed', timestamp: new Date(Date.now() - 5000).toISOString(), confidence: 0.87, requiresApproval: false, impact: 'medium' },
    { id: 'agent-7', agent: 'Resource Allocator', type: 'recommend', description: 'Proposing machine reallocation: Move Assembly Bot A2 from Line B to Line A', status: 'pending', timestamp: new Date().toISOString(), confidence: 0.83, requiresApproval: true, impact: 'high' },
    { id: 'agent-8', agent: 'Learning Engine', type: 'learn', description: 'Updated failure prediction model with latest maintenance data — accuracy improved 1.2%', status: 'completed', timestamp: new Date(Date.now() - 3600000).toISOString(), confidence: 0.95, requiresApproval: false, impact: 'low' },
  ];
}

// ─── Time Series Data ────────────────────────────────────

export function generateTimeSeries(points: number, base: number, variance: number, trend: number = 0): TimeSeriesPoint[] {
  const data: TimeSeriesPoint[] = [];
  const now = new Date();
  let value = base;

  for (let i = points - 1; i >= 0; i--) {
    value = value + trend + (Math.random() - 0.5) * variance * 2;
    value = Math.max(0, value);
    const predicted = value + (Math.random() - 0.5) * variance;
    data.push({
      timestamp: new Date(now.getTime() - i * 3600000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      value: parseFloat(value.toFixed(1)),
      predicted: parseFloat(predicted.toFixed(1)),
      lower: parseFloat((predicted - variance * 0.5).toFixed(1)),
      upper: parseFloat((predicted + variance * 0.5).toFixed(1)),
    });
  }
  return data;
}

// ─── OEE Data ────────────────────────────────────────────

export function generateOEE(): OEEData {
  const availability = parseFloat(rand(88, 97).toFixed(1));
  const performance = parseFloat(rand(82, 95).toFixed(1));
  const quality = parseFloat(rand(95, 99.5).toFixed(1));
  return {
    availability,
    performance,
    quality,
    overall: parseFloat(((availability * performance * quality) / 10000).toFixed(1)),
  };
}

// ─── Generative Scenarios ────────────────────────────────

export function generateScenarios(): GenerativeScenario[] {
  return [
    { id: 'gen-1', name: 'Synthetic Sensor Data', type: 'sensor_data', status: 'idle', parameters: { duration: '24h', machines: 30, frequency: '1s' } },
    { id: 'gen-2', name: 'Machine Breakdown Simulation', type: 'breakdown', status: 'idle', parameters: { machine: 'CNC Lathe Alpha', failureType: 'Bearing Wear', timeline: '72h' } },
    { id: 'gen-3', name: 'Demand Forecasting', type: 'demand', status: 'complete', parameters: { horizon: '30 days', products: 12 }, results: { peakDay: 'Day 14', avgDemand: '2,450 units', confidence: '91%' } },
    { id: 'gen-4', name: 'Material Shortage Impact', type: 'shortage', status: 'idle', parameters: { material: 'Aluminum 6061', shortageLevel: '40%', duration: '2 weeks' } },
    { id: 'gen-5', name: 'Production Optimization Plan', type: 'optimization', status: 'complete', parameters: { targetOEE: '90%', constraints: 'budget' }, results: { projectedOEE: '91.2%', costReduction: '$45,000/month', implementationDays: '14' } },
  ];
}

// ─── Chat Messages (pre-seeded) ──────────────────────────

export function generateChatHistory(): ChatMessage[] {
  return [
    { id: '1', role: 'assistant', content: "Welcome to FactoryMind AI Assistant! I can help you with production reports, machine diagnostics, maintenance scheduling, and factory analytics. What would you like to know?", timestamp: new Date(Date.now() - 300000).toISOString() },
  ];
}

// ─── KPI Summary Data ────────────────────────────────────

export function generateKPIs() {
  return [
    { label: 'Overall OEE', value: `${rand(82, 92).toFixed(1)}%`, unit: '', change: parseFloat(rand(-2, 5).toFixed(1)), changeType: 'increase' as const, icon: 'Gauge', color: '#0ea5e9' },
    { label: 'Production Rate', value: formatKPI(randInt(4200, 5800)), unit: 'units/hr', change: parseFloat(rand(1, 8).toFixed(1)), changeType: 'increase' as const, icon: 'TrendingUp', color: '#22c55e' },
    { label: 'Total Downtime', value: `${rand(1.2, 4.5).toFixed(1)}h`, unit: 'today', change: parseFloat(rand(-15, -2).toFixed(1)), changeType: 'decrease' as const, icon: 'Clock', color: '#f97316' },
    { label: 'Defect Rate', value: `${rand(0.8, 2.5).toFixed(2)}%`, unit: '', change: parseFloat(rand(-5, -0.5).toFixed(1)), changeType: 'decrease' as const, icon: 'AlertTriangle', color: '#ef4444' },
    { label: 'Energy Usage', value: `${rand(420, 580).toFixed(0)}`, unit: 'kWh', change: parseFloat(rand(-8, -1).toFixed(1)), changeType: 'decrease' as const, icon: 'Zap', color: '#8b5cf6' },
    { label: 'Revenue Today', value: `$${formatKPI(randInt(120000, 280000))}`, unit: '', change: parseFloat(rand(2, 12).toFixed(1)), changeType: 'increase' as const, icon: 'DollarSign', color: '#06b6d4' },
    { label: 'Machines Online', value: `${randInt(25, 29)}/30`, unit: '', change: 0, changeType: 'increase' as const, icon: 'Server', color: '#22c55e' },
    { label: 'Active Alerts', value: `${randInt(3, 12)}`, unit: '', change: parseFloat(rand(-3, 2).toFixed(0)), changeType: 'decrease' as const, icon: 'Bell', color: '#f97316' },
  ];
}

function formatKPI(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

// ─── Analytics ───────────────────────────────────────────

export function generateAnalyticsData() {
  return {
    downtimeReasons: [
      { reason: 'Mechanical Failure', hours: parseFloat(rand(8, 18).toFixed(1)) },
      { reason: 'Material Shortage', hours: parseFloat(rand(5, 12).toFixed(1)) },
      { reason: 'Planned Maintenance', hours: parseFloat(rand(10, 20).toFixed(1)) },
      { reason: 'Operator Error', hours: parseFloat(rand(2, 6).toFixed(1)) },
      { reason: 'Quality Hold', hours: parseFloat(rand(3, 8).toFixed(1)) },
      { reason: 'Setup/Changeover', hours: parseFloat(rand(4, 10).toFixed(1)) },
      { reason: 'Power Outage', hours: parseFloat(rand(1, 4).toFixed(1)) },
    ].sort((a, b) => b.hours - a.hours),

    machineUtilization: MACHINE_NAMES.slice(0, 12).map(name => ({
      machine: name.split(' ').slice(-1)[0],
      utilization: parseFloat(rand(55, 98).toFixed(1)),
    })),

    productionByShift: [
      { shift: 'Morning (6AM-2PM)', output: randInt(3500, 4500), target: 4000, efficiency: parseFloat(rand(85, 98).toFixed(1)) },
      { shift: 'Afternoon (2PM-10PM)', output: randInt(3200, 4200), target: 4000, efficiency: parseFloat(rand(82, 96).toFixed(1)) },
      { shift: 'Night (10PM-6AM)', output: randInt(2800, 3800), target: 3500, efficiency: parseFloat(rand(78, 92).toFixed(1)) },
    ],

    defectsByCategory: [
      { category: 'Dimensional', count: randInt(12, 35) },
      { category: 'Surface', count: randInt(8, 25) },
      { category: 'Material', count: randInt(5, 15) },
      { category: 'Assembly', count: randInt(3, 12) },
      { category: 'Electrical', count: randInt(2, 8) },
    ],

    energyByLine: LINES.map(line => ({
      line,
      consumption: parseFloat(rand(80, 200).toFixed(1)),
      cost: parseFloat(rand(400, 1200).toFixed(0)),
    })),

    weeklyOEE: Array.from({ length: 7 }, (_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      oee: parseFloat(rand(75, 93).toFixed(1)),
      availability: parseFloat(rand(85, 97).toFixed(1)),
      performance: parseFloat(rand(80, 95).toFixed(1)),
      quality: parseFloat(rand(94, 99).toFixed(1)),
    })),

    monthlyRevenue: Array.from({ length: 12 }, (_, i) => ({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      revenue: randInt(2000000, 4500000),
      cost: randInt(1500000, 3000000),
    })),

    materialWaste: [
      { material: 'Steel', waste: parseFloat(rand(2, 5).toFixed(1)), target: 3.0 },
      { material: 'Aluminum', waste: parseFloat(rand(1.5, 4).toFixed(1)), target: 2.5 },
      { material: 'Plastic', waste: parseFloat(rand(3, 7).toFixed(1)), target: 4.0 },
      { material: 'Copper', waste: parseFloat(rand(1, 3).toFixed(1)), target: 1.5 },
      { material: 'Rubber', waste: parseFloat(rand(2, 5).toFixed(1)), target: 3.5 },
    ],
  };
}
