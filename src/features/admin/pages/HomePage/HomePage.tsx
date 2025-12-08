import { NavLink } from 'react-router-dom';
import './HomePage.scss';

function HomePage() {
  return (
    <div className="container-t">
      {/* {menuAccAndRole.map((menu, index) => (
        <NavLink
          key={index}
          to={menu.path}>
          <div key={index} className="accAndRoles">
            <span className="flex align-center">{menu.icon}&nbsp; {menu.title}</span>
          </div>
        </NavLink>
      ))} */}
    </div>
  );
}

export default HomePage;
