/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './i18next.config.ts';
// import './index.css';
import './styles/reset.css';
import store from './redux/store/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          autoHideDuration={3000}
          maxSnack={3}
        >
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>,
);
