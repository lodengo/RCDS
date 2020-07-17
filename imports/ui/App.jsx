import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodoPage from './pages/TodoPage';

export const App = () => {
  const PrivateRoute = ({ component: Component, handleChildFunc, ...rest }) => {
    return <Route {...rest} render={(props) => (
      Meteor.userId() ? <Component {...props} handleChildFunc={handleChildFunc} /> : <Redirect to='/login' />
    )}
    />
  };

  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            component={LoginPage}
          />
          <Route
            path="/register"
            component={RegisterPage}
          />
          <Route
            path="/todo"
            component={TodoPage}
          />
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  );
};
