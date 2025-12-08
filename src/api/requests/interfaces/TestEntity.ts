import { QuestionGroupEntity } from './QuestionGroupEntity';

export interface TestEntity {
  id: string;
  name: string;
  duration: number;
  categoryId: string;
  description: string;
  numberOfParticipants: number;
}
