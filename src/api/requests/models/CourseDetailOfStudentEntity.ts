/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExamResultInCourseOfStudentEntity } from './ExamResultInCourseOfStudentEntity';
import type { SessonProgressOfStudentEntity } from './SessonProgressOfStudentEntity';

export type CourseDetailOfStudentEntity = {
  finishedSessonCount: number;
  sessonCount: number;
  sessons: Array<SessonProgressOfStudentEntity>;
  examResults: Array<ExamResultInCourseOfStudentEntity>;
};

