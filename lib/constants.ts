// FactoryMind AI — Constants & Configuration

import type { NavigationItem } from '@/types';

export const APP_NAME = 'FactoryMind AI';
export const APP_TAGLINE = 'AI That Runs Smart Factories.';

export const COLORS = {
  primary: '#0ea5e9',
  primaryDark: '#0284c7',
  accent: '#06b6d4',
  warning: '#f97316',
  danger: '#ef4444',
  success: '#22c55e',
  purple: '#8b5cf6',
  pink: '#ec4899',
  bgPrimary: '#0a0e1a',
  bgSecondary: '#0f1629',
  bgCard: '#111827',
  bgGlass: 'rgba(17,24,39,0.7)',
  border: 'rgba(255,255,255,0.08)',
  borderLight: 'rgba(255,255,255,0.12)',
  textPrimary: '#f1f5f9',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
};

export const NAVIGATION: NavigationItem[] = [
  { label: 'Overview', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Production', href: '/dashboard/production', icon: 'Factory' },
  { label: 'Machines', href: '/dashboard/machines', icon: 'Cog' },
  { label: 'AI Predictions', href: '/dashboard/ai-predictions', icon: 'Brain' },
  { label: 'Deep Learning', href: '/dashboard/deep-learning', icon: 'Network' },
  { label: 'NLP Analysis', href: '/dashboard/nlp', icon: 'FileText' },
  { label: 'AI Assistant', href: '/dashboard/assistant', icon: 'Bot' },
  { label: 'Generative AI', href: '/dashboard/generative', icon: 'Sparkles' },
  { label: 'Agentic AI', href: '/dashboard/agents', icon: 'Workflow' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: 'BarChart3' },
  { label: 'Alerts', href: '/dashboard/alerts', icon: 'Bell' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
];

export const ROLE_LABELS: Record<string, string> = {
  factory_admin: 'Factory Admin',
  production_manager: 'Production Manager',
  plant_supervisor: 'Plant Supervisor',
  machine_operator: 'Machine Operator',
  maintenance_engineer: 'Maintenance Engineer',
  quality_inspector: 'Quality Inspector',
  ai_engineer: 'AI Engineer',
  ceo: 'CEO',
};

export const MACHINE_TYPES = [
  'CNC Lathe',
  'Milling Machine',
  'Injection Molder',
  'Press Brake',
  'Welding Robot',
  'Assembly Robot',
  'Conveyor Belt',
  'Packaging Unit',
  'Quality Scanner',
  'Paint Booth',
];

export const PRODUCTION_LINES = [
  { id: 'line-a', name: 'Assembly Line A', machines: 8 },
  { id: 'line-b', name: 'Assembly Line B', machines: 6 },
  { id: 'line-c', name: 'Machining Line C', machines: 10 },
  { id: 'line-d', name: 'Packaging Line D', machines: 5 },
  { id: 'line-e', name: 'Quality Line E', machines: 4 },
];

export const SENSOR_THRESHOLDS = {
  temperature: { min: 20, max: 85, critical: 95, unit: '°C' },
  airTemperature: { min: 15, max: 35, critical: 42, unit: '°C' },
  processTemperature: { min: 30, max: 85, critical: 95, unit: '°C' },
  pressure: { min: 1.0, max: 6.0, critical: 7.5, unit: 'bar' },
  voltage: { min: 210, max: 240, critical: 250, unit: 'V' },
  current: { min: 0, max: 30, critical: 40, unit: 'A' },
  power: { min: 0, max: 25, critical: 35, unit: 'kW' },
  rpm: { min: 0, max: 3000, critical: 3500, unit: 'RPM' },
  torque: { min: 10, max: 70, critical: 85, unit: 'Nm' },
  vibration: { min: 0, max: 5.0, critical: 8.0, unit: 'mm/s' },
  humidity: { min: 30, max: 70, critical: 85, unit: '%' },
  oilLevel: { min: 20, max: 100, critical: 15, unit: '%' },
  toolWear: { min: 0, max: 200, critical: 240, unit: 'min' },
  energyConsumption: { min: 0, max: 50, critical: 65, unit: 'kWh' },
  failureProbability: { min: 0, max: 20, critical: 75, unit: '%' },
};

export const ALERT_TYPE_LABELS: Record<string, string> = {
  high_temperature: 'High Temperature',
  abnormal_vibration: 'Abnormal Vibration',
  low_pressure: 'Low Pressure',
  machine_failure_risk: 'Machine Failure Risk',
  production_delay: 'Production Delay',
  material_shortage: 'Material Shortage',
  quality_issue: 'Quality Issue',
  energy_spike: 'Energy Spike',
};

export const CHART_COLORS = [
  '#10b981', '#f59e0b', '#a855f7', '#84cc16',
  '#f43f5e', '#fb923c', '#eab308', '#ec4899',
  '#14b8a6', '#d97706', '#9333ea', '#65a30d',
];
