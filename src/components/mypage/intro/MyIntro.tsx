"use client";

import test from "@/assets/images/sidebar/BBlogo.png";
import Button from "@/components/common/Button";
import ContentContainer from "@/components/common/ContentContainer";
import Input from "@/components/common/Input";
import WrapperImage from "@/components/common/WrapperImage";
import { useEffect, useState } from "react";
import { useUpdateMe } from "@/features/auth/hooks/useUpdateMe";
import { useRouter } from "next/navigation";
import { useSignOut } from "@/features/auth/hooks/useSignOut";
import Toast from "@/components/common/Toast";
import { useMe } from "@/features/auth/hooks/useMe";
import { useUploadImages } from "@/features/image/hooks/useUploadImages";
import closeIcon from "@/assets/mypage/closeButton.svg";
import Image from "next/image";

export default function MyIntro() {
  const { data: user } = useMe();
  const signOutMutation = useSignOut();
  const updateMeMutation = useUpdateMe();
  const { uploadImages, isUploading } = useUploadImages();

  const router = useRouter();
  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const [onEdit, setOnEdit] = useState(false);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [postal, setPostal] = useState("");

  const inputFields = [
    { label: "닉네임", value: nickname, setValue: setNickname },
    { label: "이메일", value: email, setValue: setEmail },
    { label: "배송지", value: address, setValue: setAddress },
    { label: "상세 주소", value: detailAddress, setValue: setDetailAddress },
    { label: "우편 번호", value: postal, setValue: setPostal },
  ];

  useEffect(() => {
    if (!user) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNickname(user.nickname);
    setEmail(user.email);
    setAddress(user.address ?? "");
    setDetailAddress(user.addressDetail ?? "");
    setPostal(user.postalCode ?? "");
  }, [user]);

  const handleEditClick = async () => {
    if (!user) {
      notify("로그인이 만료되었습니다.", "ERROR");
      router.replace("/login");
      return;
    }

    // 수정 시작
    if (!onEdit) {
      setOnEdit(true);
      return;
    }

    let imageUrl: string | null = null;

    if (profileImage) {
      const urls = await uploadImages([profileImage], "auctions");
      imageUrl = urls[0];
    }
    updateMeMutation.mutate(
      {
        email,
        nickname: nickname.trim(),
        image: imageUrl,
        address,
        addressDetail: detailAddress,
        postalCode: postal,
      },
      {
        onSuccess: () => {
          setOnEdit(false);
        },
      }
    );
  };

  const handleSignOut = () => {
    // if (!user) {
    //   notify("로그인이 만료되었습니다.", "ERROR");
    //   router.replace("/login");
    // }

    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        notify("다음에 또 만나요!", "SUCCESS");
        router.replace("/");
        router.refresh();
      },
    });
  };

  const previewImageSrc = profileImage ? URL.createObjectURL(profileImage) : (user?.image ?? test);

  return (
    <ContentContainer className="mt-5 flex min-h-[370px] flex-col justify-between">
      <div className="mx-auto flex w-[90%] flex-col gap-10 gap-y-0 sm:w-[80%] md:flex-row md:gap-20">
        <div className="mx-auto flex min-h-[280px] w-full max-w-[180px] flex-col justify-center gap-6 py-5 md:mx-0 md:w-[25%] md:min-w-[130px]">
          <div className="group relative aspect-square w-full">
            <WrapperImage src={previewImageSrc} alt="profile" />

            {onEdit && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    if (!profileImage) {
                      document.getElementById("profile-image-input")?.click();
                    }
                  }}
                  className="text-bg-main absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 text-sm font-bold opacity-0 transition-opacity group-hover:opacity-100"
                >
                  {!profileImage && "이미지를 업로드하세요"}
                </button>

                <input
                  id="profile-image-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) setProfileImage(file);
                    e.target.value = "";
                  }}
                />

                {profileImage && (
                  <button
                    type="button"
                    onClick={() => setProfileImage(null)}
                    className="absolute top-2 right-2 hidden cursor-pointer group-hover:block"
                  >
                    <Image src={closeIcon.src} alt="remove" width={30} height={30} />
                  </button>
                )}
              </>
            )}
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

      <div className="mx-auto mb-5 flex w-[95%] justify-end gap-3">
        {onEdit && (
          <Button
            className="bg-custom-red h-10 w-full text-white md:w-auto"
            onClick={() => setOnEdit(false)}
          >
            취소
          </Button>
        )}
        <Button
          className="h-10 w-full md:w-auto"
          onClick={handleEditClick}
          disabled={updateMeMutation.isPending || isUploading}
        >
          {onEdit ? (updateMeMutation.isPending || isUploading ? "저장 중..." : "저장") : "수정"}
        </Button>
      </div>
    </ContentContainer>
  );
}
