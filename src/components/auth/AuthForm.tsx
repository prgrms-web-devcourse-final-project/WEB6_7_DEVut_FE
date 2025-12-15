import backdrop from "@/assets/auth/authBackdrop.png";
import ContentContainer from "@/components/common/ContentContainer";
import Image from "next/image";

export default function AuthForm({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-border-main relative min-h-screen rounded-2xl border-4 bg-[#F5EFE1] md:grid md:grid-cols-2">
      <div className="absolute inset-0 md:static">
        <Image src={backdrop} alt="backdrop" className="h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent to-[#f5eed9] md:right-1/2" />
      </div>

      <div className="relative z-10 flex items-center justify-center p-6">
        <ContentContainer className="border-border-sub2 flex w-full flex-col justify-center gap-6 rounded-2xl border-5 p-8 backdrop-blur-sm md:p-11">
          {children}
        </ContentContainer>
      </div>
    </div>
  );
}
