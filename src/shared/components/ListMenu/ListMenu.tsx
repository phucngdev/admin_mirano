import {
  Users,
  Student,
  GraduationCap,
  Handshake,
  Video,
  ProjectorScreenChart,
  Certificate,
  ChartPie,
  Gear,
  Buildings,
  SpeakerSimpleHigh,
  Files,
  Exam,
  ListMagnifyingGlass,
  TreeStructure,
} from '@phosphor-icons/react';

export const menuList = [
  {
    title: 'Danh sách tài khoản',
    icon: <Users size={26} />,
    path: '/admin/accounts',
  },
  {
    title: 'Chủ đề Minna',
    icon: <Users size={26} />,
    path: '/admin/minna',
  },
];

export const menuSubLv1 = [
  {
    title: 'Chi tiết tài khoản',
    icon: <ListMagnifyingGlass size={24} />,
    path: '/admin/accounts/list-accounts',
  },
  {
    title: 'Chi tiết chủ đề',
    icon: <ListMagnifyingGlass size={24} />,
    path: '/admin/minna/topic',
  },
  {
    title: 'Phân quyền',
    icon: <TreeStructure size={24} />,
    path: '/roles',
  },
];

export const meunuSublv2 = [
  {
    title: 'Danh sách tài khoản',
    path: '/accounts/list-accounts',
  },
];
