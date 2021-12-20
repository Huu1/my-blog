import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';

// const queryClient = new QueryClient();
// import 'bytemd/dist/index.min.css';
ReactDOM.render(
  // <React.StrictMode>
  // <QueryClientProvider client={queryClient}>
  <Router>
    <App />
  </Router>,
  // </QueryClientProvider>,
  // </React.StrictMode>
  document.getElementById('root')
);

reportWebVitals();
