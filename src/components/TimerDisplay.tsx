import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../constants';
import { formatProgress } from '../utils/timeUtils';
import { TimerState } from '../types';

interface TimerDisplayProps {
  timerState: TimerState;
  formattedTime: string;
}

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = Math.min(width * 0.7, 300);
const STROKE_WIDTH = 8;

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timerState,
  formattedTime,
}) => {
  const progress = formatProgress(timerState.elapsedTime);
  const radius = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        {/* Background Circle */}
        <View style={[styles.circle, styles.backgroundCircle]} />

        {/* Progress Circle */}
        <View style={[styles.circle, styles.progressCircle]}>
          <View
            style={[
              styles.progressArc,
              {
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
                borderRadius: CIRCLE_SIZE / 2,
                borderWidth: STROKE_WIDTH,
                borderColor: COLORS.primary,
                borderTopColor: 'transparent',
                borderRightColor: 'transparent',
                transform: [{ rotate: '-90deg' }, { scale: progress / 100 }],
              },
            ]}
          />
        </View>

        {/* Time Display */}
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formattedTime}</Text>
          <Text style={styles.progressText}>{progress.toFixed(1)}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  circleContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  backgroundCircle: {
    backgroundColor: COLORS.surface,
    borderWidth: STROKE_WIDTH,
    borderColor: COLORS.textSecondary,
  },
  progressCircle: {
    backgroundColor: 'transparent',
  },
  progressArc: {
    position: 'absolute',
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.text,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  progressText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 8,
    fontWeight: '500',
  },
});
