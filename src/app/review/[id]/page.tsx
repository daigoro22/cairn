import Button from '@/app/_components/Button';
import DateInput from '@/app/_components/DateInput';
import ImageContainer from '@/app/_components/ImageContainer';
import InputContainer from '@/app/_components/InputContainer';
import TextInput from '@/app/_components/TextInput';
import { mainAreaLabel } from '@/app/_components/styles/display';
import { mainAreaGrid, subGrid } from '@/app/_components/styles/layout';
import { css, cva } from 'styled-system/css';
import Image from 'next/image';
import { join } from '@/utils/panda';

const h2Label = cva({
  base: {
    fontSize: 'lg',
    marginLeft: 'md',
    marginTop: 'md',
  },
});

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
                gridRow: '1/2',
              })}
            >
              <h2 className={h2Label()}>商品</h2>
            </div>
            <div
              className={css({
                gridColumn: '1/3',
                gridRow: '2/3',
                marginX: 'auto',
              })}
            >
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
                gridColumn: '3/7',
                gridRow: '2/3',
                display: 'flex',
                flexDirection: 'column',
                gap: 'lg',
              })}
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
              </p>
              <Button variant="secondary">検索</Button>
            </div>
            <div
              className={css({
                gridColumn: '1/4',
                gridRow: '3/4',
                display: 'flex',
                flexDirection: 'column',
                gap: 'lg',
              })}
            >
              <h2 className={h2Label()}>総合評価</h2>
            </div>
            <div
              className={css({
                gridColumn: '1/4',
                gridRow: '4/5',
                display: 'flex',
                flexDirection: 'column',
                padding: 'md',
              })}
            >
              <input type="range" min={0} max={5} step={0.5} list="values" />
              <datalist
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                })}
                id="values"
              >
                <option value="0" label="0"></option>
                <option value="1" label="1"></option>
                <option value="2" label="2"></option>
                <option value="3" label="3"></option>
                <option value="4" label="4"></option>
                <option value="5" label="5"></option>
              </datalist>
            </div>
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
