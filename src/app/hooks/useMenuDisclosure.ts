import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useEffect, useState } from 'react';

export const useMenuDisclosure: () => [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  () => void,
] = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const closeMenu = useCallback(() => {
    if (isOpen) setIsOpen(false);
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('click', closeMenu);

    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, [closeMenu, isOpen]);

  return [isOpen, setIsOpen, toggle];
};
