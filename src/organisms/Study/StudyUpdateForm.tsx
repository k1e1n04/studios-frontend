import { useEffect, useState } from "react";
import { StudyRegisterFormInput } from "../../types/StudyRegisterFormInput.ts";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useStudy } from "../../hooks/useStudy.ts";
import { StudyErrorResponseDto } from "../../types/StudyErrorResponseDto.ts";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import "react-mde/lib/styles/css/react-mde-all.css";
import { useTag } from "../../hooks/useTag.ts";
import { StyledContainer } from "../../atoms/StyledContrainer.tsx";
import { StyledFormErrorText } from "../../atoms/StyledFormErrorText.tsx";
import { TagAddInput } from "../../molecules/Study/Tag/TagAddInput.tsx";
import { CustomRichTextEditor } from "../CustomRichTextEditor.tsx";
import {TagButton} from "../../molecules/Study/Tag/TagButton.tsx";
import CloseIcon from "@mui/icons-material/Close";
import {FlexContainer} from "../../atoms/FlexContainer.tsx";

export const StudyUpdateForm: React.FC = () => {
  const { updateStudy, fetchStudy } = useStudy();
  const { fetchTags } = useTag();
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
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });
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
        });
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
              <StyledFormErrorText>{errors.title.message}</StyledFormErrorText>
            )}
            <TagAddInput
              newTag={newTag}
              onAdd={handleAddTag}
              handleChange={handleTagChange}
              suggestedTags={suggestedTags}
              setSuggestedTags={setSuggestedTags}
            />
            <FlexContainer>
              {fields.map((tag, index) => (
                  <>
                    <TagButton tag={tag.name} />
                    <Button onClick={() => remove(index)}>
                      <CloseIcon />
                    </Button>
                  </>
              ))}
            </FlexContainer>
            {errors.tags?.message && (
              <StyledFormErrorText>{errors.tags.message}</StyledFormErrorText>
            )}
            <Controller
              name="content"
              control={control}
              rules={{
                required: "内容は必須です。",
                maxLength: {
                  value: 20000,
                  message: "内容は20000文字以内で入力してください。",
                },
              }}
              render={({ field }) => (
                <CustomRichTextEditor
                  content={field.value}
                  onChange={(content) => {
                    setIsFormChanged(true);
                    field.onChange(content);
                  }}
                />
              )}
            />
            {errors.content?.message && (
              <StyledFormErrorText>
                {errors.content.message}
              </StyledFormErrorText>
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
