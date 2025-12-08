/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ObjectId } from './ObjectId';

export type LessonEntity = {
  id: string;
  type: LessonEntity.type;
  title: string;
  isRequired: boolean;
  videoUrl: string;
  pos: number;
  sessonId: ObjectId;
};

export namespace LessonEntity {

  export enum type {
    LISTENING = 'LISTENING',
    READING = 'READING',
    PRACTICE_THROUGH = 'PRACTICE_THROUGH',
    VOCAB = 'VOCAB',
    GRAMMAR = 'GRAMMAR',
    KANJI = 'KANJI',
    VIDEO = 'VIDEO',
    AUDIO = 'AUDIO',
    FLASH_CARD = 'FLASH_CARD',
    QUIZ = 'QUIZ',
    SLIDE = 'SLIDE',
    TEXT = 'TEXT',
    FILE = 'FILE',
    HINAGAN = 'HINAGAN',
    KATAKANA = 'KATAKANA',
    COUNTVOCAB = 'COUNTVOCAB',
    TESTVOCAB = 'TESTVOCAB',
    HIRAGANA = 'HIRAGANA',
  }


}

