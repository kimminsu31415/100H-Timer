import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../constants';

interface TimerDisplayProps {
  formattedTime: string;
  progress: number;
  isRunning: boolean;
  isPaused: boolean;
  isCompleted: boolean;
}

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = Math.min(width * 0.7, 300);
const STROKE_WIDTH = 8;

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  formattedTime,
  progress,
  isRunning,
  isPaused,
  isCompleted,
}) => {
  const radius = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getStatusText = () => {
    if (isCompleted) return '완료!';
    if (isPaused) return '일시정지됨';
    if (isRunning) return '실행 중...';
    return '준비됨';
  };

  const getStatusColor = () => {
    if (isCompleted) return COLORS.success;
    if (isPaused) return COLORS.warning;
    if (isRunning) return COLORS.primary;
    return COLORS.textSecondary;
  };

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
          <Text style={[styles.progressText, { color: getStatusColor() }]}>
            {progress}% 완료
          </Text>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
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
    marginTop: 8,
    fontWeight: '500',
  },
  statusText: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '400',
  },
});
