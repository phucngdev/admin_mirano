import { ListteningEntity } from './ListeningEntity';
import type { QuestionEntity } from './QuestionEntity';
import { ReadingEntity } from './ReadingEntity';

export interface QuestionGroupEntity {
  id: string;
  content: string;
  imageUrl?: string;
  audioUrl?: string;
  questions: QuestionEntity[];
  pos: number;
  type: QuestionGroupEntity.QuestionGroupType;
  testId?: string;
  examId?: string;
}

export namespace QuestionGroupEntity {
  export enum QuestionGroupType {
    TEST_DETAIL = 'TEST_DETAIL',
    EXAM = 'EXAM',
  }
}
