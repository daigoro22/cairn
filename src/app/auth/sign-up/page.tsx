'use client';

import TextInput from '../../_components/TextInput';
import React from 'react';
import DateInput from '@/app/_components/DateInput';
import RadioInput from '@/app/_components/RadioInput';
import CheckBoxInput from '@/app/_components/CheckBoxInput';
import InputContainer from '@/app/_components/InputContainer';
import RadioInputContainer from '@/app/_components/RadioInputContainer';
import Button from '@/app/_components/Button';
import { css } from 'styled-system/css';
import { card, mainAreaGrid } from '@/app/_components/styles/_layout';
import FileInput from '@/app/_components/FileInput';
import { mainAreaLabel } from '@/app/_components/styles/display';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SignUpApiSchema } from '@/schemas/sign-up';
import { signUpApiSchema } from '@/schemas/sign-up';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignUpApiSchema>({
    resolver: zodResolver(signUpApiSchema),
    mode: 'onSubmit',
  });

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'boolean') {
        formData.append(key, String(value));
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else {
        formData.append(key, value);
      }
    }

    await fetch('/api/auth/sign-up', {
      method: 'POST',
      body: formData,
    });
  });

  return (
    <main className={mainAreaGrid()}>
      <section
        className={css({
          gridColumn: '5/9',
        })}
      >
        <h1 className={mainAreaLabel()}>ユーザ登録</h1>
        <form onSubmit={onSubmit}>
          <div className={card()}>
            <InputContainer label="名前">
              <TextInput
                id="name"
                variants={{ marginX: 'none', width: 'fill' }}
                {...register('name')}
              />
            </InputContainer>
            <InputContainer label="プロフィール画像">
              <Controller
                control={control}
                name="profileIcon"
                defaultValue={undefined}
                render={({ field: { onChange } }) => (
                  <FileInput
                    id="profileImage"
                    onChange={(e) => {
                      const f = e.currentTarget.files?.item(0);
                      f && onChange(f);
                    }}
                  />
                )}
              />
            </InputContainer>

            <InputContainer label="メールアドレス">
              <TextInput
                id="email"
                type="email"
                variants={{ marginX: 'none', width: 'fill' }}
                {...register('email')}
              />
            </InputContainer>
            <InputContainer label="パスワード">
              <TextInput
                id="password"
                type="password"
                variants={{ marginX: 'none', width: 'fill' }}
                {...register('password')}
              />
            </InputContainer>
            <InputContainer label="生年月日">
              <DateInput id="dateOfBirth" {...register('dateOfBirth')} />
            </InputContainer>
            <RadioInputContainer>
              <RadioInput value="male" label="男性" {...register('gender')} />
              <RadioInput value="female" label="女性" {...register('gender')} />
            </RadioInputContainer>
            <CheckBoxInput
              label="利用規約への同意"
              {...register('termsAgreed')}
            />
            <Button type="submit">登録</Button>
          </div>
        </form>
      </section>
    </main>
  );
}
