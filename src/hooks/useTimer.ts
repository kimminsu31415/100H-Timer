import { useState, useEffect, useRef, useCallback } from 'react';
import { AppState as RNAppState } from 'react-native';
import * as KeepAwake from 'expo-keep-awake';
import * as Haptics from 'expo-haptics';
import { TimerState, TimerSettings, AppState, TimerAction } from '../types';
import { TOTAL_TIME_MS, UPDATE_INTERVAL, DEFAULT_SETTINGS } from '../constants';
import {
  formatTime,
  calculateElapsedTime,
  isTimerComplete,
} from '../utils/timeUtils';
import {
  saveTimerState,
  loadTimerState,
  saveSettings,
  loadSettings,
} from '../utils/storageUtils';

const initialState: TimerState = {
  isRunning: false,
  isPaused: false,
  elapsedTime: 0,
  totalTime: TOTAL_TIME_MS,
  startTime: null,
  pauseTime: null,
};

export const useTimer = () => {
  const [timerState, setTimerState] = useState<TimerState>(initialState);
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const appStateRef = useRef(RNAppState.currentState);

  // Load saved state on mount
  useEffect(() => {
    loadSavedState();
  }, []);

  // Handle app state changes
  useEffect(() => {
    const subscription = RNAppState.addEventListener(
      'change',
      handleAppStateChange
    );
    return () => subscription?.remove();
  }, [timerState]);

  const loadSavedState = async () => {
    try {
      const savedState = await loadTimerState();
      const savedSettings = await loadSettings();

      if (savedState) {
        setTimerState(savedState.timer);
        setSettings(savedSettings || DEFAULT_SETTINGS);
      }
    } catch (error) {
      console.error('Failed to load saved state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppStateChange = (nextAppState: string) => {
    if (
      appStateRef.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // App came to foreground
      if (timerState.isRunning && !timerState.isPaused) {
        updateElapsedTime();
      }
    }
    appStateRef.current = nextAppState;
  };

  const updateElapsedTime = useCallback(() => {
    if (timerState.startTime && timerState.isRunning && !timerState.isPaused) {
      const currentElapsed = calculateElapsedTime(
        timerState.startTime,
        timerState.pauseTime
      );
      setTimerState((prev) => ({
        ...prev,
        elapsedTime: currentElapsed,
      }));
    }
  }, [
    timerState.startTime,
    timerState.isRunning,
    timerState.isPaused,
    timerState.pauseTime,
  ]);

  const startTimer = useCallback(async () => {
    const now = Date.now();
    const newState: TimerState = {
      ...timerState,
      isRunning: true,
      isPaused: false,
      startTime: now,
      pauseTime: null,
    };

    setTimerState(newState);

    if (settings.keepAwakeEnabled) {
      KeepAwake.activate();
    }

    if (settings.vibrationEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    // Start interval
    intervalRef.current = setInterval(updateElapsedTime, UPDATE_INTERVAL);
  }, [timerState, settings]);

  const pauseTimer = useCallback(async () => {
    const now = Date.now();
    const newState: TimerState = {
      ...timerState,
      isRunning: false,
      isPaused: true,
      pauseTime: now,
    };

    setTimerState(newState);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (settings.keepAwakeEnabled) {
      KeepAwake.deactivate();
    }

    if (settings.vibrationEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [timerState, settings]);

  const resumeTimer = useCallback(async () => {
    const now = Date.now();
    const pauseDuration = now - (timerState.pauseTime || now);
    const newStartTime = (timerState.startTime || now) + pauseDuration;

    const newState: TimerState = {
      ...timerState,
      isRunning: true,
      isPaused: false,
      startTime: newStartTime,
      pauseTime: null,
    };

    setTimerState(newState);

    if (settings.keepAwakeEnabled) {
      KeepAwake.activate();
    }

    if (settings.vibrationEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    // Start interval
    intervalRef.current = setInterval(updateElapsedTime, UPDATE_INTERVAL);
  }, [timerState, settings]);

  const resetTimer = useCallback(async () => {
    setTimerState(initialState);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (settings.keepAwakeEnabled) {
      KeepAwake.deactivate();
    }

    if (settings.vibrationEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  }, [settings]);

  const updateSettings = useCallback(
    async (newSettings: Partial<TimerSettings>) => {
      const updatedSettings = { ...settings, ...newSettings };
      setSettings(updatedSettings);
      await saveSettings(updatedSettings);
    },
    [settings]
  );

  // Save state periodically
  useEffect(() => {
    const saveInterval = setInterval(async () => {
      if (!isLoading) {
        const appState: AppState = {
          timer: timerState,
          settings,
          lastSavedTime: Date.now(),
        };
        await saveTimerState(appState);
      }
    }, 5000); // Save every 5 seconds

    return () => clearInterval(saveInterval);
  }, [timerState, settings, isLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      KeepAwake.deactivate();
    };
  }, []);

  const formattedTime = formatTime(timerState.elapsedTime);
  const isComplete = isTimerComplete(timerState.elapsedTime);

  return {
    timerState,
    settings,
    isLoading,
    formattedTime,
    isComplete,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    updateSettings,
  };
};
