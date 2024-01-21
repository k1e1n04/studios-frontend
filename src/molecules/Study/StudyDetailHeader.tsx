import { StyledDetailHeaderContainer } from "@/atoms/StyledDetailHeaderContainer";
import { Text, Title } from "@mantine/core";
import { StyledPrimaryButton } from "@/atoms/StyledPrimaryButton";
import { StyledDeleteButton } from "@/atoms/StyledDeleteButton";
import { StudyResponseDto } from "@/types/Study/StudyResponseDto";
import { ButtonsVerticalContainer } from "@/atoms/ButtonsVerticalContainer";
import Link from "next/link";

type Props = {
  studyResponseDto: StudyResponseDto;
  handleOpenDeleteModal: () => void;
};

/**
 * 学習詳細のヘッダー
 * @param studyResponseDto 学習レスポンスDTO
 * @param handleOpenDeleteModal 削除モーダルを開くハンドラー
 * @constructor
 */
export const StudyDetailHeader: React.FC<Props> = ({
  studyResponseDto,
  handleOpenDeleteModal,
}) => {
  return (
    <>
      <Title order={1}>{studyResponseDto.title}</Title>
      <StyledDetailHeaderContainer>
        <div>
          <Text className="text-left">
            復習回数 {studyResponseDto.number_of_review}
          </Text>
          <Text className="text-left">
            投稿日 {studyResponseDto.created_date}
          </Text>
          <Text className="text-left">
            更新日 {studyResponseDto.updated_date}
          </Text>
        </div>
        <ButtonsVerticalContainer>
          <Link href={`/study/update/${studyResponseDto.id}`}>
            <StyledPrimaryButton>更新</StyledPrimaryButton>
          </Link>
          <StyledDeleteButton onClick={handleOpenDeleteModal}>
            削除
          </StyledDeleteButton>
        </ButtonsVerticalContainer>
      </StyledDetailHeaderContainer>
    </>
  );
};
