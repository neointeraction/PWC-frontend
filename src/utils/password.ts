import { z } from 'zod';

// New-password policy — mirrors the backend's newPasswordSchema (PWC-backend
// src/modules/auth/auth.schema.ts). Keep the two in sync.
export const PASSWORD_RULES = [
  { id: 'length', label: 'At least 10 characters', test: (p: string) => p.length >= 10 },
  { id: 'lower', label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { id: 'upper', label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { id: 'number', label: 'One number', test: (p: string) => /\d/.test(p) },
  { id: 'special', label: 'One special character (e.g. @ # $ % !)', test: (p: string) => /[^A-Za-z0-9\s]/.test(p) },
  { id: 'spaces', label: 'No spaces', test: (p: string) => p.length === 0 || /^\S+$/.test(p) },
] as const;

export const isValidPassword = (password: string): boolean => PASSWORD_RULES.every(r => r.test(password));

export const passwordSchema = z
  .string()
  .min(10, 'Password must be at least 10 characters')
  .max(200)
  .regex(/[a-z]/, 'Password must include a lowercase letter')
  .regex(/[A-Z]/, 'Password must include an uppercase letter')
  .regex(/\d/, 'Password must include a number')
  .regex(/[^A-Za-z0-9\s]/, 'Password must include a special character')
  .regex(/^\S+$/, 'Password must not contain spaces');
