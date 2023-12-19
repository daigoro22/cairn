'use client';

import { css } from 'styled-system/css';
import { inputLabel } from './styles/input';
import Button from './Button';
import InputContainer from './InputContainer';
import DateInput from './DateInput';
import { useFormContext } from 'react-hook-form';
import type { BackgroundEditApiSchema } from '@/schemas/background';
import TextInput from './TextInput';

export default function BackGroundInput({
  index,
  onRemove,
}: {
  index: number;
  onRemove: () => void;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<BackgroundEditApiSchema>();

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: { base: 'md', xl: 'xl' },
        borderRadius: 'card.xs',
        border: 'primary',
      })}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'flex-start',
          gap: 'md',
          alignItems: 'flex-end',
          paddingLeft: 'md',
          paddingTop: 'md',
        })}
      >
        <h2 className={inputLabel({ fontSize: 'lg' })}>経歴{index + 1}</h2>
        <Button variant="tertiary" onClick={() => onRemove()}>
          削除
        </Button>
      </div>

      <div
        className={css({
          display: 'flex',
          gap: 'md',
          padding: 'md',
          flexWrap: 'wrap',
        })}
      >
        <InputContainer
          label="大学/会社名"
          error={errors.items?.[index]?.organizationName}
        >
          <div
            className={css({
              display: 'flex',
              justifyContent: 'flex-start',
              gap: 'md',
              alignItems: 'flex-end',
            })}
          >
            <TextInput {...register(`items.${index}.organizationName`)} />
            {/* <Button variant="secondary">検索</Button> */}
          </div>
        </InputContainer>
        <InputContainer
          label="在籍期間"
          error={
            errors.items?.[index]?.startDate ?? errors.items?.[index]?.endDate
          }
        >
          <div
            className={css({
              display: 'flex',
              justifyContent: 'flex-start',
              gap: 'md',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
            })}
          >
            <DateInput {...register(`items.${index}.startDate`)} />
            <p>〜</p>
            <DateInput {...register(`items.${index}.endDate`)} />
          </div>
        </InputContainer>
      </div>
    </div>
  );
}
