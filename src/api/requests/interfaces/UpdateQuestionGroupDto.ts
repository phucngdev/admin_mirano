import type { QuestionGroupEntity } from './QuestionGroupEntity';

export interface UpdateQuestionGroupDto {
  content: string;
  audioUrl?: string;
  imageUrl?: string;
  pos: number;
  questions?: any[];
  type: QuestionGroupEntity.QuestionGroupType;
}
