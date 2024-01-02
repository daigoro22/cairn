import { css } from 'styled-system/css';
import ImageContainer from './ImageContainer';
import Image from 'next/image';
import Link from 'next/link';

export default function ReviewCard({
  id,
  title,
  rating,
  objective,
  objectiveCompletionPercent,
  itemImageUrl,
  userName,
  userProfileIconUrl,
}: {
  id: string;
  title: string;
  rating: number;
  objective: string;
  objectiveCompletionPercent: number;
  itemImageUrl: string | undefined | null;
  userName: string;
  userProfileIconUrl: string | undefined | null;
}) {
  return (
    <Link href={`/review/${id}/detail`}>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(6,minmax(2rem,1fr))',
          gridTemplateRows: 'repeat(2,4rem) repeat(4,auto)',
          gridColumn: '1/9',
          gridRow: '1/5',
          borderRadius: 'card.xs',
          border: 'primary',
          gap: 'gridGap.sm',
          width: { base: '16rem', lg: '20rem' },
          height: '100%',
        })}
      >
        <div
          className={css({
            gridColumn: '1/7',
            gridRow: '1/3',
          })}
        >
          <ImageContainer size="item.top" border="card">
            {itemImageUrl && (
              <Image
                src={itemImageUrl}
                sizes="100vw"
                fill
                objectFit="cover"
                alt="cairn"
              />
            )}
          </ImageContainer>
        </div>
        <div
          className={css({
            gridColumn: '1/7',
            gridRow: '3/4',
            marginLeft: 'md',
          })}
        >
          <h1
            className={css({
              fontSize: 'lg',
              lineClamp: 2,
            })}
          >
            {title}
          </h1>
        </div>
        <div
          className={css({
            gridColumn: '1/7',
            gridRow: '4/5',
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 'md',
            fontSize: 'md',
          })}
        >
          <div>
            <p className={css({ display: 'inline' })}>総合評価：</p>
            <p
              className={css({
                color: 'primary.dark',
                display: 'inline',
                fontWeight: 800,
              })}
            >
              {rating}
            </p>
          </div>
        </div>
        <div
          className={css({
            gridColumn: '1/7',
            gridRow: '5/6',
            marginLeft: 'md',
            fontSize: 'md',
          })}
        >
          <p>購入目的（達成度{objectiveCompletionPercent}%）</p>
          <p>{objective}</p>
        </div>
        <div
          className={css({
            gridColumn: '1/7',
            gridRow: '6/7',
            marginY: 'auto',
            marginLeft: 'md',
            display: 'flex',
            gap: 'md',
            alignItems: 'center',
          })}
        >
          <ImageContainer size="icon.reviewCard" border="circle">
            {userProfileIconUrl && (
              <Image
                src={userProfileIconUrl}
                sizes="100vw"
                fill
                objectFit="cover"
                alt="cairn"
              />
            )}
          </ImageContainer>
          <p className={css({ fontSize: 'sm' })}>{userName}</p>
          {/* TODO: 購入時の肩書追加 */}
        </div>
      </div>
    </Link>
  );
}
