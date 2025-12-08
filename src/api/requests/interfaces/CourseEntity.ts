import type { SessonEntity } from './SessonEntity';

export interface CourseEntity {
  id: string;
  title: string;
  thumbnailUrl: string;
  description: string;
  price: number;
  type: CourseEntity.CourseType;
  // chapters: ChapterEntity[];
  sesson: SessonEntity[];
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export namespace CourseEntity {
  export enum CourseType {
    BASIC = 'BASIC',
    ADVANCED = 'ADVANCED',
  }
}
