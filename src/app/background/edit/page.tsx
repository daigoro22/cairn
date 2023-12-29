'use client';

import Button from '@/app/_components/Button';
import { mainAreaLabel } from '@/app/_components/styles/display';
import { mainAreaGrid, subGrid } from '@/app/_components/styles/_layout';
import { css } from 'styled-system/css';
import { join } from '@/utils/panda';
import BackGroundInput from '@/app/_components/BackGroundInput';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import type { BackgroundEditApiSchema } from '@/schemas/background';
import {
  backgroundEditApiSchema,
  backgroundGetApiSchema,
} from '@/schemas/background';
import { zodResolver } from '@hookform/resolvers/zod';

const initialBackground: BackgroundEditApiSchema['items'][number] = {
  organizationName: '',
  startDate: '',
  endDate: '',
};

export default function BackgroundPage() {
  const router = useRouter();

  const methods = useForm<BackgroundEditApiSchema>({
    resolver: zodResolver(backgroundEditApiSchema),
    mode: 'onSubmit',
  });

  const { fields, append, remove, replace } = useFieldArray({
    name: 'items',
    control: methods.control,
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    console.log(data);
    const res = await fetch('/api/background', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push('/');
    } else {
      alert('経歴データが登録できませんでした');
    }
  });

  useEffect(() => {
    void (async () => {
      const res = await fetch('/api/background', {
        method: 'GET',
      });
      const parsed = backgroundGetApiSchema.safeParse(await res.json());
      if (!res.ok) {
        alert('経歴データが取得できませんでした');
      } else if (parsed.success) {
        replace(
          parsed.data.data.items.length
            ? parsed.data.data.items
            : [initialBackground],
        );
      }
    })();
  }, [replace]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <main className={mainAreaGrid({ grid: 'lg' })}>
          <section
            className={join([
              subGrid(),
              css({
                gridColumn: { base: '2/6', lg: '4/10' },
                gridRow: '1/13',
              }),
            ])}
          >
            <h1 className={mainAreaLabel({ grid: 'xl' })}>経歴登録</h1>
            <div
              className={css({
                gridColumn: { base: '1/4', lg: '1/7' },
                gridRow: '2/13',
                bg: 'white',
                borderRadius: 'card.md',
                display: 'flex',
                flexDirection: 'column',
                gap: { base: 'md', lg: 'xl' },
                padding: { base: 'md', lg: 'xl' },
                justifyContent: 'flex-start',
              })}
            >
              {fields.map(({ id }, index) => (
                <BackGroundInput
                  key={id}
                  index={index}
                  onRemove={() => remove(index)}
                />
              ))}
              <div className={css({ display: 'flex', gap: 'md' })}>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => append(initialBackground)}
                >
                  経歴追加
                </Button>
                <Button type="submit" variant="primary">
                  登録
                </Button>
              </div>
            </div>
          </section>
        </main>
      </form>
    </FormProvider>
  );
}
