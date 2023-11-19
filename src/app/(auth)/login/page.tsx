'use client';

import { supabase } from '@/utils/supabase';
import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button
        onClick={() => {
          supabase.auth
            .signInWithPassword({
              email,
              password,
            })
            .catch((error) => {
              throw new Error(error.message);
            });
        }}
      >
        ログイン
      </button>
    </main>
  );
}
