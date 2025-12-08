/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateLessonDto = {
  type: CreateLessonDto.type;
  title: string;
  isRequired: boolean;
  sessonId: string;
};

export namespace CreateLessonDto {

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

