import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';
import { AppState, TimerSettings } from '../types';

export const saveTimerState = async (state: AppState): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.TIMER_STATE, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save timer state:', error);
  }
};

export const loadTimerState = async (): Promise<AppState | null> => {
  try {
    const savedState = await AsyncStorage.getItem(STORAGE_KEYS.TIMER_STATE);
    return savedState ? JSON.parse(savedState) : null;
  } catch (error) {
    console.error('Failed to load timer state:', error);
    return null;
  }
};

export const saveSettings = async (settings: TimerSettings): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
};

export const loadSettings = async (): Promise<TimerSettings | null> => {
  try {
    const savedSettings = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
    return savedSettings ? JSON.parse(savedSettings) : null;
  } catch (error) {
    console.error('Failed to load settings:', error);
    return null;
  }
};

export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.TIMER_STATE,
      STORAGE_KEYS.SETTINGS,
      STORAGE_KEYS.LAST_SAVED_TIME,
    ]);
  } catch (error) {
    console.error('Failed to clear data:', error);
  }
};
