import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { Snackbar, Alert } from "@mui/material";
import store from './store/store.ts';

const options = {
  anchorOrigin: { vertical: "bottom", horizontal: "center" } as const,
  autoHideDuration: 5000,
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Snackbar open={true} autoHideDuration={options.autoHideDuration} anchorOrigin={options.anchorOrigin}>
          <Alert severity="success" variant="filled">
            This is a success message using MUI/Material!
          </Alert>
        </Snackbar>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
)
