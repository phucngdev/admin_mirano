/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type KanjiDictionaryEntity = {
  id: string;
  character: string;
  image: string;
  jukugo: Array<string>;
  kanji: string;
  kunyomi: Array<string>;
  meaning: string;
  mnemonic: string;
  onyomi: string;
  strokes: number;
  url: string;
  usedIn: Array<string>;
  lookalikes: Array<string>;
  synonyms: Array<string>;
  index: number;
};

