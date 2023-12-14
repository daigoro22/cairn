'use client';

import Link from 'next/link';
import Image from 'next/image';
import { css } from 'styled-system/css';
import ImageContainer from './ImageContainer';
import TextInput from './TextInput';
import Button from './Button';
import {
  AcademicCapIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/solid';
import FloatMenu from './FloatMenu';
import FloatMenuItem from './FloatMenuItem';
import { menuIcon } from './styles/display';
import { useCallback, useEffect, useState } from 'react';
import { createBrowserClient } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { newReviewApiResponseSchema } from '@/schemas/reviews';

export default function Header() {
  const [profileIconUrl, setProfileIconUrl] = useState('');
  const supabase = createBrowserClient();
  const router = useRouter();

  useEffect(() => {
    void (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const key =
        user?.user_metadata &&
        'profileIconPath' in user.user_metadata &&
        typeof user.user_metadata['profileIconPath'] === 'string'
          ? user.user_metadata['profileIconPath']
          : '';
      const { data } = await supabase.storage
        .from('profile_icons')
        .createSignedUrl(key, 3600);

      setProfileIconUrl(data?.signedUrl ?? '');
    })();
  }, [supabase.auth, supabase.storage]);

  const onLogout = useCallback(() => {
    setProfileIconUrl('');
    supabase.auth
      .signOut()
      .then(({ error }) => {
        console.log(error);
        if (!error) {
          router.push('/auth/login');
        }
      })
      .catch(console.error);
  }, [router, supabase.auth]);

  const onReviewSubmitButtonClicked = () => {
    void (async () => {
      const res = await fetch('/api/review/new', { method: 'POST' });
      if (res.ok) {
        const parsed = newReviewApiResponseSchema.safeParse(await res.json());
        if (parsed.success) {
          router.push(`/review/${parsed.data.data.id}/edit`);
        }
      }
    })();
  };

  return (
    <header
      className={css({
        height: 'header',
        display: 'grid',
        gridTemplateColumns: { base: 'repeat(6,1fr)', lg: 'repeat(12,1fr)' },
        gridColumnGap: 'gridGap.md',
        alignItems: 'center',
        bg: 'white',
        position: 'fixed',
        zIndex: 999,
        top: 0,
        left: 0,
        width: '100%',
      })}
    >
      <Link
        href="/"
        className={css({
          gridColumn: '1/5',
          alignItems: 'center',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          })}
        >
          <ImageContainer size="header">
            <Image
              src="/top-icon.png"
              sizes="100vw"
              fill
              objectFit="cover"
              alt="cairn"
            />
          </ImageContainer>
        </div>
      </Link>
      <div
        className={css({
          gridColumn: '9/11',
          display: { base: 'none', lg: 'inline' },
        })}
      >
        <TextInput
          variants={{ marginX: 'none', width: 'fill' }}
          id="search"
          type="search"
          placeholder="検索"
        />
      </div>
      {profileIconUrl && (
        <div
          className={`${css({
            gridColumn: { base: '5/6', lg: '11/12' },
            margin: 'auto',
            position: 'relative',
          })} group`}
        >
          <ImageContainer size="icon.menu">
            <Image
              src={profileIconUrl}
              sizes="100vw"
              fill
              objectFit="cover"
              alt="cairn"
            />
          </ImageContainer>
          <FloatMenu>
            <Link href="/background/edit">
              <FloatMenuItem
                icon={<AcademicCapIcon className={menuIcon()} />}
                label="経歴登録"
              />
            </Link>
            <button type="button" onClick={onLogout}>
              <FloatMenuItem
                icon={<ArrowLeftOnRectangleIcon className={menuIcon()} />}
                label="ログアウト"
              />
            </button>
          </FloatMenu>
        </div>
      )}
      <div
        className={css({
          gridColumn: { base: '6/7', lg: '12/13' },
          margin: 'auto',
        })}
      >
        {profileIconUrl ? (
          <Button onClick={onReviewSubmitButtonClicked}>投稿</Button>
        ) : (
          <Link href="/auth/login">
            <Button>ログイン</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
