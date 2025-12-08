import type { QuestionGroupEntity } from './QuestionGroupEntity';

export interface CreateQuestionGroupDto {
  content?: string;
  imageUrl?: string;
  audioUrl?: string;
  testDetailId?: string;
  examId?: string;
  type: QuestionGroupEntity.QuestionGroupType;
}
