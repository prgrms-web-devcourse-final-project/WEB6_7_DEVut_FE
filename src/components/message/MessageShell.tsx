"use client";

import React, { createContext, useContext } from "react";

interface MessageShellContextType {
  meId: number | null;
}

const MessageShellContext = createContext<MessageShellContextType>({ meId: null });

export function useMessageContext() {
  return useContext(MessageShellContext);
}

export default function MessageShell({
  meId,
  children,
}: {
  meId: number | null;
  children: React.ReactNode;
}) {
  return <MessageShellContext.Provider value={{ meId }}>{children}</MessageShellContext.Provider>;
}
