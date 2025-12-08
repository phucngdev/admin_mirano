import type { TestDetailEntity } from './TestDetailEntity';

export interface TestDetailResponse {
  details: TestDetailEntity[];
  testId: {
    categoryId: string;
    duration: string;
    id: string;
    name: string;
    numberOfParticipants: number;
  };
}
