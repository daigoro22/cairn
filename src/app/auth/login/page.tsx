'use client';

import Button from '@/app/_components/Button';
import InputContainer from '@/app/_components/InputContainer';
import TextInput from '@/app/_components/TextInput';
import { mainAreaLabel } from '@/app/_components/styles/display';
import { card, mainAreaGrid } from '@/app/_components/styles/_layout';
import { css } from 'styled-system/css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { LoginApiSchema } from '@/schemas/login';
import { loginApiSchema } from '@/schemas/login';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginApiSchema>({
    resolver: zodResolver(loginApiSchema),
    mode: 'onSubmit',
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.ok) {
      location.href = '/';
    } else {
      alert('ログイン処理に失敗しました');
    }
  });

  return (
    <main className={mainAreaGrid({ grid: 'xl' })}>
      <section
        className={css({
          gridColumn: { base: '1/7', lg: '5/9' },
        })}
      >
        <h1 className={mainAreaLabel()}>ログイン</h1>
        <form onSubmit={onSubmit}>
          <div className={card()}>
            <Link
              href="/auth/sign-up"
              className={css({ color: 'primary.dark' })}
            >
              新規登録はこちら
            </Link>

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
            <Button type="submit">ログイン</Button>
          </div>
        </form>
      </section>
    </main>
  );
}
