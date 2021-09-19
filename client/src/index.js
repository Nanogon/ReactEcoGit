import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-datepicker/dist/react-datepicker.css';


import { GasDataContextProvider } from './store/gasdata-context'

ReactDOM.render(
  <GasDataContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </GasDataContextProvider>,
  document.getElementById('root')
);

