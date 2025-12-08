import type { QuestionEntity } from './QuestionEntity';

export interface ReadingEntity {
  id: string;
  questionGroup?: string;
  imageGroup?: string;
  question: QuestionEntity[];
}
