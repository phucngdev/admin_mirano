import { createSlice } from '@reduxjs/toolkit';
import { CourseEntity, IMeta } from '#/api/requests';
import { getAllCourse, getOneCourse } from '../thunk/course.thunk';

interface CourseState {
  status: 'idle' | 'pending' | 'successfully' | 'failed';
  data: {
    items: CourseEntity[] | [];
    meta: IMeta;
  };
  courseEdit: CourseEntity | null;
}

const initialState: CourseState = {
  data: {
    items: [],
    meta: {
      limit: 0,
      offset: 0,
      total: 0,
      totalPages: 0,
    },
  },
  courseEdit: null,
  status: 'idle',
};

const courseSlice = createSlice({
  initialState,
  name: 'course',
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllCourse.fulfilled, (state, action) => {
        state.status = 'successfully';
        if (action.payload.data) {
          state.data = action.payload.data;
        }
      })
      .addCase(getOneCourse.fulfilled, (state, action) => {
        state.status = 'successfully';
        state.courseEdit = action.payload.data;
      });
  },
});

export default courseSlice.reducer;
