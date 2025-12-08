export interface ClassProfileEntity {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  performance: number;
  progressDate: number;
  students: any[];
  courses: any[];
  teachers: any[];
  totalCourse: number;
  totalSesson: number;
  totalCourseDone: number;
}
