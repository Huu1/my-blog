import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';

// const queryClient = new QueryClient();
// import 'bytemd/dist/index.min.css';
ReactDOM.render(
  // <React.StrictMode>
  // <QueryClientProvider client={queryClient}>
  <App />,
  // </QueryClientProvider>,
  // </React.StrictMode>
  document.getElementById('root')
);

reportWebVitals();
