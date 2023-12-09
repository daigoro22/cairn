import { css } from 'styled-system/css';
import ImageContainer from './ImageContainer';
import Image from 'next/image';
import Link from 'next/link';

export default function ReviewCard({
  id,
  itemName,
  rating,
  objective,
  objectiveCompletionPercent,
  itemImageUrl,
}: {
  id: string;
  itemName: string;
  rating: number;
  objective: string;
  objectiveCompletionPercent: number;
  itemImageUrl: string | undefined | null;
}) {
  return (
    <Link href={`/review/${id}/detail`}>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(6,minmax(2rem,1fr))',
          gridTemplateRows: 'repeat(2,2rem) repeat(4,auto)',
          gridColumn: '1/9',
          gridRow: '1/5',
          borderRadius: 'card.xs',
          border: 'primary',
          gap: 'gridGap.sm',
          width: '18rem',
          height: '18rem',
        })}
      >
        <div
          className={css({
            gridColumn: '1/7',
            gridRow: '1/4',
          })}
        >
          <ImageContainer size="item.top">
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
            gridRow: '4/5',
            marginLeft: 'md',
          })}
        >
          <p
            className={css({
              fontSize: 'md',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            })}
          >
            {itemName}
          </p>
          <p>総合評価：{rating}</p>
        </div>
        <div
          className={css({
            gridColumn: '1/7',
            gridRow: '5/6',
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 'md',
          })}
        >
          <p>購入目的：{objective}</p>
          <p>達成度：{objectiveCompletionPercent}%</p>
        </div>
        <div
          className={css({
            gridColumn: '1/2',
            gridRow: '6/7',
            margin: 'auto',
          })}
        >
          <ImageContainer size="icon.reviewCard">
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
            gridColumn: '2/7',
            gridRow: '6/7',
            marginY: 'auto',
          })}
        >
          <p className={css({ fontSize: 'sm' })}>テストユーザ@購入時の肩書</p>
        </div>
      </div>
    </Link>
  );
}
