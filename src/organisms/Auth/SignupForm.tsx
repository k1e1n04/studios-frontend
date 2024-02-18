import React, { useState } from "react";
import { SignupFormInput } from "@/types/Auth/SignupFormInput";
import { Controller, useForm } from "react-hook-form";
import { ErrorResponseDto } from "@/types/ErrorResponseDto";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { SmallFormContainer } from "@/atoms/SmallFormContainer";
import { Alert, Checkbox, Stack, TextInput } from "@mantine/core";
import { StyledFormErrorText } from "@/atoms/StyledFormErrorText";
import { StyledPrimaryButton } from "@/atoms/StyledPrimaryButton";

/**
 * サインアップフォーム
 * @constructo
 */
export const SignupForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormInput>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      agreeToTerms: false,
    },
  });
  const [signupErrorResponseDto, setSignupErrorResponseDto] =
    useState<ErrorResponseDto>();
  const { signup } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (data: SignupFormInput) => {
    setIsSubmitting(true);
    const [status, resData] = await signup(
      data.username,
      data.email,
      data.agreeToTerms,
      data.password,
      data.passwordConfirm,
    );
    if (
      status === axios.HttpStatusCode.BadRequest ||
      status === axios.HttpStatusCode.Unauthorized
    ) {
      setSignupErrorResponseDto(resData);
    }
    setIsSubmitting(false);
  };
  const email = watch("email", "");
  const username = watch("username", "");
  const password = watch("password", "");
  const passwordConfirm = watch("passwordConfirm", "");
  const agreeToTerms = watch("agreeToTerms", false);

  const isFormComplete =
    email && username && password && passwordConfirm && agreeToTerms;
  return (
    <SmallFormContainer>
      <Stack component={"form"} onSubmit={handleSubmit(onSubmit)}>
        {signupErrorResponseDto && (
          <Alert title="サインアップ失敗" color="yellow">
            {signupErrorResponseDto.message}
          </Alert>
        )}
        <Controller
          name="email"
          rules={{
            required: "メールアドレスは必須です",
            pattern: {
              value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
              message: `正しいメールアドレスを入力してください`,
            },
          }}
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              required
              label="メールアドレス"
              labelProps={{
                style: { color: "black" },
              }}
              placeholder="example@example.com"
              error={!!errors.email}
            />
          )}
        />
        {errors.email?.message && (
          <StyledFormErrorText>{errors.email?.message}</StyledFormErrorText>
        )}
        <Controller
          name="username"
          rules={{
            required: "ユーザー名は必須です",
            minLength: {
              value: 3,
              message: "ユーザー名は3文字以上です",
            },
            maxLength: {
              value: 20,
              message: "ユーザー名は20文字以下です",
            },
            pattern: {
              value: /^[a-zA-Z0-9]+$/,
              message: "ユーザー名は半角英数字のみです",
            },
          }}
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              required
              label="ユーザー名"
              labelProps={{
                style: { color: "black" },
              }}
              placeholder="username"
              error={!!errors.username}
            />
          )}
        />
        {errors.username?.message && (
          <StyledFormErrorText>{errors.username?.message}</StyledFormErrorText>
        )}
        <Controller
          name="password"
          rules={{
            required: "パスワードは必須です",
            minLength: {
              value: 8,
              message: "パスワードは8文字以上です",
            },
            maxLength: {
              value: 64,
              message: "パスワードは64文字以下です",
            },
            validate: {
              hasNumber: (value) =>
                /\d/.test(value) || "少なくとも1つの数字を含む必要があります",
              hasSpecialCharacter: (value) =>
                /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                "少なくとも1つの特殊文字を含む必要があります",
              hasUpperCase: (value) =>
                /[A-Z]/.test(value) ||
                "少なくとも1つの大文字を含む必要があります",
              hasLowerCase: (value) =>
                /[a-z]/.test(value) ||
                "少なくとも1つの小文字を含む必要があります",
            },
          }}
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              label="パスワード"
              labelProps={{
                style: { color: "black" },
              }}
              required
              type="password"
              error={!!errors.password}
            />
          )}
        />
        {errors.password?.message && (
          <StyledFormErrorText>{errors.password?.message}</StyledFormErrorText>
        )}
        <Controller
          name="passwordConfirm"
          rules={{
            required: "パスワード(確認)は必須です",
            validate: {
              matchesPreviousPassword: (value, { password }) => {
                return password === value || "パスワードが一致しません";
              },
            },
          }}
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              type="password"
              required
              label="パスワード(確認)"
              labelProps={{
                style: { color: "black" },
              }}
              error={!!errors.passwordConfirm}
            />
          )}
        />
        {errors.passwordConfirm?.message && (
          <StyledFormErrorText>
            {errors.passwordConfirm?.message}
          </StyledFormErrorText>
        )}
        <Controller
          name="agreeToTerms"
          control={control}
          rules={{ required: "利用規約に同意する必要があります" }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Checkbox
              checked={value}
              required
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              label="利用規約に同意する"
              style={{ color: "black" }}
            />
          )}
        />
        {errors.agreeToTerms?.message && (
          <StyledFormErrorText>
            {errors.agreeToTerms?.message}
          </StyledFormErrorText>
        )}
        <StyledPrimaryButton
          disabled={
            Object.keys(errors).length > 0 || !isFormComplete || isSubmitting
          }
          type="submit"
        >
          {isSubmitting ? "サインアップ中..." : "サインアップ"}
        </StyledPrimaryButton>
      </Stack>
    </SmallFormContainer>
  );
};
