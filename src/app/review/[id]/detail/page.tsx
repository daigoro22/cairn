'use client';

import ImageContainer from '@/app/_components/ImageContainer';
import InputContainer from '@/app/_components/InputContainer';
import { mainAreaLabel } from '@/app/_components/styles/display';
import { mainAreaGrid, subGrid } from '@/app/_components/styles/_layout';
import { css, cva } from 'styled-system/css';
import Image from 'next/image';
import { join } from '@/utils/panda';
import { inputLabel } from '@/app/_components/styles/input';
import RangeInput from '@/app/_components/RangeInput';
import { useEffect, useState } from 'react';
import type { ReviewGetApiSchema } from '@/schemas/reviews';
import { reviewGetApiSchema } from '@/schemas/reviews';

const gridCellFlex = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    padding: 'md',
  },
});

export default function ReviewPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [review, setReview] = useState<ReviewGetApiSchema>();

  const data = review?.data;

  useEffect(() => {
    void (async () => {
      const res = await fetch(`/api/review/${id}`, { method: 'GET' });
      const parsed = reviewGetApiSchema.safeParse(await res.json());
      if (parsed.success) {
        setReview(parsed.data);
      } else {
        alert('レビューデータの取得に失敗しました');
      }
    })();
  }, [id]);

  return (
    <main className={mainAreaGrid({ grid: 'xl' })}>
      <section
        className={join([
          subGrid(),
          css({
            gridColumn: { base: '1/5', sm: '2/6', lg: '4/10' },
            gridRow: '1/13',
            gridGap: { base: 'sm', lg: 'lg' },
          }),
        ])}
      >
        <h1 className={mainAreaLabel({ grid: 'lg' })}>レビュー投稿</h1>
        <div
          className={join([
            subGrid(),
            css({
              gridColumn: { base: '1/6', lg: '1/7' },
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
                gridColumn: { base: '1/5', lg: '1/7' },
                gridRow: '1/13',
              }),
            ])}
          >
            <div
              className={css({
                gridColumn: { base: '1/5', lg: '1/7' },
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
                {data?.itemImageUrl && (
                  <Image
                    src={data?.itemImageUrl}
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
                gridColumn: { base: '3/5', lg: '3/7' },
                gridRow: '2/3',
              })}
            >
              <a href={data?.itemUrl}>{data?.itemName}</a>
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
                <RangeInput
                  min={0}
                  max={5}
                  step={0.5}
                  disabled
                  value={data?.rating}
                >
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
                  gridColumn: { base: '1/3', lg: '1/4' },
                  gridRow: '4/5',
                }),
                gridCellFlex(),
              ])}
            >
              <InputContainer label="買った時期">
                {data?.purchaseDate ?? ''}
              </InputContainer>
            </div>
            <div
              className={join([
                css({
                  gridColumn: { base: '3/5', lg: '4/7' },
                  gridRow: '4/5',
                }),
                gridCellFlex(),
              ])}
            >
              <InputContainer label="買った目的">
                {data?.objective ?? ''}
              </InputContainer>
            </div>
            <div
              className={join([
                css({
                  gridColumn: { base: '1/3', lg: '1/4' },
                  gridRow: '5/6',
                }),
                gridCellFlex(),
              ])}
            >
              <InputContainer label="目的の達成期間">
                {`${String(data?.daysForObjectiveAchievement ?? 0)} 日`}
              </InputContainer>
            </div>
            <div
              className={join([
                css({
                  gridColumn: { base: '3/5', lg: '4/7' },
                  gridRow: '5/6',
                }),
                gridCellFlex(),
              ])}
            >
              <InputContainer label="現在の目的の達成度合い">
                {`${String(data?.objectiveCompletionPercent)} %`}
              </InputContainer>
            </div>
            <div
              className={join([
                css({
                  gridColumn: '1/6',
                  gridRow: '6/8',
                }),
                gridCellFlex(),
              ])}
            >
              <InputContainer label="レビュー">
                {data?.review ?? ''}
              </InputContainer>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
