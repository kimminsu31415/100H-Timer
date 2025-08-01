import { TOTAL_TIME_MS } from '../constants';

export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const formatProgress = (elapsed: number): number => {
  return Math.min((elapsed / TOTAL_TIME_MS) * 100, 100);
};

export const calculateRemainingTime = (elapsed: number): number => {
  return Math.max(TOTAL_TIME_MS - elapsed, 0);
};

export const isTimerComplete = (elapsed: number): boolean => {
  return elapsed >= TOTAL_TIME_MS;
};

export const getCurrentTimestamp = (): number => {
  return Date.now();
};

export const calculateElapsedTime = (
  startTime: number,
  pauseTime?: number
): number => {
  const endTime = pauseTime || getCurrentTimestamp();
  return endTime - startTime;
};
