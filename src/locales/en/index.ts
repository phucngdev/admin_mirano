import common from './common.json';
import auth from './auth.json';
import sidebar from './sidebar.json';
import department from './department.json';
import employeeManagement from './employeeManagement.json';
import dashboard from './dashboard.json';
import setting from './setting.json';
import code from './code.json';
import report from './report.json';
import notification from './notification.json';
import group from './group.json';
import role from './role.json';
import bookingHistory from './bookingHistory.json';

export default {
  ...auth,
  ...common,
  ...sidebar,
  ...dashboard,
  ...department,
  ...employeeManagement,
  ...setting,
  ...code,
  ...report,
  ...notification,
  ...group,
  ...role,
  ...bookingHistory,
};
