'use client';

import { css, cva } from 'styled-system/css';
import { inputLabel } from './styles/input';
import Button from './Button';
import { join } from '@/utils/panda';
import InputContainer from './InputContainer';
import DateInput from './DateInput';
import { useFormContext } from 'react-hook-form';
import type { BackgroundEditApiSchema } from '@/schemas/background';
import TextInput from './TextInput';

const gridCellFlex = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    padding: 'md',
  },
});

export default function BackGroundInput({
  index,
  onRemove,
}: {
  index: number;
  onRemove: () => void;
}) {
  const { register } = useFormContext<BackgroundEditApiSchema>();

  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateColumns: 'repeat(7,auto)',
        gridTemplateRows: 'repeat(4,auto)',
        gridColumn: '1/7',
        gridRow: '1/4',
        borderRadius: 'card.xs',
        border: 'primary',
      })}
    >
      <div
        className={css({
          gridColumn: '1/2',
          gridRow: '1/2',
          paddingLeft: 'md',
          paddingTop: 'md',
        })}
      >
        <h2 className={inputLabel({ fontSize: 'lg' })}>経歴{index + 1}</h2>
      </div>
      <div
        className={css({
          gridColumn: '6/7',
          gridRow: '1/2',
          paddingTop: 'md',
          paddingRight: 'md',
        })}
      >
        <Button variant="tertiary" onClick={() => onRemove()}>
          削除
        </Button>
      </div>

      <div
        className={join([
          css({
            gridColumn: '1/3',
            gridRow: '3/4',
          }),
          gridCellFlex(),
        ])}
      >
        <InputContainer label="大学/会社名">
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
      </div>

      <div
        className={css({
          gridColumn: '3/7',
          gridRow: '3/4',
          padding: 'md',
        })}
      >
        <InputContainer label="在籍期間">
          <div
            className={css({
              display: 'flex',
              justifyContent: 'flex-start',
              gap: 'md',
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
