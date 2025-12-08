import { z } from 'zod';

export const courseSchema = z.object({
  categoryId: z.string().min(1, 'Vui lòng chọn danh mục'),
  description: z.string().min(1, 'Vui lòng nhập mô tả khóa học'),
  price: z.number().min(0, 'Giá không được âm'),
  status: z.enum(['active', 'inactive']),
  thumbnail: z.string().min(1, 'Vui lòng chọn ảnh đại diện'),
  title: z.string().min(1, 'Vui lòng nhập tên khóa học'),
});

export type CourseFormData = z.infer<typeof courseSchema>;

export interface Course extends CourseFormData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseFilters {
  search?: string;
  status?: 'active' | 'inactive' | 'all';
  categoryId?: string;
  page?: number;
  limit?: number;
}
