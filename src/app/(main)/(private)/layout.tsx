import { RequireAuth } from "@/features/auth/model/auth.guard";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
