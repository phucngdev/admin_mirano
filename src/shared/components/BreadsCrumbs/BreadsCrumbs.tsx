import { Link, useLocation } from 'react-router-dom';
import { House } from '@phosphor-icons/react';
import React from 'react';
import { menuList, menuSubLv1, meunuSublv2 } from '../ListMenu/ListMenu';

interface Breadcrumb {
  name: string;
  path: string;
}

const BreadsCrumbs: React.FC = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  const breadcrumbLinks: Breadcrumb[] = [];
  let currentPath = '';

  paths.forEach(path => {
    currentPath += `/${path}`;

    const mainMenuItem = menuList.find(item => item.path === currentPath);
    const subMenuItem = menuSubLv1.find(item => item.path === currentPath);
    const subMenuItemLv2 = meunuSublv2.find(item => item.path === currentPath);

    if (mainMenuItem) {
      breadcrumbLinks.push({
        name: mainMenuItem.title,
        path: mainMenuItem.path,
      });
    }
    if (subMenuItem) {
      breadcrumbLinks.push({ name: subMenuItem.title, path: subMenuItem.path });
    }
    if (subMenuItemLv2) {
      breadcrumbLinks.push({
        name: subMenuItemLv2.title,
        path: subMenuItemLv2.path,
      });
    }
  });

  return (
    <div
      style={{
        alignItems: 'center',
        color: 'rgba(102, 112, 133, 1)',
        display: 'flex',
        gap: '15px',
      }}
    >
      <Link to="/course-manager/accounts">
        <House color="rgba(102, 112, 133, 1)" size={20} />
      </Link>
      {breadcrumbLinks.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          {'>'}
          <Link
            style={{
              color:
                index === breadcrumbLinks.length - 1
                  ? 'rgba(147, 47, 8, 1)'
                  : 'rgba(102, 112, 133, 1)',
              fontWeight:
                index === breadcrumbLinks.length - 1 ? '500' : 'normal',
              textDecoration: 'none',
            }}
            to={breadcrumb.path}
          >
            {breadcrumb.name}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default BreadsCrumbs;
