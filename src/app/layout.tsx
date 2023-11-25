import { css } from 'styled-system/css';
import './globals.css';
import Image from 'next/image';
import ImageContainer from './_components/ImageContainer';
import Link from 'next/link';
import Button from './_components/Button';
import TextInput from './_components/TextInput';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={css({
          bg: 'primary.bg',
          display: 'grid',
          gridTemplateColumns: 'repeat(12,minmax(0,1fr))',
          gridColumnGap: 'gridGap.main',
        })}
      >
        <header
          className={css({
            height: 'header',
            bg: 'white',
            display: 'grid',
            gridTemplateColumns: 'subgrid',
            gridColumn: '1/13',
            alignItems: 'center',
          })}
        >
          <Link
            href="/"
            className={css({
              gridColumn: '1/3',
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
                  src="/icon.png"
                  sizes="100vw"
                  fill
                  objectFit="cover"
                  alt="cairn"
                />
              </ImageContainer>
              <h1 className={css({ fontSize: 'xl' })}>Cairn</h1>
            </div>
          </Link>
          <div
            className={css({
              gridColumn: '9/11',
            })}
          >
            <TextInput
              variants={{ marginX: 'none' }}
              id="search"
              type="search"
              placeholder="検索"
            />
          </div>
          <div
            className={css({
              gridColumn: '11/12',
              margin: 'auto',
            })}
          >
            <ImageContainer size="icon">
              <Image
                src="/icon.png"
                sizes="100vw"
                fill
                objectFit="cover"
                alt="cairn"
              />
            </ImageContainer>
          </div>
          <div
            className={css({
              gridColumn: '12/13',
              margin: 'auto',
            })}
          >
            <Button>投稿</Button>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
