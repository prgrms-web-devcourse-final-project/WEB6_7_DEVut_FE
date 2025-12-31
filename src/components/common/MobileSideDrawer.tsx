"use client";

import { Drawer } from "vaul";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function MobileSideDrawer({
  trigger,
  children,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/50" />

        <Drawer.Content className="bg-content-area fixed right-0 bottom-0 left-0 z-50 flex max-h-[85vh] flex-col rounded-t-md">
          <VisuallyHidden>
            <Drawer.Title>채팅 및 상품 목록</Drawer.Title>
          </VisuallyHidden>

          <div className="bg-border-sub mx-auto mt-2 h-1.5 w-10 rounded-full" />

          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
