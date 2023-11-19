'use client';

import { supabase } from '@/utils/supabase';
import { useState } from 'react';
import TextInput from '../../_components/TextInput';
import React from 'react';

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
      <button
        onClick={() => {
          supabase.auth.signUp({ email, password }).catch((error) => {
            throw new Error(error.message);
          });
        }}
      >
        登録
      </button>
    </main>
  );
}
