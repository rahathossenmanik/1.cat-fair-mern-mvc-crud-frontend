import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from '../routes/routes';
import Navbar from './Navbar';

const Layout = (props) => {
  const { setThemeMode } = props;
  return (
    <>
      <Navbar setThemeMode={setThemeMode} />
      <div className="mx-20">
        <Routes>
          {routes.map((route, i) => (
            <Route exact key={i} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </>
  );
};

export default Layout;
