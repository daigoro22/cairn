import Link from 'next/link';
import Image from 'next/image';
import { css } from 'styled-system/css';
import ImageContainer from './ImageContainer';
import TextInput from './TextInput';
import Button from './Button';
import { delaGothicOne } from '../fonts';

export default function Header() {
  return (
    <header
      className={css({
        height: 'header',
        display: 'grid',
        gridTemplateColumns: 'repeat(12,1fr)',
        gridColumnGap: 'gridGap.main',
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
          <h1
            className={`${css({ fontSize: 'xl', color: 'primary.dark' })} ${
              delaGothicOne.className
            }`}
          >
            Cairn
          </h1>
        </div>
      </Link>
      <div
        className={css({
          gridColumn: '9/11',
        })}
      >
        <TextInput
          variants={{ marginX: 'none', width: 'fill' }}
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
  );
}
