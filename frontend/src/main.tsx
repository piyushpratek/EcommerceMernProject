import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store.ts';

import { Alert } from "@mui/material";




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Alert />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
)
