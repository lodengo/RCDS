import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import i18n from 'meteor/universe:i18n';
import { Form, Input, Button } from 'antd';
import {
  UserOutlined, LockOutlined
} from '@ant-design/icons';
import { useUnmountedRef } from '../hooks/useUnmountedRef';

const RegisterPage = () => {
  const unmountedRef = useUnmountedRef();
  const history = useHistory();
  const [errors, setErrors] = useState('');

  const T = i18n.createComponent();
  const onFinish = values => {
    Accounts.createUser({
      username: values.username,
      password: values.password
    }, (err) => {
      if (unmountedRef.current) {
        return;
      }
      if (err) {
        setErrors(err.reason);
      } else {
        history.replace('/login');
      }
    });
  };

  const loginLink = (
    <Link to="/login">登录</Link>
  );

  return (
    <div className="register-page">
      <div id="loginIntroDefault">
        <div className="logo"></div>
      </div>
      <Form className="register-form" size="large" onFinish={onFinish}>
        <div className="alert">{errors}</div>
        <Form.Item
          name="username"
          rules={[{ required: true, message: i18n.__('pages.RegisterPage.usernameRequired') }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={i18n.__('pages.RegisterPage.usernameRequired')}>
          </Input>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: i18n.__('pages.RegisterPage.passwordRequired') }]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder={i18n.__('pages.RegisterPage.passwordRequired')}></Input.Password>
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: i18n.__('pages.RegisterPage.confirmPasswordRequired'),
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(i18n.__('pages.RegisterPage.confirmPasswordNotMatch'));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder={i18n.__('pages.RegisterPage.confirmPasswordRequired')}></Input.Password>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-form-button">
            <T>pages.RegisterPage.register</T>
          </Button>
        </Form.Item>
        {loginLink}
      </Form>
    </div>


  );
};

export default RegisterPage;