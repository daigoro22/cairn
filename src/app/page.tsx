'use client';

import { join } from '@/utils/panda';
import { mainAreaGrid, subGrid } from './_components/styles/_layout';
import { css } from 'styled-system/css';
import ReviewCard from './_components/ReviewCard';

export default function Home() {
  return (
    <main className={mainAreaGrid({ grid: 'lg' })}>
      <section
        className={join([
          subGrid(),
          css({ gridColumn: '3/11', gridRow: '2/13' }),
        ])}
      >
        <div
          className={css({
            gridColumn: '1/9',
            gridRow: '1/13',
            bg: 'white',
            borderRadius: 'card.md',
            display: 'flex',
            gap: '2rem',
            padding: 'xl',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
          })}
        >
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
      </section>
    </main>
  );
}
