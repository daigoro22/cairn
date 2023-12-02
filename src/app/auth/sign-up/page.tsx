'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
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

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState<File>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    file && formData.append('file', file);
    formData.append('profileImageURL', 'https://google.com');
    formData.append('dateOfBirth', '2023/11/29');
    formData.append('gender', '男性');
    formData.append('termsAgreed', 'true');

    fetch('/api/auth/sign-up', {
      method: 'POST',
      body: formData,
    })
      .then(console.log)
      .catch(console.error);
  };

  return (
    <main className={mainAreaGrid()}>
      <section
        className={css({
          gridColumn: '5/9',
        })}
      >
        <h1 className={mainAreaLabel()}>ユーザ登録</h1>
        <form onSubmit={handleSubmit}>
          <div className={card()}>
            <InputContainer label="名前">
              <TextInput
                id="name"
                variants={{ marginX: 'none', width: 'fill' }}
                onChange={(e) => setName(e.target.value)}
              />
            </InputContainer>
            <InputContainer label="プロフィール画像">
              <FileInput
                id="profileImage"
                onChange={(e) => {
                  const f = e.currentTarget.files?.item(0);
                  f && setFile(f);
                }}
              />
            </InputContainer>
            <InputContainer label="メールアドレス">
              <TextInput
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                variants={{ marginX: 'none', width: 'fill' }}
              />
            </InputContainer>
            <InputContainer label="パスワード">
              <TextInput
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                variants={{ marginX: 'none', width: 'fill' }}
              />
            </InputContainer>
            <InputContainer label="生年月日">
              <DateInput id="birthDay" />
            </InputContainer>
            <RadioInputContainer>
              <RadioInput id="male" name="sex" value="male" label="男性" />
              <RadioInput id="female" name="sex" value="female" label="女性" />
            </RadioInputContainer>
            <CheckBoxInput name="confirmation" label="利用規約への同意" />
            <Button type="submit">登録</Button>
          </div>
        </form>
      </section>
    </main>
  );
}
