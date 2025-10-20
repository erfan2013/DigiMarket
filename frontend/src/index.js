import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './routes'; 
import { store } from './Store/Store';
import { Provider } from 'react-redux';
import 'react-phone-number-input/style.css';
import { getInitialTheme , applyTheme } from './lib/theme';

applyTheme(getInitialTheme());
// Ensure the root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
//    <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
   // </React.StrictMode>  
);

reportWebVitals();

































