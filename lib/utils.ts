import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number, decimals = 1): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(decimals) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(decimals) + 'K';
  return num.toFixed(decimals);
}

export function formatPercent(num: number): string {
  return num.toFixed(1) + '%';
}

export function formatCurrency(num: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(randomBetween(min, max + 1));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function timeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'running':
    case 'active':
    case 'online':
    case 'completed':
    case 'healthy':
      return '#22c55e';
    case 'idle':
    case 'paused':
    case 'pending':
      return '#f97316';
    case 'maintenance':
    case 'training':
      return '#0ea5e9';
    case 'error':
    case 'critical':
    case 'offline':
    case 'rejected':
      return '#ef4444';
    default:
      return '#94a3b8';
  }
}

export function getHealthLabel(score: number): { label: string; color: string } {
  if (score >= 90) return { label: 'Excellent', color: '#22c55e' };
  if (score >= 75) return { label: 'Good', color: '#06b6d4' };
  if (score >= 50) return { label: 'Fair', color: '#f97316' };
  if (score >= 25) return { label: 'Poor', color: '#ef4444' };
  return { label: 'Critical', color: '#dc2626' };
}

export function generateTimeSeriesData(
  points: number,
  baseValue: number,
  variance: number,
  trend: number = 0
): { time: string; value: number }[] {
  const data: { time: string; value: number }[] = [];
  const now = new Date();
  let value = baseValue;

  for (let i = points - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 1000);
    value = value + trend + randomBetween(-variance, variance);
    value = Math.max(0, value);
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      value: parseFloat(value.toFixed(1)),
    });
  }
  return data;
}
