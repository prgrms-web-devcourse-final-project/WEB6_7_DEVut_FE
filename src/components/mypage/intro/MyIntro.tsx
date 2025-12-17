"use client";

import test from "@/assets/images/sidebar/BBlogo.png";
import Button from "@/components/common/Button";
import ContentContainer from "@/components/common/ContentContainer";
import Input from "@/components/common/Input";
import WrapperImage from "@/components/common/WrapperImage";
import { useEffect, useState } from "react";
import { useMe } from "@/features/auth/hooks/useMe";
import { useUpdateMe } from "@/features/auth/hooks/useUpdateMe";

export default function MyIntro() {
  const { data: me } = useMe();
  const updateMeMutation = useUpdateMe();

  const [onEdit, setOnEdit] = useState(false);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");

  const inputFields = [
    { label: "닉네임", value: nickname, setValue: setNickname },
    { label: "이메일", value: email, setValue: setEmail },
    { label: "생  일", value: birthDate, setValue: setBirthDate },
    { label: "배송지", value: address, setValue: setAddress },
  ];

  useEffect(() => {
    if (!me) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNickname(me.data.nickname);
    setEmail(me.data.email);
    setBirthDate(me.data.birthDate);

    // phone, address는 아직 API 없으면 비워두기
  }, [me]);

  const handleEditClick = () => {
    // 1️⃣ 보기 → 수정
    if (!onEdit) {
      if (!me) return;

      setNickname(me.data.nickname);
      setEmail(me.data.email);
      setBirthDate(me.data.birthDate);
      setOnEdit(true);
      return;
    }

    // 2️⃣ 수정 → 저장
    updateMeMutation.mutate(
      {
        email,
        nickname: nickname.trim(), // ❗ null 보내지 마
        birthDate,
        image: null,
      },
      {
        onSuccess: () => {
          console.log("수정 성공");
          setOnEdit(false);
        },
      }
    );
  };

  return (
    <ContentContainer className="mt-5 flex min-h-[370px] flex-col justify-between">
      <div className="mx-auto flex w-[90%] flex-col gap-10 gap-y-0 sm:w-[80%] md:flex-row md:gap-20">
        <div className="mx-auto flex min-h-[280px] w-full max-w-[180px] flex-col justify-center gap-6 md:mx-0 md:w-[25%] md:min-w-[130px]">
          <div className="aspect-square w-full">
            <WrapperImage src={test} alt="test" />
          </div>
          <Button className="bg-custom-red h-10 w-full text-lg font-bold text-white">
            로그아웃
          </Button>
          <Button className="bg-custom-orange h-10 w-full border-white text-lg font-bold text-white">
            회원탈퇴
          </Button>
        </div>

        <div className="text-title-main flex min-h-[280px] w-full flex-col justify-center gap-7 text-sm font-bold md:flex-1 md:text-lg">
          {inputFields.map(({ label, value, setValue }) => (
            <div key={label} className="flex">
              <span className={`w-20 shrink-0 md:w-[100px]`}>{label}</span>
              {onEdit ? (
                <Input
                  placeholder="입력해주세요"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  className="h-10 flex-1 md:max-w-[60%]"
                />
              ) : (
                <span className="flex h-10 flex-1 items-center px-4 font-normal md:max-w-[60%]">
                  {value}
                </span>
              )}
            </div>
          ))}
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
