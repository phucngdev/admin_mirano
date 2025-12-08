import type { QuestionEntity } from './QuestionEntity';

export interface PracticeEntity {
  id: string;
  questionGroup: QuestionEntity[];
}
