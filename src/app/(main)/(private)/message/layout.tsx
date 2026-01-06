import MessageShell from "@/components/message/MessageShell";
import { getMeServer } from "@/features/auth/api/auth.server.api";

export default async function MessageLayout({ children }: { children: React.ReactNode }) {
  const me = await getMeServer();

  return <MessageShell meId={me?.id ?? null}>{children}</MessageShell>;
}
