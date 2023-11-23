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

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main>
      <form>
        <InputContainer label="メールアドレス">
          <TextInput id="mail" onChange={(e) => setEmail(e.target.value)} />
        </InputContainer>
        <InputContainer label="パスワード">
          <TextInput
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
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
      </form>
    </main>
  );
}
