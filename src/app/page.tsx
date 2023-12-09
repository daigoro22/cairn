'use client';

import { join } from '@/utils/panda';
import { mainAreaGrid, subGrid } from './_components/styles/_layout';
import { css } from 'styled-system/css';
import ReviewCard from './_components/ReviewCard';
import { useEffect, useState } from 'react';
import type { ReviewTimelineApiSchema } from '@/schemas/reviews';
import { reviewTimelineApiSchema } from '@/schemas/reviews';

export default function Home() {
  const [reviews, setReviews] = useState<ReviewTimelineApiSchema['data']>([]);

  useEffect(() => {
    void (async () => {
      const res = await fetch('/api/review', { method: 'GET' });
      const data = await res.json();
      console.log(data);
      const parsed = reviewTimelineApiSchema.safeParse(data);
      if (parsed.success) {
        setReviews(parsed.data.data);
      } else {
        console.log(parsed.error);
        alert('レビューデータの取得に失敗しました');
      }
    })();
  }, []);

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
          {reviews.map(
            ({
              id,
              rating,
              objective,
              objectiveCompletionPercent,
              itemName,
              itemImageUrl,
            }) => (
              <ReviewCard
                key={id}
                id={id}
                rating={rating}
                objective={objective}
                objectiveCompletionPercent={objectiveCompletionPercent}
                itemName={itemName}
                itemImageUrl={itemImageUrl}
              />
            ),
          )}
        </div>
      </section>
    </main>
  );
}
