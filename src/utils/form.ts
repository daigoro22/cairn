export const isKeyOfObject = <T extends object>(
  key: PropertyKey,
  object: T,
): key is keyof T => key in object;
