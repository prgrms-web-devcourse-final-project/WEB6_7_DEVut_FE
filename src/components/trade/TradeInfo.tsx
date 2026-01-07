"use client";
import ContentContainer from "../common/ContentContainer";
import Title from "../common/Title";
import WrapperImage from "../common/WrapperImage";
import StatusBadge from "../common/StatusBadge";
import Input from "../common/Input";
import MileStoneSemiTitle from "@/components/common/MileStoneSemiTitle";
import Button from "../common/Button";
import TradeItem from "./TradeItem";
import { useTradeDetail } from "@/features/trade/hooks/useTrade";
import { useEffect, useState } from "react";
import { tradeStatusToUIStatus } from "@/utils/tradeStatusMapper";
import OptionDropdown from "../common/OptionDropdown";
import { CARRIER_LABEL_MAP } from "@/utils/carrierCodeMapper";
import { useUpdateAddress } from "@/features/delivery/hooks/useUpdateAddress";
import { useUpdateDelivery } from "@/features/delivery/hooks/useUpdateDelivery";
import Toast from "../common/Toast";
import { buildMilestones } from "@/utils/buildMilestones";
import ConfirmModal from "../modal/ConfirmModal";
import { usePayBalance } from "@/features/payments/hooks/usePayBalance";
import { useConfirmTrade } from "@/features/trade/hooks/useConfirmTrade";

type TradeInfoProps = {
  auctionType: "LIVE" | "DELAYED";
  dealId: string;
};

