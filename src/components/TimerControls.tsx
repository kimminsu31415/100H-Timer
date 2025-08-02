import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

interface TimerControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  isPaused,
  isCompleted,
  onToggle,
  onReset,
}) => {
  const getMainButtonText = () => {
    if (isCompleted) return '다시 시작';
    if (!isRunning) return '시작';
    if (isPaused) return '재개';
    return '일시정지';
  };

  const getMainButtonColor = () => {
    if (isCompleted) return COLORS.success;
    if (!isRunning) return COLORS.success;
    if (isPaused) return COLORS.primary;
    return COLORS.warning;
  };

  const mainButtonColor = getMainButtonColor();

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        {/* Main Control Button */}
        <TouchableOpacity
          style={[styles.mainButton, { backgroundColor: mainButtonColor }]}
          onPress={onToggle}
          activeOpacity={0.8}
        >
          <Text style={styles.mainButtonText}>{getMainButtonText()}</Text>
        </TouchableOpacity>
      </View>

      {/* Reset Button */}
      {(isRunning || isPaused || isCompleted) && (
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
