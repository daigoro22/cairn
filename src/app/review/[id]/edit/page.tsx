import Button from '@/app/_components/Button';
import DateInput from '@/app/_components/DateInput';
import ImageContainer from '@/app/_components/ImageContainer';
import InputContainer from '@/app/_components/InputContainer';
import TextInput from '@/app/_components/TextInput';
import { mainAreaLabel } from '@/app/_components/styles/display';
import { mainAreaGrid, subGrid } from '@/app/_components/styles/_layout';
import { css, cva } from 'styled-system/css';
import Image from 'next/image';
import { join } from '@/utils/panda';
import { input, inputLabel } from '@/app/_components/styles/input';
import RangeInput from '@/app/_components/RangeInput';

const gridCellFlex = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    padding: 'md',
  },
});

export default function ReviewPage({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log(id);

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
              borderRadius: 'card.md',
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
                paddingLeft: 'md',
                paddingTop: 'md',
              })}
            >
              <h2 className={inputLabel()}>商品</h2>
            </div>
            <div
              className={css({
                gridColumn: '1/3',
                gridRow: '2/3',
                marginX: 'auto',
              })}
            >
              <ImageContainer size="item.review">
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
              className={join([
                css({
                  gridColumn: '3/7',
                  gridRow: '2/3',
                  gap: 'lg',
                }),
                gridCellFlex(),
              ])}
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
              </p>
              <Button variant="secondary">検索</Button>
            </div>
            <div
              className={join([
                css({
                  gridColumn: '1/4',
                  gridRow: '3/4',
                }),
                gridCellFlex(),
              ])}
            >
              <InputContainer label="総合評価">
                <RangeInput min={0} max={5} step={0.5}>
                  {[...Array(6).keys()].map((_, i) => (
                    <option
                      key={`rangeOption${i}`}
                      value={`${i}`}
                      label={`${i}`}
                    />
                  ))}
                </RangeInput>
              </InputContainer>
            </div>
            <div
              className={join([
                css({
                  gridColumn: '1/5',
                  gridRow: '4/5',
                }),
                gridCellFlex(),
              ])}
            >
              <InputContainer label="商品URL">
                <TextInput type="url" />
              </InputContainer>
            </div>
            <div
              className={join([
                css({
                  gridColumn: '5/7',
                  gridRow: '4/5',
                }),
                gridCellFlex(),
              ])}
            >
              <InputContainer label="買った時期">
                <DateInput />
              </InputContainer>
            </div>
            <div
              className={join([
                css({
                  gridColumn: '1/5',
                  gridRow: '5/6',
                }),
                gridCellFlex(),
              ])}
            >
              <InputContainer label="買った目的">
                <TextInput type="text" />
              </InputContainer>
            </div>
            <div
              className={join([
                css({
                  gridColumn: '1/3',
                  gridRow: '6/7',
                }),
                gridCellFlex(),
              ])}
            >
              <InputContainer label="目的の達成期間">
                <TextInput type="number" step={1} />
              </InputContainer>
            </div>
            <div
              className={join([
                css({
                  gridColumn: '3/4',
                  gridRow: '6/7',
                  justifyContent: 'flex-end',
                }),
                gridCellFlex(),
              ])}
            >
              <p className={css({ fontSize: 'md' })}>日</p>
            </div>
            <div
              className={join([
                css({
                  gridColumn: '4/6',
                  gridRow: '6/7',
                }),
                gridCellFlex(),
              ])}
            >
              <InputContainer label="現在の目的の達成度合い">
                <TextInput type="number" min={0} max={100} step={1} />
              </InputContainer>
            </div>
            <div
              className={join([
                css({
                  gridColumn: '6/7',
                  gridRow: '6/7',
                  justifyContent: 'flex-end',
                }),
                gridCellFlex(),
              ])}
            >
              <p className={css({ fontSize: 'md' })}>%</p>
            </div>
            <div
              className={join([
                css({
                  gridColumn: '1/6',
                  gridRow: '7/9',
                }),
                gridCellFlex(),
              ])}
            >
              <InputContainer label="レビュー">
                <textarea
                  className={input({ height: 'block' })}
                  rows={10}
                  cols={50}
                />
              </InputContainer>
            </div>

            <div
              className={join([
                css({
                  gridColumn: '1/4',
                  gridRow: '9/10',
                }),
                gridCellFlex(),
              ])}
            >
              <Button variant="primary">投稿</Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
