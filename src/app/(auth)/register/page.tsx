'use client';

import { supabase } from '@/utils/supabase';
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
import { card, mainAreaGrid } from '@/app/_components/styles/layout';
import FileInput from '@/app/_components/FileInput';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className={mainAreaGrid()}>
      <section
        className={css({
          gridColumn: '5/9',
        })}
      >
        <h1
          className={css({ fontSize: 'xl', gridColumn: '5/9', paddingY: 'xl' })}
        >
          ユーザ登録
        </h1>
        <form>
          <div className={card()}>
            <InputContainer label="名前">
              <TextInput
                id="name"
                variants={{ marginX: 'none', width: 'fill' }}
              />
            </InputContainer>
            <InputContainer label="プロフィール画像">
              <FileInput id="profileImage" />
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
            <Button
              onClick={() => {
                supabase.auth
                  .signUp({ email, password })
                  .then(console.log)
                  .catch(console.error);
              }}
            >
              登録
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
