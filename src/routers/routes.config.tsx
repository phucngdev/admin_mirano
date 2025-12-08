import HomePage from '#/features/admin/pages/HomePage/HomePage';
import ChangePass from '#/features/authentication/pages/ChangePass';
import ForgotPass from '#/features/authentication/pages/ForgotPass';
import Login from '#/features/authentication/pages/Login';
import Register from '#/features/authentication/pages/Register';
import CourseEditor from '#/features/course-editor/pages/CourseEditor';
import { CoursesPage } from '#/features/course-editor/pages/CoursesPage';
import MinnaTopic from '#/features/minna/pages/MinnaTopic';
import TopicDetail from '#/features/minna/pages/TopicDetail';
import { AdminLayout } from '../features/admin/components/Layout/AdminLayout';
import { MembershipsPage } from '../features/memberships/pages/MembershipsPage';
import PublicLayout from './PublicRouter';
import ClassManagerPage from '#/features/class/class-manager/pages/ClassManagerPage';
import ClassDetail from '#/features/class/class-manager/pages/ClassDetail';
import TestPage from '#/features/test/pages/TestPage';
import TestDetail from '#/features/test/pages/TestDetail';
import ExamTest from '#/features/test/pages/ExamTest';
import NotFound from '#/features/notfound/pages/NotFound';
import NotFounAdmin from '#/features/notfound/pages/NotFounAdmin';
import DownLoadApp from '#/features/notfound/pages/DownLoadApp';
import QuestionManager from '#/features/question/pages/QuestionManager';
import StudentPage from '#/features/class/accounts/pages/StudentPage';
import TeacherPage from '#/features/class/accounts/pages/TeacherPage';
import StudentDetail from '#/features/class/accounts/pages/StudentDetail';
import TeacherDetail from '#/features/class/accounts/pages/TeacherDetail';
import SetupSchedule from '#/features/class/class-manager/pages/SetupSchedule';
import Attendance from '#/features/class/class-manager/pages/Attendance';
import AttendanceHistory from '#/features/class/class-manager/pages/AttendanceHistory';
import ExamResult from '#/features/class/class-manager/pages/ExamResult';
import PartnerPage from '#/features/class/accounts/pages/PartnerPage';
import AdminSystemPage from '#/features/class/accounts/pages/AdminSystemPage';
import TestResult from '#/features/test/pages/TestResult';
import TextEditorPage from '#/features/text-editor/pages/TextEditorPage';
import ResultDetail from '#/features/test/pages/ResultDetail';
const routesConfig: any[] = [
  {
    path: '/auth',
    element: <PublicLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgotpass', element: <ForgotPass /> },
      { path: 'changepass', element: <ChangePass /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/down-app',
    element: <DownLoadApp />,
  },
  {
    path: '/text-editor',
    element: <TextEditorPage />,
  },
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      { path: '', element: <HomePage /> },
      { path: '*', element: <NotFounAdmin /> },
      { path: 'minna', element: <MinnaTopic /> },
      { path: 'minna/topic/:id', element: <TopicDetail /> },
      { path: 'test', element: <TestPage /> },
      { path: 'test/test-result', element: <TestResult /> },
      { path: 'test/test-result/:testId/:userId', element: <ResultDetail /> },
      { path: 'test/:id', element: <TestDetail /> },
      { path: 'test-exam/:id', element: <ExamTest /> },
      {
        path: 'content',
        children: [
          { path: 'courses', element: <CoursesPage /> },
          { path: 'memberships', element: <MembershipsPage /> },
          { path: 'combos', element: <div>Trang Combo Khóa Học</div> },
          { path: 'questions', element: <QuestionManager /> },
        ],
      },
      { path: 'accounts/students', element: <StudentPage /> },
      { path: 'accounts/students/:id', element: <StudentDetail /> },
      { path: 'accounts/partner', element: <PartnerPage /> },
      { path: 'accounts/admin-system', element: <AdminSystemPage /> },
      { path: 'accounts/teachers', element: <TeacherPage /> },
      { path: 'accounts/teachers/:id', element: <TeacherDetail /> },
      {
        path: 'class-manager',
        children: [
          { path: 'class-room', element: <ClassManagerPage /> },
          { path: 'class-room/:id', element: <ClassDetail /> },
          { path: 'class-room/exam-result/:id', element: <ExamResult /> },
          { path: 'class-room/attendances/:id', element: <Attendance /> },
          {
            path: 'class-room/attendances-history/:id',
            element: <AttendanceHistory />,
          },
          { path: 'class-room/setup-schedule/:id', element: <SetupSchedule /> },
        ],
      },
    ],
  },
  {
    path: 'course-manager/:id',
    element: <CourseEditor />,
  },
];

export default routesConfig;
