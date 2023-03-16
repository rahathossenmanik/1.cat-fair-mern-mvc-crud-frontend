import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './nav/NavBar';
import { Container } from 'reactstrap';
import { authProtectedRoutes } from './routes/auth/routes';
import { publicRoutes } from './routes/public/routes';

const App = () => {
  const auth = true;
  return (
    <Router>
      <div className="App wrapper">
        <Container className="p-0 is-open">
          <NavBar />
          <Container>
            <Routes>
              {authProtectedRoutes.map((route, i) => (
                <Route exact key={i} path={route.path} element={route.element} />
              ))}
              {auth && publicRoutes.map((route, i) => <Route exact key={i} path={route.path} element={route.element} />)}
            </Routes>
          </Container>
        </Container>
      </div>
    </Router>
  );
};

export default App;
