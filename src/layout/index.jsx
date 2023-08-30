import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from '../routes/routes';
import Navbar from './Navbar';
import Footer from './Footer';
import { useStyles } from '../constants/common/commonStyles';

const Layout = (props) => {
  const { setThemeMode } = props;
  const { classes } = useStyles();
  return (
    <>
      <Navbar setThemeMode={setThemeMode} />
      <div className={classes.mainBody}>
        <Routes>
          {routes.map((route, i) => (
            <Route exact key={i} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
