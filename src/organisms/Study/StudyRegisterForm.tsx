import React, { useEffect, useState } from "react";
import { StudyRegisterFormInput } from "@/types/Study/StudyRegisterFormInput";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useStudy } from "@/hooks/useStudy";
import { ErrorResponseDto } from "@/types/ErrorResponseDto";
import axios from "axios";
import { Alert, Button, useTheme } from "@mui/material";
import { useTag } from "@/hooks/useTag";
import { StyledContainer } from "@/atoms/StyledContrainer";
import { StyledFormErrorText } from "@/atoms/StyledFormErrorText";
import { TagAddInput } from "@/molecules/Study/Tag/TagAddInput";
import { CustomRichTextEditor } from "@/organisms/CustomRichTextEditor";
import { TagButton } from "@/molecules/Study/Tag/TagButton";
import { FlexContainer } from "@/atoms/FlexContainer";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { TextInput, Stack } from "@mantine/core";
import { views } from "@/constants/views";

export const StudyRegisterForm: React.FC = () => {
  const { createStudy } = useStudy();
  const { fetchTags } = useTag();
  const [studyErrorResponseDto, setStudyErrorResponseDto] =
    useState<ErrorResponseDto>();
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [newTag, setNewTag] = useState("");
  const router = useRouter();
  const {
    control,
    handleSubmit,
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

  const onSubmit: SubmitHandler<StudyRegisterFormInput> = async (data) => {
    const distinctTags = Array.from(new Set(data.tags.map((tag) => tag.name)));
    const [status, resData] = await createStudy(
      data.title,
      distinctTags,
      data.content,
    );
    if (status === axios.HttpStatusCode.BadRequest) {
      setStudyErrorResponseDto(resData);
      return;
    }
    setIsFormChanged(false);
    router.push(views.STUDY_LIST.path);
  };

  const getTagsSuggestions = async (name: string) => {
    const tagListResponseDto = await fetchTags(name);
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

  // フィールド監視
  const title = watch("title", "");
  const tags = watch("tags", []);
  const content = watch("content", "");

  const isFormComplete = title && tags && content;
  const theme = useTheme();

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

  return (
    <StyledContainer>
      <Stack component={"form"} onSubmit={handleSubmit(onSubmit)} gap="md">
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
            <TextInput
              {...field}
              placeholder="タイトル"
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
          <StyledFormErrorText>{errors.content.message}</StyledFormErrorText>
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
