import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './styles/reset.css';
import routesConfig from './routers/routes.config';

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

const renderRoutes = (routes: RouteConfig[]) =>
  routes.map((route, index) => (
    <Route element={route.element} key={index} path={route.path}>
      {route.children ? renderRoutes(route.children) : null}
    </Route>
  ));

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }, [location.pathname]);

  return (
    <>
      <Routes>{renderRoutes(routesConfig)}</Routes>
    </>
  );
}

export default App;
