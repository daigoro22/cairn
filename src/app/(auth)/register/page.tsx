'use client';

import { supabase } from '@/utils/supabase';
import { useState } from 'react';
import TextInput from '../../_components/TextInput';
import React from 'react';
import DateInput from '@/app/_components/DateInput';
import RadioInput from '@/app/_components/RadioInput';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main>
      <TextInput onChange={(e) => setEmail(e.target.value)} />
      <TextInput
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <DateInput />
      <RadioInput name="sex" value="male" label="男" />
      <RadioInput name="sex" value="female" label="女" />
      <button
        onClick={() => {
          supabase.auth
            .signUp({ email, password })
            .then(console.log)
            .catch(console.error);
        }}
      >
        登録
      </button>
    </main>
  );
}
