'use client';

import Button from '@/app/_components/Button';
import InputContainer from '@/app/_components/InputContainer';
import TextInput from '@/app/_components/TextInput';
import { mainAreaLabel } from '@/app/_components/styles/display';
import { card, mainAreaGrid } from '@/app/_components/styles/_layout';
import { supabase } from '@/utils/supabase';
import { useState } from 'react';
import { css } from 'styled-system/css';

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
        <h1 className={mainAreaLabel()}>ログイン</h1>
        <form>
          <div className={card()}>
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
            <Button
              onClick={() => {
                supabase.auth
                  .signInWithPassword({ email, password })
                  .then(console.log)
                  .catch(console.error);
              }}
            >
              ログイン
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
