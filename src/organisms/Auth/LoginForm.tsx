import axios from "axios";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyledContainer } from "@/atoms/StyledContrainer";
import { useAuth } from "@/hooks/useAuth";
import { LoginFormInput } from "@/types/Auth/LoginFormInput";
import { LoginErrorResponseDto } from "@/types/Auth/LoginErrorResponseDto";
import { StyledPrimaryButton } from "@/atoms/StyledPrimaryButton";
import { Alert, Stack, TextInput } from "@mantine/core";
import { StyledFormErrorText } from "@/atoms/StyledFormErrorText";
import { SmallFormContainer } from "@/atoms/SmallFormContainer";

export const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginErrorResponseDto, setLoginErrorResponseDto] =
    useState<LoginErrorResponseDto>();
  const { login } = useAuth();
  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    const [statusCode, responseDate] = await login(data.email, data.password);
    if (
      statusCode === axios.HttpStatusCode.BadRequest ||
      statusCode === axios.HttpStatusCode.Unauthorized
    ) {
      setLoginErrorResponseDto(responseDate);
    }
  };
  return (
      <SmallFormContainer>
        <Stack component={"form"} onSubmit={handleSubmit(onSubmit)}>
          {loginErrorResponseDto && (
            <Alert title="ログイン失敗" color="yellow">
              {loginErrorResponseDto.message}
            </Alert>
          )}
          <Controller
            name="email"
            control={control}
            rules={{
              required: "メールアドレスは必須です",
              pattern: {
                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                message: `正しいメールアドレスを入力してください`,
              },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="メールアドレス"
                error={!!errors.email}
              />
            )}
          ></Controller>
          {errors.email?.message && (
            <StyledFormErrorText>{errors.email.message}</StyledFormErrorText>
          )}
          <Controller
            name="password"
            control={control}
            rules={{
              required: "パスワードは必須です",
              maxLength: {
                value: 64,
                message: `パスワードは64文字以内で入力してください`,
              },
              minLength: {
                value: 8,
                message: `パスワードは8文字以上で入力してください`,
              },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="パスワード"
                error={!!errors.password}
              />
            )}
          ></Controller>
          {errors.password?.message && (
            <StyledFormErrorText>{errors.password.message}</StyledFormErrorText>
          )}
          <StyledPrimaryButton
            disabled={Object.keys(errors).length > 0}
            type="submit"
          >
            ログイン
          </StyledPrimaryButton>
        </Stack>
      </SmallFormContainer>
  );
};
