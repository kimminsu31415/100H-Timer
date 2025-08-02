import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { TimerDisplay } from './src/components/TimerDisplay';
import { TimerControls } from './src/components/TimerControls';
import { useCountdownTimer } from './src/hooks/useCountdownTimer';
import { COLORS } from './src/constants';

export default function App() {
  const { timerState, formatTime, toggleTimer, resetTimer, isCompleted } =
    useCountdownTimer();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>100시간 타이머</Text>
        <Text style={styles.subtitle}>
          {isCompleted ? '🎉 목표 달성!' : '⏱️ 카운트다운 타이머'}
        </Text>

        <TimerDisplay
          formattedTime={formatTime(timerState.timeLeft)}
          progress={timerState.progress}
          isRunning={timerState.isRunning}
          isPaused={timerState.isPaused}
          isCompleted={isCompleted}
        />

        <TimerControls
          isRunning={timerState.isRunning}
          isPaused={timerState.isPaused}
          isCompleted={isCompleted}
          onToggle={toggleTimer}
          onReset={resetTimer}
        />

        <Text style={styles.status}>
          {isCompleted
            ? '✅ 100시간 완료! 축하합니다!'
            : '💪 목표를 향해 달려가세요!'}
        </Text>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: 100,
    fontWeight: '600',
    textAlign: 'center',
  },
  status: {
    color: COLORS.success,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 20,
  },
});
