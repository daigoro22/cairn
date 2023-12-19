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
import { ACCEPT_IMAGE_TYPES } from '@/constants/profileIcon';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignUpApiSchema>({
    resolver: zodResolver(signUpApiSchema),
    mode: 'onSubmit',
    defaultValues: { gender: 'male' },
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

    const res = await fetch('/api/auth/sign-up', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      router.replace('/account-needs-confirmation');
    } else {
      alert('サインアップ処理に失敗しました');
    }
  });

  return (
    <main className={mainAreaGrid({ grid: 'xl' })}>
      <section
        className={css({
          gridColumn: { base: '1/7', lg: '5/9' },
        })}
      >
        <h1 className={mainAreaLabel()}>ユーザ登録</h1>
        <form onSubmit={onSubmit}>
          <div className={card({ padding: 'sm' })}>
            <InputContainer label="名前" error={errors.name}>
              <TextInput
                id="name"
                variants={{ marginX: 'none', width: 'fill' }}
                {...register('name')}
              />
            </InputContainer>
            <InputContainer
              label="プロフィールアイコン"
              error={errors.profileIcon}
            >
              <Controller
                control={control}
                name="profileIcon"
                defaultValue={undefined}
                render={({ field: { onChange } }) => (
                  <FileInput
                    id="profileImage"
                    accept={ACCEPT_IMAGE_TYPES.join(',')}
                    onChange={(e) => {
                      const f = e.currentTarget.files?.item(0);
                      f && onChange(f);
                    }}
                  />
                )}
              />
            </InputContainer>

            <InputContainer label="メールアドレス" error={errors.email}>
              <TextInput
                id="email"
                type="email"
                variants={{ marginX: 'none', width: 'fill' }}
                {...register('email')}
              />
            </InputContainer>
            <InputContainer label="パスワード" error={errors.password}>
              <TextInput
                id="password"
                type="password"
                variants={{ marginX: 'none', width: 'fill' }}
                {...register('password')}
              />
            </InputContainer>
            <InputContainer label="生年月日" error={errors.dateOfBirth}>
              <DateInput id="dateOfBirth" {...register('dateOfBirth')} />
            </InputContainer>
            <RadioInputContainer error={errors.gender}>
              <RadioInput value="male" label="男性" {...register('gender')} />
              <RadioInput value="female" label="女性" {...register('gender')} />
            </RadioInputContainer>
            <CheckBoxInput
              label="利用規約への同意"
              error={errors.termsAgreed}
              {...register('termsAgreed')}
            />
            <Button type="submit">登録</Button>
          </div>
        </form>
      </section>
    </main>
  );
}
