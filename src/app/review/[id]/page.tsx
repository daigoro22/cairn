import Button from '@/app/_components/Button';
import DateInput from '@/app/_components/DateInput';
import ImageContainer from '@/app/_components/ImageContainer';
import InputContainer from '@/app/_components/InputContainer';
import TextInput from '@/app/_components/TextInput';
import { mainAreaLabel } from '@/app/_components/styles/display';
import { mainAreaGrid, subGrid } from '@/app/_components/styles/layout';
import { css } from 'styled-system/css';
import Image from 'next/image';
import { join } from '@/utils/panda';

export default function ReviewPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <main className={mainAreaGrid({ grid: 'lg' })}>
      <section
        className={join([
          subGrid(),
          css({ gridColumn: '4/10', gridRow: '1/13' }),
        ])}
      >
        <h1 className={mainAreaLabel({ grid: 'lg' })}>レビュー投稿</h1>
        <div
          className={join([
            subGrid(),
            css({
              gridColumn: '1/7',
              gridRow: '2/13',
              bg: 'white',
              borderRadius: 'card',
            }),
          ])}
        >
          <form
            className={join([
              subGrid(),
              css({
                gridColumn: '1/7',
                gridRow: '1/13',
              }),
            ])}
          >
            <div
              className={css({
                gridColumn: '1/7',
                gridRow: '1/3',
                bg: 'blue',
              })}
            >
              <h2
                className={css({
                  fontSize: 'lg',
                  marginLeft: 'md',
                  marginTop: 'md',
                })}
              >
                商品
              </h2>
              <ImageContainer size="item">
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
                gridColumn: '1/4',
                gridRow: '3/4',
                bg: 'blue',
              })}
            ></div>
            <div
              className={css({
                gridColumn: '1/4',
                gridRow: '4/5',
                bg: 'blue',
              })}
            ></div>
            <div
              className={css({
                gridColumn: '4/7',
                gridRow: '4/5',
                bg: 'blue',
              })}
            ></div>
            <div
              className={css({
                gridColumn: '1/4',
                gridRow: '5/6',
                bg: 'blue',
              })}
            ></div>
            <div
              className={css({
                gridColumn: '1/4',
                gridRow: '6/7',
                bg: 'blue',
              })}
            ></div>
            <div
              className={css({
                gridColumn: '4/7',
                gridRow: '6/7',
                bg: 'blue',
              })}
            ></div>
            <div
              className={css({
                gridColumn: '1/7',
                gridRow: '7/9',
                bg: 'blue',
              })}
            ></div>
            <div
              className={css({
                gridColumn: '1/4',
                gridRow: '9/10',
                bg: 'blue',
              })}
            ></div>
          </form>
        </div>
      </section>
    </main>
  );
}
