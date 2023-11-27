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
        <h1 className={mainAreaLabel({ grid: 'lg' })}>経歴登録</h1>
        <div
          className={css({
            gridColumn: '1/7',
            gridRow: '2/13',
            bg: 'white',
            borderRadius: 'card.md',
            display: 'flex',
            flexDirection: 'column',
            gap: 'xl',
            padding: 'xl',
            justifyContent: 'flex-start',
          })}
        >
          <form>
            <div
              className={css({
                display: 'grid',
                gridTemplateColumns: 'repeat(7,auto)',
                gridTemplateRows: 'repeat(4,auto)',
                gridColumn: '1/7',
                gridRow: '1/4',
                borderRadius: 'card.xs',
                border: 'primary',
              })}
            >
              <div
                className={css({
                  gridColumn: '1/2',
                  gridRow: '1/2',
                  paddingLeft: 'md',
                  paddingTop: 'md',
                })}
              >
                <h2 className={inputLabel({ fontSize: 'lg' })}>経歴1</h2>
              </div>
              <div
                className={css({
                  gridColumn: '6/7',
                  gridRow: '1/2',
                  paddingTop: 'md',
                })}
              >
                <Button variant="tertiary">削除</Button>
              </div>

              <div
                className={join([
                  css({
                    gridColumn: '1/3',
                    gridRow: '3/4',
                  }),
                  gridCellFlex(),
                ])}
              >
                <InputContainer label="大学/会社名">
                  <div
                    className={css({
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: 'md',
                      alignItems: 'flex-end',
                    })}
                  >
                    <p>豊橋技術科学大学</p>
                    <Button variant="secondary">検索</Button>
                  </div>
                </InputContainer>
              </div>

              <div
                className={css({
                  gridColumn: '3/7',
                  gridRow: '3/4',
                  padding: 'md',
                })}
              >
                <InputContainer label="在籍期間">
                  <div
                    className={css({
                      display: 'flex',
                      justifyContent: 'flex-start',
                      gap: 'md',
                    })}
                  >
                    <DateInput />
                    <p>〜</p>
                    <DateInput />
                  </div>
                </InputContainer>
              </div>
            </div>
          </form>
          <div className={css({ display: 'flex', gap: 'md' })}>
            <Button variant="secondary">経歴追加</Button>
            <Button variant="primary">登録</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
