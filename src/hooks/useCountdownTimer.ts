import { useState, useEffect, useRef, useCallback } from 'react';

interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  timeLeft: number;
  progress: number;
}

const TOTAL_TIME = 100 * 60 * 60; // 100시간을 초 단위로

export const useCountdownTimer = () => {
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    isPaused: false,
    timeLeft: TOTAL_TIME,
    progress: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 시간 포맷팅 함수
  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // 타이머 시작
  const startTimer = useCallback(() => {
    setTimerState((prev) => ({
      ...prev,
      isRunning: true,
      isPaused: false,
      timeLeft: TOTAL_TIME,
      progress: 0,
    }));
  }, []);

  // 타이머 일시정지
  const pauseTimer = useCallback(() => {
    setTimerState((prev) => ({
      ...prev,
      isPaused: true,
    }));
  }, []);

  // 타이머 재개
  const resumeTimer = useCallback(() => {
    setTimerState((prev) => ({
      ...prev,
      isPaused: false,
    }));
  }, []);

  // 타이머 리셋
  const resetTimer = useCallback(() => {
    setTimerState({
      isRunning: false,
      isPaused: false,
      timeLeft: TOTAL_TIME,
      progress: 0,
    });
  }, []);

  // 타이머 토글 (시작/일시정지/재개)
  const toggleTimer = useCallback(() => {
    if (!timerState.isRunning) {
      startTimer();
    } else if (timerState.isPaused) {
      resumeTimer();
    } else {
      pauseTimer();
    }
  }, [
    timerState.isRunning,
    timerState.isPaused,
    startTimer,
    pauseTimer,
    resumeTimer,
  ]);

  // 타이머 로직
  useEffect(() => {
    if (
      timerState.isRunning &&
      !timerState.isPaused &&
      timerState.timeLeft > 0
    ) {
      intervalRef.current = setInterval(() => {
        setTimerState((prev) => {
          const newTimeLeft = prev.timeLeft - 1;
          const newProgress = Math.round(
            ((TOTAL_TIME - newTimeLeft) / TOTAL_TIME) * 100
          );

          if (newTimeLeft <= 0) {
            return {
              ...prev,
              isRunning: false,
              timeLeft: 0,
              progress: 100,
            };
          }

          return {
            ...prev,
            timeLeft: newTimeLeft,
            progress: newProgress,
          };
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.isRunning, timerState.isPaused, timerState.timeLeft]);

  // 완료 여부
  const isCompleted = timerState.timeLeft === 0;

  return {
    timerState,
    formatTime,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    toggleTimer,
    isCompleted,
  };
};
