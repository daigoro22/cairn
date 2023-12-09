'use client';

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
import { useEffect, useRef } from 'react';
import ItemSearchDialog from '@/app/_components/ItemSearchDialog';
import { useForm, FormProvider } from 'react-hook-form';
import {
  reviewEditApiSchema,
  reviewGetApiSchema,
  type ReviewEditApiSchema,
} from '@/schemas/reviews';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { isKeyOfObject } from '@/utils/form';
import { useRouter } from 'next/navigation';

const gridCellFlex = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    padding: 'md',
  },
});

export default function ReviewPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogOpen = () => dialogRef.current?.showModal();

  const methods = useForm<ReviewEditApiSchema>({
    resolver: zodResolver(reviewEditApiSchema),
    mode: 'onSubmit',
    defaultValues: {
      id,
      rating: 2.5,
      purchaseDate: format(new Date(), 'yyyy/MM/dd'),
      objective: '',
      daysForObjectiveAchievement: 1,
      objectiveCompletionPercent: 0,
      review: '',
      itemImageUrl: '',
      itemUrl: '',
    },
  });
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
  } = methods;

  const itemImageUrl = watch('itemImageUrl');
  const itemName = watch('itemName');
  const rating = watch('rating', 2.5);

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch(`/api/review/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    if (res.status === 204) {
      alert('レビューの更新が完了しました');
      router.push('/');
    } else {
      alert('レビューの更新に失敗しました');
    }
  });

  useEffect(() => {
    void (async () => {
      const res = await fetch(`/api/review/${id}`, { method: 'GET' });
      const parsed = reviewGetApiSchema.safeParse(await res.json());
      if (parsed.success) {
        for (const [key, value] of Object.entries(parsed.data.data)) {
          if (isKeyOfObject(key, parsed.data.data)) setValue(key, value);
        }
      } else {
        alert('レビュー情報の取得に失敗しました');
        router.push('/');
      }
    })();
  }, [id, router, setValue]);

  return (
    <FormProvider {...methods}>
      <form
        className={join([
          subGrid(),
          css({
            gridColumn: '1/7',
            gridRow: '1/13',
          }),
        ])}
        onSubmit={onSubmit}
      >
        <main className={mainAreaGrid({ grid: 'lg' })}>
          <section
            className={join([
              subGrid(),
              css({ gridColumn: '4/10', gridRow: '1/13' }),
            ])}
          >
            <ItemSearchDialog ref={dialogRef} />
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
                className={join([
                  css({
                    gridColumn: '3/7',
                    gridRow: '2/3',
                    gap: 'lg',
                  }),
                  gridCellFlex(),
                ])}
              >
                <p>{itemName}</p>
                <Button type="button" variant="secondary" onClick={dialogOpen}>
                  選択
                </Button>
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
                <InputContainer
                  label={`総合評価：${rating}`}
                  error={errors.rating}
                >
                  <RangeInput
                    min={0}
                    max={5}
                    step={0.5}
                    {...register('rating')}
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
                    gridColumn: '1/5',
                    gridRow: '4/5',
                  }),
                  gridCellFlex(),
                ])}
              >
                <InputContainer label="商品URL" error={errors.itemUrl}>
                  <TextInput type="url" {...register('itemUrl')} />
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
                <InputContainer label="買った時期" error={errors.purchaseDate}>
                  <DateInput {...register('purchaseDate')} />
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
                <InputContainer label="買った目的" error={errors.objective}>
                  <TextInput type="text" {...register('objective')} />
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
                <InputContainer
                  label="目的の達成期間"
                  error={errors.daysForObjectiveAchievement}
                >
                  <TextInput
                    type="number"
                    step={1}
                    min={1}
                    {...register('daysForObjectiveAchievement')}
                  />
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
                <InputContainer
                  label="現在の目的の達成度合い"
                  error={errors.objectiveCompletionPercent}
                >
                  <TextInput
                    type="number"
                    min={0}
                    max={100}
                    step={1}
                    {...register('objectiveCompletionPercent')}
                  />
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
                <InputContainer label="レビュー" error={errors.review}>
                  <textarea
                    className={input({ height: 'block' })}
                    rows={10}
                    cols={50}
                    {...register('review')}
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
                <Button type="submit" variant="primary">
                  投稿
                </Button>
              </div>
            </div>
          </section>
        </main>
      </form>
    </FormProvider>
  );
}
