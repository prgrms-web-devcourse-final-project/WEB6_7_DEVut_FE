export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  // 로그인 한 사람만 들어올 수 있는 페이지
  return <>{children}</>;
}
