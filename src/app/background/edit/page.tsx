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
import { backgroundEditApiSchema } from '@/schemas/background';
import { zodResolver } from '@hookform/resolvers/zod';

const initialBackground: BackgroundEditApiSchema['items'][number] = {
  organizationName: '',
  startDate: new Date(),
  endDate: new Date(),
};

export default function BackgroundPage() {
  const router = useRouter();

  const methods = useForm<BackgroundEditApiSchema>({
    resolver: zodResolver(backgroundEditApiSchema),
    mode: 'onSubmit',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control: methods.control,
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    await fetch('/api/background', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  });

  useEffect(() => {}, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
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
