# 100시간 타이머 앱

구글 플레이스토어 배포를 위한 100시간 타이머 앱입니다.

## 🚀 기능

- 100시간 카운트다운 타이머
- 일시정지/재개 기능
- 백그라운드에서도 동작
- 진동 피드백
- 화면 켜짐 유지
- 자동 상태 저장

## 🛠 기술 스택

- **React Native** + **Expo**
- **TypeScript**
- **AsyncStorage** (로컬 저장소)
- **Expo Keep Awake** (화면 켜짐 유지)
- **Expo Haptics** (진동 피드백)

## 📱 개발 환경 설정

### 필수 요구사항

- Node.js 18+
- npm 또는 yarn
- Android Studio (Android 개발용)
- Expo CLI

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm start

# Android 에뮬레이터에서 실행
npm run android

# 실제 기기에서 테스트
# Expo Go 앱을 설치하고 QR 코드를 스캔
```

## 📦 빌드 및 배포

### 개발 빌드

```bash
# 개발용 APK 빌드
eas build --platform android --profile preview
```

### 프로덕션 빌드

```bash
# 프로덕션용 AAB 빌드
eas build --platform android --profile production
```

### 구글 플레이스토어 배포

```bash
# 빌드 후 자동 배포
eas submit --platform android
```

## 🔧 프로젝트 구조

```
src/
├── components/     # UI 컴포넌트
├── hooks/         # 커스텀 훅
├── utils/         # 유틸리티 함수
├── types/         # TypeScript 타입 정의
└── constants/     # 상수 정의
```

## 📋 다음 단계

1. **아이콘 및 스플래시 화면** 설정
2. **Firebase** 연동 (푸시 알림, 분석)
3. **구독 기능** 추가 (RevenueCat)
4. **다국어 지원**
5. **테마 설정**

## 🎯 구글 플레이스토어 준비사항

- [ ] 앱 아이콘 (512x512)
- [ ] 스플래시 화면
- [ ] 스크린샷 (최소 2개)
- [ ] 앱 설명
- [ ] 개인정보처리방침
- [ ] 서비스 계정 키 설정

## 📄 라이선스

MIT License
