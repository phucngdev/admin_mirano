import type { CourseEntity } from './CourseEntity';
import type { StudentEntity } from './StudentEntity';

export interface ClassEntity {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  courses?: CourseEntity[];
  students?: StudentEntity[];
}
