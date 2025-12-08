import type { ExamWithMappingEntity } from '../models/ExamWithMappingEntity';
import type { LessonEntity } from '../models/LessonEntity';

export interface ExamLessonResponse {
  id: string;
  examId: string;
  lessonId: string;
  exam: ExamWithMappingEntity;
  lesson: LessonEntity;
}
