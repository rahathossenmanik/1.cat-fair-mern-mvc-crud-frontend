import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Layout from './layout';
import ToastBody from './components/ToastBody';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [themeMode, setThemeMode] = useState('dark');

  return (
    <MantineProvider theme={{ colorScheme: themeMode }} withGlobalStyles withNormalizeCSS>
      <Router>
        <Layout setThemeMode={setThemeMode} />
      </Router>

      {/* Toast Body for All Toaster.  */}
      <ToastBody themeMode={themeMode} />
    </MantineProvider>
  );
};

export default App;
