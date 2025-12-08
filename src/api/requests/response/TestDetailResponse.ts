import type { QuestionGroupEntity, TestDetailEntity } from '#/api/requests';

export interface TestDetailResponse {
  details: {
    id: string;
    name: string;
    questionGroups: QuestionGroupEntity[];
    timeLimit: number;
  }[];
  testId: TestDetailEntity;
}
