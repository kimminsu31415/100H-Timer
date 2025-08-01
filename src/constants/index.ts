// Timer Constants
export const TOTAL_TIME_MS = 100 * 60 * 60 * 1000; // 100 hours in milliseconds
export const UPDATE_INTERVAL = 100; // Update timer every 100ms for smooth display

// Storage Keys
export const STORAGE_KEYS = {
  TIMER_STATE: 'timer_state',
  SETTINGS: 'settings',
  LAST_SAVED_TIME: 'last_saved_time',
} as const;

// Default Settings
export const DEFAULT_SETTINGS = {
  vibrationEnabled: true,
  soundEnabled: true,
  keepAwakeEnabled: true,
  notificationEnabled: true,
} as const;

// Colors
export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  danger: '#FF3B30',
  background: '#1a1a1a',
  surface: '#2c2c2c',
  text: '#ffffff',
  textSecondary: '#8e8e93',
} as const;

// Time Formatting
export const TIME_FORMATS = {
  hours: 'HH',
  minutes: 'mm',
  seconds: 'ss',
  full: 'HH:mm:ss',
} as const;
