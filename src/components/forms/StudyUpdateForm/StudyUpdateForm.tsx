import { useEffect, useState } from "react";
import { StudyRegisterFormInput } from "../../../types/StudyRegisterFormInput";
import {Controller, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
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
  const [newTag, setNewTag] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors, isSubmitting },
  } = useForm<StudyRegisterFormInput>({
    mode: "onChange",
    criteriaMode: "all",
    shouldUnregister: false,
    defaultValues: {
      title: "",
      tags: [],
      content: "",
    },
  });
  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "tags",
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
        // 既存のタグをクリア
        setValue("tags", []);
        study.tags.forEach((tag) => {
            append({ name: tag.name });
        })
        setValue("content", study.content);
        setIsLoaded(true);
      }
    })();
  }, [setValue, fetchStudy, id, append]);

  const onSubmit: SubmitHandler<StudyRegisterFormInput> = async (data) => {
    if (id === undefined) {
      return;
    }
    const distinctTags = Array.from(new Set(data.tags.map((tag) => tag.name)));
    const [status, resData] = await updateStudy(
      id,
      data.title,
      distinctTags,
      data.content,
    );
    if (status === axios.HttpStatusCode.BadRequest) {
      setStudyErrorResponseDto(resData);
      return;
    }
    setIsFormChanged(false);
    navigate(`/study/${id}`);
  };

  const getTagsSuggestions = async (query: string) => {
    const tagListResponseDto = await fetchTags(query);
    setSuggestedTags(tagListResponseDto.tags.map((tag) => tag.name));
  };

  const handleTagChange = async (name: string) => {
    setNewTag(name);
    await getTagsSuggestions(name);
  };

  const handleAddTag = (newTagName: string) => {
    append({ name: newTagName });
    setNewTag("");
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
  const tags = watch("tags", []);
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
            {fields.map((item, index) => (
                <div key={item.id}>
                  <TextField
                      {...register(`tags.${index}.name`)}
                      variant={"standard"}
                      defaultValue={item.name} // 初期値を設定
                      required={true}
                  />
                  <Button onClick={() => remove(index)}>削除</Button>
                </div>
            ))}
            <TextField
                value={newTag}
                variant={"standard"}
                placeholder={"タグを追加"}
                onChange={(e) => handleTagChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddTag(newTag);
                    e.preventDefault();
                  }
                }}
            />
            <div>
              {suggestedTags.map((tag, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    handleAddTag(tag); // クリックされたタグを入力欄にセット
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
