import ContentContainer from "@/components/common/ContentContainer";
import Pagenation from "@/components/common/Pagenation";
import Title from "@/components/common/Title";

export default function Home() {
  return (
    <ContentContainer className="border-none shadow-none">
      <Title size={"lg"}>라이브 인기 상품</Title>
      <Pagenation />
    </ContentContainer>
  );
}
