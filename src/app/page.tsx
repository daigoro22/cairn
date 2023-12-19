'use client';

import { join } from '@/utils/panda';
import { mainAreaGrid, subGrid } from './_components/styles/_layout';
import { css } from 'styled-system/css';
import ReviewCard from './_components/ReviewCard';
import { useEffect, useState } from 'react';
import type { ReviewTimelineApiSchema } from '@/schemas/reviews';
import { reviewTimelineApiSchema } from '@/schemas/reviews';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [reviews, setReviews] = useState<ReviewTimelineApiSchema['data']>([]);
  const router = useRouter();

  useEffect(() => {
    void (async () => {
      const res = await fetch('/api/review', { method: 'GET' });
      if (res.status === 401) {
        router.replace('/auth/login');
      } else if (res.ok) {
        const parsed = reviewTimelineApiSchema.safeParse(await res.json());
        if (parsed.success) {
          setReviews(parsed.data.data);
        } else {
          console.log(parsed.error);
          alert('レビューデータの取得に失敗しました');
        }
      }
    })();
  }, [router]);

  return (
    <main className={mainAreaGrid({ grid: 'xl' })}>
      <section
        className={join([
          subGrid(),
          css({
            gridColumn: { base: '1/5', sm: '1/7', lg: '3/11' },
            gridRow: '2/13',
          }),
        ])}
      >
        <div
          className={css({
            gridColumn: { base: '1/5', sm: '1/7', lg: '1/9' },
            gridRow: '1/13',
            bg: 'white',
            borderRadius: 'card.md',
            display: 'flex',
            gap: '2rem',
            padding: 'xl',
            margin: 'md',
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
              title,
              itemImageUrl,
              userName,
              userProfileIconUrl,
            }) => (
              <ReviewCard
                key={id}
                id={id}
                userName={userName}
                userProfileIconUrl={userProfileIconUrl}
                rating={rating}
                objective={objective}
                objectiveCompletionPercent={objectiveCompletionPercent}
                title={title}
                itemImageUrl={itemImageUrl}
              />
            ),
          )}
        </div>
      </section>
    </main>
  );
}
