import { Spin } from 'antd';
import { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AdminLayout } from '../features/admin/components/Layout/AdminLayout';

export const router = createBrowserRouter([
  {
    children: [
      {
        // element: <CoursesPage />,
        path: 'courses',
      },
      // Thêm các routes khác ở đây
    ],
    element: <AdminLayout />,
    path: '/admin',
  },
]);

function Routes() {
  return (
    <Suspense fallback={<Spin fullscreen size="large" spinning={false} />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default Routes;
