import { useEffect, useState } from "react";
import { StudyRegisterFormInput } from "../../../types/StudyRegisterFormInput";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useStudy } from "../../../hooks/useStudy";
import { StudyErrorResponseDto } from "../../../types/StudyErrorResponseDto";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ReactMde from "react-mde";
import styled from "styled-components";
import { useTag } from "../../../hooks/useTag";
import { useMarkdown } from "../../../hooks/useMarkdown";
import { StyledContainer } from "../../containers/StyledContrainer";

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
`;

export const StudyRegisterForm: React.FC = () => {
  const { createStudy } = useStudy();
  const { fetchTags } = useTag();
  const { generateMarkdownPreview } = useMarkdown();
  const [studyErrorResponseDto, setStudyErrorResponseDto] =
    useState<StudyErrorResponseDto>();
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StudyRegisterFormInput>({
    mode: "onChange",
    criteriaMode: "all",
    shouldUnregister: false,
    defaultValues: {
      title: "",
      tags: "",
      content: "",
    },
  });
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  const onSubmit: SubmitHandler<StudyRegisterFormInput> = async (data) => {
    const [status, resData] = await createStudy(
      data.title,
      data.tags,
      data.content
    );
    if (status === axios.HttpStatusCode.BadRequest) {
      setStudyErrorResponseDto(resData);
      return;
    }
    setIsFormChanged(false);
    navigate("/studies");
  };

  const getTagsSuggestions = async (name: string) => {
    const tags = await fetchTags(name);
    setSuggestedTags(tags);
  };

  // フィールド監視
  const title = watch("title", "");
  const tags = watch("tags", "");
  const content = watch("content", "");

  const isFormComplete = title && tags && content;
  const theme = useTheme();

  useEffect(() => {
    if (isFormChanged) {
      window.onbeforeunload = () => "変更が保存されていません。ページから移動しますか？";
    } else {
      window.onbeforeunload = null;
    }
  
    return () => {
      window.onbeforeunload = null;
    };
  }, [isFormChanged]);

  return (
    <StyledContainer>
      <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
        学び登録
      </Typography>
      <Stack
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        spacing={2}
        direction="column"
      >
        {studyErrorResponseDto && (
          <Alert severity="warning">{studyErrorResponseDto.message}</Alert>
        )}
        <Controller
          name="title"
          control={control}
          rules={{
            required: "タイトルは必須です。",
            maxLength: {
              value: 50,
              message: "タイトルは50文字以内で入力してください。",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              label="タイトル"
              error={!!errors.title}
              onChange={(e) => {
                setIsFormChanged(true);
                field.onChange(e);
              }}
            />
          )}
        ></Controller>
        {errors.title?.message && <ErrorText>{errors.title.message}</ErrorText>}
        <Controller
          name="tags"
          control={control}
          rules={{
            required: "タグは必須です。",
            maxLength: {
              value: 50,
              message: "タグは50文字以内で入力してください。",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              label="タグ(1つ)"
              error={!!errors.tags}
              onChange={(e) => {
                setIsFormChanged(true);
                field.onChange(e);
                getTagsSuggestions(e.target.value);
              }}
            />
          )}
        ></Controller>
        <div>
          {suggestedTags.map((tag, index) => (
            <Button
              key={index}
              onClick={() => {
                setValue("tags", tag, { shouldValidate: true }); // クリックされたタグを入力欄にセット
                setSuggestedTags([]); // サジェッションをクリア
              }} // カーソルをポインターに
              sx={{
                cursor: "pointer",
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
                margin: "2px",
              }}
            >
              {tag}
            </Button>
          ))}
        </div>
        {errors.tags?.message && <ErrorText>{errors.tags.message}</ErrorText>}
        <Controller
          name="content"
          control={control}
          rules={{
            required: "内容は必須です。",
            maxLength: {
              value: 10000,
              message: "内容は10000文字以内で入力してください。",
            },
          }}
          render={({ field }) => (
            <ReactMde
              {...field}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={generateMarkdownPreview}
              onChange={(e) => {
                setIsFormChanged(true);
                field.onChange(e);
              }}
            />
          )}
        />
        {errors.content?.message && (
          <ErrorText>{errors.content.message}</ErrorText>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            disabled={
              Object.keys(errors).length > 0 || !isFormComplete || isSubmitting
            }
            type="submit"
            sx={{ width: "150px", color: theme.palette.secondary.main }}
          >
            登録
          </Button>
        </div>
      </Stack>
    </StyledContainer>
  );
};
