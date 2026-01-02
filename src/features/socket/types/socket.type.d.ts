type SocketStatus =
  | "idle" // 아직 연결 시도 안 함
  | "connecting" // 최초 연결 중
  | "connected" // 정상 연결
  | "reconnecting" // 끊겼다가 재연결 중
  | "disconnected" // 명시적 종료
  | "error"; // 치명적 에러
