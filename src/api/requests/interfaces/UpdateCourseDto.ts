import type { CourseEntity } from './CourseEntity';

export interface UpdateCourseDto {
  title: string;
  thumbnailUrl: string;
  description: string;
  price: number;
  type: CourseEntity.CourseType;
  status: boolean;
}
