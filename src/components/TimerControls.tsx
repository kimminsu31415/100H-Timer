import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import { TimerState } from '../types';

interface TimerControlsProps {
  timerState: TimerState;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  timerState,
  onStart,
  onPause,
  onResume,
  onReset,
}) => {
  const getMainButtonAction = () => {
    if (!timerState.isRunning && !timerState.isPaused) {
      return { text: '시작', action: onStart, color: COLORS.success };
    } else if (timerState.isRunning) {
      return { text: '일시정지', action: onPause, color: COLORS.warning };
    } else {
      return { text: '재개', action: onResume, color: COLORS.success };
    }
  };

  const mainButton = getMainButtonAction();

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        {/* Main Control Button */}
        <TouchableOpacity
          style={[styles.mainButton, { backgroundColor: mainButton.color }]}
          onPress={mainButton.action}
          activeOpacity={0.8}
        >
          <Text style={styles.mainButtonText}>{mainButton.text}</Text>
        </TouchableOpacity>
      </View>

      {/* Reset Button */}
      {(timerState.isRunning ||
        timerState.isPaused ||
        timerState.elapsedTime > 0) && (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={onReset}
            activeOpacity={0.8}
          >
            <Text style={styles.resetButtonText}>초기화</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
  buttonRow: {
    alignItems: 'center',
  },
  mainButton: {
    width: 200,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  mainButtonText: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  resetButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  resetButtonText: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: '600',
  },
});
