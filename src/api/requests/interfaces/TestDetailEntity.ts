import type { QuestionGroupEntity } from './QuestionGroupEntity';

export interface TestDetailEntity {
  id: string;
  testId: string;
  name: string;
  timeLimit: number;
  questionGroups: QuestionGroupEntity[];
}
