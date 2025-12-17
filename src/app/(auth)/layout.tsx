import { NoAuthOnly } from "@/features/auth/model/auth.guard";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <NoAuthOnly>{children}</NoAuthOnly>;
}
