import { createSlice } from '@reduxjs/toolkit';
import {
  ClassDetailOfStudentEntity,
  CourseDetailOfStudentEntity,
  IMeta,
  StudentDetailEntity,
  UserEntity,
} from '#/api/requests';
import { getAllUser, getOneUser } from '../thunk/user.thunk';
import {
  getClassStudentDetail,
  getResultCourseDetail,
  getStudentDetail,
} from '../thunk/class.thunk';

interface UserState {
  data: {
    items: UserEntity[];
    meta: IMeta;
  };
  userEdit: UserEntity | null;
  student: StudentDetailEntity | null;
  classStudent: ClassDetailOfStudentEntity | null;
  result_course: CourseDetailOfStudentEntity | null;
  teacehrFakeData: any;
}

const initialState: UserState = {
  data: {
    items: [],
    meta: {
      limit: 0,
      offset: 0,
      total: 0,
      totalPages: 0,
    },
  },
  userEdit: null,
  student: null,
  classStudent: null,
  result_course: null,
  teacehrFakeData: {
    id: 'abc-123',
    email: 'nguyenvana@gmail.com',
    fullName: 'Nguyễn Văn A',
    phoneNumber: '0798874754',
    address: 'Cầu giấy - Hà nội',
    userCode: '127.0.0.1',
    birthday: '12/12/2000',
    createdAt: '12/8/2025',
    class: [
      {
        id: 'âmmamsaam',
        name: 'PTIT Edu',
        startDate: '2025-05-24',
        endDate: '2025-06-10',
      },
      {
        id: 'âmmamaam',
        name: 'FPT Edu',
        startDate: '2025-05-24',
        endDate: '2025-06-30',
      },
    ],
  },
};

const userSlice = createSlice({
  initialState,
  name: 'users',
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(getStudentDetail.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200) {
          state.student = data;
        }
      })
      .addCase(getClassStudentDetail.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200) {
          state.classStudent = data;
        }
      })
      .addCase(getResultCourseDetail.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;
        if (statusCode === 200) {
          state.result_course = data;
        }
      })
      .addCase(getOneUser.fulfilled, (state, action) => {
        // state.userEdit =
      });
  },
});

export default userSlice.reducer;
