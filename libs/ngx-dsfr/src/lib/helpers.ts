

/** Unique Identifier */
let uniqueIncrement = 0;
export const uniqueIdentifier = (prefix?: string): string => {
  uniqueIncrement++;

  return `${prefix ? prefix + '-' : ''}${uniqueIncrement}`;
};

/** IsNil */
export const isNil = (value: unknown) => value == null;

export const isEmpty = (property: unknown): boolean => {
  return (property === null || property === "" || typeof property === "undefined");
}
