"use client";

import test from "@/assets/images/sidebar/BBlogo.png";
import Button from "@/components/common/Button";
import ContentContainer from "@/components/common/ContentContainer";
import Input from "@/components/common/Input";
import WrapperImage from "@/components/common/WrapperImage";
import { useState } from "react";
import { useUpdateMe } from "@/features/auth/hooks/useUpdateMe";
import { useRouter } from "next/navigation";
import { useSignOut } from "@/features/auth/hooks/useSignOut";
import { useAuthStore } from "@/features/auth/model/auth.store";
import Toast from "@/components/common/Toast";

export default function MyIntro() {
  const signOutMutation = useSignOut();
  const updateMeMutation = useUpdateMe();

  const setUser = useAuthStore(state => state.setUser);
  const user = useAuthStore(state => state.user);

  const router = useRouter();
  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const [onEdit, setOnEdit] = useState(false);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");

  const handleEditClick = () => {
    if (!user) {
      notify("로그인이 만료되었습니다.", "ERROR");
      router.replace("/login");
    }

    if (!onEdit && user) {
      setNickname(user.nickname);
      setEmail(user.email);
      setBirthDate(user.birthDate);
      setOnEdit(true);
      return;
    }

    updateMeMutation.mutate(
      {
        email,
        nickname: nickname.trim(),
        birthDate,
        image: null,
      },
      {
        onSuccess: res => {
          setUser(res.data);
          setOnEdit(false);
        },
      }
    );
  };

  const handleSignOut = () => {
    if (!user) {
      notify("로그인이 만료되었습니다.", "ERROR");
    }

    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        useAuthStore.getState().logoutLocal();
        router.replace("/");
      },
    });
  };

  return (
    <ContentContainer className="mt-5 flex min-h-[370px] flex-col justify-between">
      <div className="mx-auto flex w-[90%] flex-col gap-10 gap-y-0 sm:w-[80%] md:flex-row md:gap-20">
        <div className="mx-auto flex min-h-[280px] w-full max-w-[180px] flex-col justify-center gap-6 md:mx-0 md:w-[25%] md:min-w-[130px]">
          <div className="aspect-square w-full">
            <WrapperImage src={test} alt="test" />
          </div>
          <Button
            className="bg-custom-red h-10 w-full text-lg font-bold text-white"
            onClick={handleSignOut}
          >
            {signOutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
          </Button>
          <Button className="bg-custom-orange h-10 w-full border-white text-lg font-bold text-white">
            회원탈퇴
          </Button>
        </div>

        <div className="text-title-main flex min-h-[280px] w-full flex-col justify-center gap-7 text-sm font-bold md:flex-1 md:text-lg">
          {/* 닉네임 */}
          <div className="flex">
            <span className="w-20 shrink-0 md:w-[100px]">닉네임</span>
            {onEdit ? (
              <Input
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                className="h-10 flex-1 md:max-w-[60%]"
              />
            ) : (
              <span className="flex h-10 flex-1 items-center px-4 font-normal md:max-w-[60%]">
                {user?.nickname}
              </span>
            )}
          </div>

          {/* 이메일 */}
          <div className="flex">
            <span className="w-20 shrink-0 md:w-[100px]">이메일</span>
            {onEdit ? (
              <Input
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="h-10 flex-1 md:max-w-[60%]"
              />
            ) : (
              <span className="flex h-10 flex-1 items-center px-4 font-normal md:max-w-[60%]">
                {user?.email}
              </span>
            )}
          </div>

          {/* 생일 */}
          <div className="flex">
            <span className="w-20 shrink-0 md:w-[100px]">생 일</span>
            {onEdit ? (
              <Input
                value={birthDate}
                onChange={e => setBirthDate(e.target.value)}
                className="h-10 flex-1 md:max-w-[60%]"
              />
            ) : (
              <span className="flex h-10 flex-1 items-center px-4 font-normal md:max-w-[60%]">
                {user?.birthDate}
              </span>
            )}
          </div>

          {/* 배송지 (임시 로컬 상태) */}
          <div className="flex">
            <span className="w-20 shrink-0 md:w-[100px]">배송지</span>
            {onEdit ? (
              <Input
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="h-10 flex-1 md:max-w-[60%]"
              />
            ) : (
              <span className="flex h-10 flex-1 items-center px-4 font-normal md:max-w-[60%]">
                {address || "-"}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto mb-5 flex w-[95%] justify-end">
        <Button
          className="h-10 w-full md:w-auto"
          onClick={handleEditClick}
          disabled={updateMeMutation.isPending}
        >
          {onEdit ? (updateMeMutation.isPending ? "저장 중..." : "저장") : "수정"}
        </Button>
      </div>
    </ContentContainer>
  );
}
