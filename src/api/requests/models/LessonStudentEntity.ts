/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type LessonStudentEntity = {
  id: string;
  type: LessonStudentEntity.type;
  title: string;
  isRequired: boolean;
  videoUrl: string;
  progress: number;
  pos: number;
};

export namespace LessonStudentEntity {

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

