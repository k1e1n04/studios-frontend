import { useEffect, useState } from "react";
import { StudyRegisterFormInput } from "../../../types/StudyRegisterFormInput";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useStudy } from "../../../hooks/useStudy";
import { StudyErrorResponseDto } from "../../../types/StudyErrorResponseDto";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ReactMde from "react-mde";
import styled from "styled-components";
import "react-mde/lib/styles/css/react-mde-all.css";
import "prismjs/themes/prism-tomorrow.css";
import { useTag } from "../../../hooks/useTag";
import { useMarkdown } from "../../../hooks/useMarkdown";
import { StyledContainer } from "../../containers/StyledContrainer";

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
`;

export const StudyUpdateForm: React.FC = () => {
  const { updateStudy, fetchStudy } = useStudy();
  const { fetchTags } = useTag();
  const { generateMarkdownPreview } = useMarkdown();
  const [studyErrorResponseDto, setStudyErrorResponseDto] =
    useState<StudyErrorResponseDto>();
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
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
  // パスパラメーターからidを取得
  const { id } = useParams();
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      const study = await fetchStudy(id);
      if (study) {
        setValue("title", study.title);
        setValue("tags", study.tags);
        setValue("content", study.content);
        setIsLoaded(true);
      }
    })();
  }, [setValue, fetchStudy, id]);

  const onSubmit: SubmitHandler<StudyRegisterFormInput> = async (data) => {
    if (id === undefined) {
      return;
    }
    const [status, resData] = await updateStudy(
      id,
      data.title,
      data.tags,
      data.content
    );
    if (status === axios.HttpStatusCode.BadRequest) {
      setStudyErrorResponseDto(resData);
      return;
    }
    setIsFormChanged(false);
    navigate(`/study/${id}`);
  };

  const getTagsSuggestions = async (query: string) => {
    const tags = await fetchTags(query);
    setSuggestedTags(tags);
  };

  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (isFormChanged) {
      window.onbeforeunload = () =>
        "変更が保存されていません。ページから移動しますか？";
    } else {
      window.onbeforeunload = null;
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [isFormChanged]);

  // フィールド監視
  const title = watch("title", "");
  const tags = watch("tags", "");
  const content = watch("content", "");

  const isFormComplete = title && tags && content;

  return (
    <>
      {isLoaded ? (
        <StyledContainer>
          <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
            学び更新
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
            {errors.title?.message && (
              <ErrorText>{errors.title.message}</ErrorText>
            )}
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
                    border: (theme) =>
                      `1px solid ${theme.palette.primary.main}`,
                    margin: "2px",
                  }}
                >
                  {tag}
                </Button>
              ))}
            </div>
            {errors.tags?.message && (
              <ErrorText>{errors.tags.message}</ErrorText>
            )}
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
                  Object.keys(errors).length > 0 ||
                  !isFormComplete ||
                  isSubmitting
                }
                type="submit"
                sx={{ color: theme.palette.secondary.main, width: "150px" }}
              >
                更新
              </Button>
            </div>
          </Stack>
        </StyledContainer>
      ) : (
        <Stack alignItems={"center"}>
          <CircularProgress disableShrink />
        </Stack>
      )}
    </>
  );
};
