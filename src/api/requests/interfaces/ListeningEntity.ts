import type { QuestionEntity } from './QuestionEntity';
import { QuestionGroupEntity } from './QuestionGroupEntity';

export interface ListteningEntity {
  id: string;
  questionGroup: string;
  imageGroup?: string;
  audioGroup?: string;
  question: QuestionEntity[];
}
