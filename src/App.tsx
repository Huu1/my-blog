import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routers from '@/config/router';
import './App.css';
import 'tailwindcss/tailwind.css';
import Header from './components/Header';
import DarkContext from './context/theme';

function App() {
  return (
    <DarkContext>
      <div className='App px-5 pt-10' style={{ minHeight: '100vh' }}>
        <Header />
        <Routers />
      </div>
    </DarkContext>
  );
}

const Routers = () => (
  <Switch>
    {routers.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.component}
      />
    ))}
    <Redirect to='/error/404' />
  </Switch>
);

export default App;
