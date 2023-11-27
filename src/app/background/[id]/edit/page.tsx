import Button from '@/app/_components/Button';
import { mainAreaLabel } from '@/app/_components/styles/display';
import { mainAreaGrid, subGrid } from '@/app/_components/styles/_layout';
import { css } from 'styled-system/css';
import { join } from '@/utils/panda';
import BackGroundInput from '@/app/_components/BackGroundInput';

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
          <BackGroundInput index={1} />
          <BackGroundInput index={2} />
          <div className={css({ display: 'flex', gap: 'md' })}>
            <Button variant="secondary">経歴追加</Button>
            <Button variant="primary">登録</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
