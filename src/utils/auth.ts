import { UpsertUserDto } from '#/api/requests';
import { refreshToken } from '#/api/services/authService';
import { expiresToken } from '#/shared/constants/expises';
import { message } from 'antd';
import Cookies from 'js-cookie';

export const isLogin = async () => {
  const token = Cookies.get('accessToken');
  const ref = Cookies.get('refreshToken');
  const user = Cookies.get('user');

  if (user) {
    const parseUser = JSON.parse(user);
    const roles = parseUser.userProfiles;
    const hasPermission =
      roles.includes(UpsertUserDto.userProfiles.TEACHER) ||
      roles.includes(UpsertUserDto.userProfiles.SYSTEM_ADMIN);

    if (!hasPermission) {
      message.info('Bạn không có quyền truy cập');
      Cookies.remove('user');
      Cookies.remove('refreshToken');
      Cookies.remove('accessToken');
      return false;
    }
  }

  if (ref) {
    return true;
  } else {
    return false;
  }
};
