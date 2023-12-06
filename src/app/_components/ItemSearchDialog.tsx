import type { Ref } from 'react';
import { forwardRef, useCallback, useState } from 'react';
import { css } from 'styled-system/css';
import TextInput from './TextInput';
import Button from './Button';
import { card } from './styles/_layout';
import { join } from '@/utils/panda';
import ImageContainer from './ImageContainer';
import Image from 'next/image';
import type { ItemSearchApiSchema } from '@/schemas/reviews';
import { itemSearchApiSchema } from '@/schemas/reviews';
import Link from 'next/link';

const ItemSearchDialog = forwardRef(function ItemSearchDialog(
  _: unknown,
  ref: Ref<HTMLDialogElement>,
) {
  const [keyword, setKeyword] = useState('');
  const [items, setItems] = useState<ItemSearchApiSchema>();

  const onSearchClick = useCallback(() => {
    void (async () => {
      const reqUrl = new URL(
        `${window.location.origin.toString()}/api/review/itemSearch`,
      );
      reqUrl.searchParams.append('keyword', keyword);
      const res = await fetch(reqUrl.toString(), { method: 'GET' });
      if (!res.ok) {
        setItems({ Items: [] });
      } else {
        const parsed = itemSearchApiSchema.safeParse(await res.json());
        if (parsed.success) {
          setItems(parsed.data);
        }
      }
    })();
  }, [keyword]);

  return (
    <dialog
      ref={ref}
      className={css({
        inset: 0,
        marginX: 'auto',
        marginY: '30%',
        width: '50%',
        height: '30%',
        border: 'secondary',
        borderRadius: 'input',
        paddingX: 'md',
        paddingBottom: 'md',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          zIndex: 999,
        })}
      >
        <div
          className={css({
            position: 'sticky',
            top: 0,
            zIndex: 999,
            bg: 'white',
            padding: 'md',
          })}
        >
          <h2 className={css({ fontSize: 'lg' })}>商品選択</h2>
          <div
            className={css({
              display: 'flex',
              gap: 'md',
              alignItems: 'flex-end',
            })}
          >
            <TextInput
              placeholder="商品のキーワードを入力"
              variants={{ marginX: 'none' }}
              onBlur={(e) => setKeyword(e.currentTarget.value)}
            />
            <Button variant="secondary" onClick={onSearchClick}>
              検索
            </Button>
            <Button
              variant="tertiary"
              type="button"
              onClick={() => {
                if (typeof ref !== 'function') {
                  ref?.current?.close();
                }
              }}
            >
              閉じる
            </Button>
          </div>
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: 'md',
            marginTop: 'md',
            height: '100%',
          })}
        >
          {items?.Items.map(
            ({ Item: { itemCode, itemName, itemUrl, mediumImageUrls } }) => (
              <div
                key={itemCode}
                className={join([
                  card({ padding: 'sm' }),
                  css({ border: 'tertiary', width: '100%' }),
                ])}
              >
                <div
                  className={css({
                    display: 'flex',
                    gap: 'md',
                    alignItems: 'center',
                  })}
                >
                  <Link href={itemUrl}>
                    <ImageContainer size="item.itemModal">
                      <Image
                        src={mediumImageUrls[0]?.imageUrl ?? ''}
                        sizes="100vw"
                        fill
                        objectFit="cover"
                        alt="cairn"
                      />
                    </ImageContainer>
                  </Link>
                  <p className={css({ fontSize: 'md' })}> {itemName}</p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </dialog>
  );
});

export default ItemSearchDialog;