export default function TradeInfo({ auctionType, dealId }: TradeInfoProps) {
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [postal, setPostal] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [carrier, setCarrier] = useState<Carrier | "">("");
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { mutate: payBalanceMutate } = usePayBalance();
  const { mutate: updateAddressMutate } = useUpdateAddress();
  const { mutate: updateDeliveryMutate } = useUpdateDelivery();
  const { mutate: confirmTradeMutate } = useConfirmTrade();

  const { data: tradeData, isLoading, isError } = useTradeDetail({ auctionType, dealId });

  const isBuyer = tradeData?.role === "BUYER";
  const isSeller = tradeData?.role === "SELLER";

  const deliveryEditable = isBuyer; // 배송/상세주소
  const invoiceEditable = isSeller; // 송장/택배사(드롭다운)

  const handleSubmit = () => {
    if (!tradeData) return;

    // 구매자: 배송지 수정
    if (tradeData.role === "BUYER") {
      updateAddressMutate({
        auctionType,
        dealId,
        payload: {
          address,
          addressDetail,
          postalCode: postal,
        },
      });
    }

    if (tradeData.role === "SELLER") {
      if (!carrier) {
        Toast({ message: "택배사를 골라주세요", type: "ERROR" });
        return;
      }
      updateDeliveryMutate({
        auctionType,
        dealId,
        payload: {
          carrierCode: carrier,
          trackingNumber: invoiceNumber,
        },
      });
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAddress(tradeData?.deliveryAddress ?? "");
    setAddressDetail(tradeData?.deliveryAddressDetail ?? "");
    setPostal(tradeData?.deliveryPostalCode ?? "");
    setInvoiceNumber(tradeData?.trackingNumber ?? "");
    setCarrier(tradeData?.carrierCode ?? "");
  }, [
    tradeData?.deliveryAddress,
    tradeData?.deliveryAddressDetail,
    tradeData?.deliveryPostalCode,
    tradeData?.carrierCode,
    tradeData?.trackingNumber,
  ]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !tradeData) return <div>거래 정보를 불러올 수 없습니다.</div>;

  const uiStatus = tradeStatusToUIStatus[tradeData.status];

  const milestones = buildMilestones({
    role: tradeData.role,
    status: tradeData.status,
    hasTracking: Boolean(tradeData.trackingNumber),
    onPayClick: () => setIsPayModalOpen(true),
    onConfirmClick: () => setIsConfirmModalOpen(true),
  });

  return (
<<<<<<< HEAD
    <div className="mt-2 flex w-screen flex-col px-8">
      <ContentContainer className="border-border-sub bg-content-area m-0 flex w-full flex-col gap-16 border-3 px-14 py-7 lg:flex-row">
        <div className="flex flex-col md:min-w-[60%]">
=======
    <div className="mt-2 flex w-full flex-col px-8">
      <ContentContainer className="border-border-sub bg-content-area m-0 flex w-full flex-col gap-16 border-3 px-14 py-7 lg:flex-row">
        <div className="flex flex-col lg:min-w-[55%]">
>>>>>>> 8bc8c0987040080705d87ce89e044ff117a7df99
          <Title className="text-title-sub ml-3 text-[24px]">상품 정보</Title>
          <ContentContainer className="border-border-main flex h-full flex-col items-center justify-center gap-10 overflow-auto border-3 p-8 md:flex-row">
            {/* 이미지 */}
            <div className="h-34 w-34 shrink-0">
              <WrapperImage src={tradeData.image} alt="상품 사진" />
            </div>

            {/* 정보 */}
            <div className="flex flex-col justify-center gap-3">
              <StatusBadge status={uiStatus} className="border-none" />

              <p className="text-title-main-dark text-[20px] font-bold">{tradeData.itemName}</p>

              <div className="mt-2">
                <p className="text-title-main-dark text-[11px]">낙찰가</p>
                <p className="text-custom-red text-[17px] font-bold">{tradeData.winningPrice}</p>
              </div>
            </div>
          </ContentContainer>
        </div>
<<<<<<< HEAD
        <div className="flex w-full flex-col md:min-w-[40%] lg:px-5">
=======
        <div className="flex min-w-full flex-col lg:min-w-[40%]">
>>>>>>> 8bc8c0987040080705d87ce89e044ff117a7df99
          <Title className="text-title-sub ml-3 text-[24px]">배송</Title>
          <ContentContainer className="border-border-main text-title-main-dark grid gap-1 border-3 p-8 text-[11px] font-bold">
            <div className="grid gap-2">
              <p>배송지</p>

              <Input
                value={address}
                placeholder="입력"
                className="h-10 px-3 py-2 sm:py-1"
                onChange={e => setAddress(e.target.value)}
                disabled={!deliveryEditable}
              />
              {!deliveryEditable && (
                <p className="ml-1 text-[10px] opacity-60">구매자만 수정할 수 있어요.</p>
              )}
            </div>

            <div className="grid gap-2">
              <p>상세 주소</p>
              <Input
                value={addressDetail}
                placeholder="입력"
                className="h-10"
                onChange={e => setAddressDetail(e.target.value)}
                disabled={!deliveryEditable}
              />
            </div>

            <div className="grid gap-2">
              <p>상세 주소</p>
              <Input
                value={postal}
                placeholder="입력"
                className="h-10"
                onChange={e => setPostal(e.target.value)}
                disabled={!deliveryEditable}
              />
            </div>

            <div className="mt-2 grid gap-2">
              <p>송장 번호</p>
              <Input
                value={invoiceNumber}
                placeholder="입력"
                className="h-10 px-3 py-2 sm:py-1"
                onChange={e => setInvoiceNumber(e.target.value)}
                disabled={!invoiceEditable}
              />
              {!invoiceEditable && (
                <p className="ml-1 text-[10px] opacity-60">판매자만 입력할 수 있어요.</p>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between gap-2">
              {/* 드롭다운: 판매자만 변경 가능 */}
              <div className={!invoiceEditable ? "pointer-events-none opacity-60" : ""}>
                <OptionDropdown label={carrier ? CARRIER_LABEL_MAP[carrier] : "택배사 선택"}>
                  {Object.entries(CARRIER_LABEL_MAP).map(([code, label]) => (
                    <OptionDropdown.Item key={code} onClick={() => setCarrier(code as Carrier)}>
                      {label}
                    </OptionDropdown.Item>
                  ))}
                </OptionDropdown>
              </div>

              <Button className="max-h-9 border-2" onClick={handleSubmit}>
                수정
              </Button>
            </div>
          </ContentContainer>
        </div>
      </ContentContainer>
<<<<<<< HEAD
      <section className="relative mb-10 min-h-full max-w-[1440px] py-5">
        {/* 세로 타임라인 */}
=======
      <section className="relative min-h-screen py-5">
>>>>>>> 8bc8c0987040080705d87ce89e044ff117a7df99
        <div className="bg-border-main absolute top-5 left-7 h-full w-[3px]" />

        {milestones.map(step => (
          <div key={step.key} className="mb-12">
            <MileStoneSemiTitle title={step.title} className="mb-2 ml-2 rotate-2" />

            <TradeItem>
              {step.description}

              {step.action && (
                <Button
                  className={`bg-btn-default ml-3 max-h-7 transition-all hover:scale-101 active:scale-99 ${step.key === "PENDING" ? "bg-custom-red text-white" : ""}`}
                  onClick={step.action.onClick}
                >
                  {step.action.label}
                </Button>
              )}
            </TradeItem>

            <div className="mt-12 ml-15 w-[95%] border-t-[3px] border-dashed border-[#A1887F]/30" />
          </div>
        ))}
      </section>
      {isPayModalOpen && (
        <ConfirmModal
          title="잔금을 결제하시겠습니까?"
          description="결제 후에는 거래가 진행 단계로 넘어갑니다."
          confirmText="결제하기"
          onCancel={() => setIsPayModalOpen(false)}
          onConfirm={() => {
            payBalanceMutate(dealId);
            setIsPayModalOpen(false);
          }}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmModal
          title="구매를 확정하시겠습니까?"
          description="구매 확정 후에는 거래가 완료되며 되돌릴 수 없습니다."
          confirmText="구매 확정"
          cancelText="취소"
          onCancel={() => setIsConfirmModalOpen(false)}
          onConfirm={() => {
            confirmTradeMutate({ type: auctionType, dealId });
            setIsConfirmModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
