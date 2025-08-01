export interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  elapsedTime: number; // milliseconds
  totalTime: number; // milliseconds (100 hours = 360,000,000 ms)
  startTime: number | null;
  pauseTime: number | null;
}

export interface TimerSettings {
  vibrationEnabled: boolean;
  soundEnabled: boolean;
  keepAwakeEnabled: boolean;
  notificationEnabled: boolean;
}

export interface AppState {
  timer: TimerState;
  settings: TimerSettings;
  lastSavedTime: number;
}

export type TimerAction =
  | { type: 'START_TIMER' }
  | { type: 'PAUSE_TIMER' }
  | { type: 'RESUME_TIMER' }
  | { type: 'RESET_TIMER' }
  | { type: 'UPDATE_ELAPSED_TIME'; payload: number }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<TimerSettings> };
