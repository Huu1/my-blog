import React, { useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

ReactDOM.render(
  <Router>
    <ScrollToTop />
    <App />
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
