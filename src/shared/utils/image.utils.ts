/* eslint-disable @typescript-eslint/naming-convention */
const encodings = {
  '!': '%21',
  '"': '%22',
  '#': '%23',
  $: '%24',
  '&': '%26',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '*': '%2A',
  '+': '%2B',
  ',': '%2C',
  ':': '%3A',
  ';': '%3B',
  '=': '%3D',
  '?': '%3F',
  '@': '%40',
};

type SpecialCharacter = keyof typeof encodings;

function isValidSpecialCharacter(key: string): key is SpecialCharacter {
  return key in encodings;
}

export const encodeS3URI = (filename: string) =>
  encodeURI(filename).replace(
    /(\+|!|"|#|\$|&|'|\(|\)|\*|\+|,|:|;|=|\?|@)/gim,
    (match: string) => (isValidSpecialCharacter(match) ? encodings[match] : ''),
  );

const imageHost = import.meta.env.VITE_IMAGE_HOST as string;

export const getImageUrl = (value: string | null | undefined) =>
  value && value.includes('http')
    ? value
    : `${imageHost}/${encodeS3URI(value as string)}`;
