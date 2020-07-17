import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import i18n from 'meteor/universe:i18n';
import {
    UserOutlined, LockOutlined
} from '@ant-design/icons';

import { useUnmountedRef } from '../hooks/useUnmountedRef.jsx';

const LoginPage = () => {
    const unmountedRef = useUnmountedRef();
    const history = useHistory();
    const [errors, setErrors] = useState('');

    const T = i18n.createComponent();

    const onFinish = values => {
        Meteor.loginWithPassword(values.username, values.password, (err) => {
            if (err) {
                if (unmountedRef.current) {
                    // Return to avoid the setState calls
                    return;
                }
                setErrors(i18n.__('pages.LoginPage.loginErr'));
            } else {
                history.replace('/workspace');
            }
        });
    };

    const forgetPwdLink = (
        <Link to="/todo">忘记密码</Link>
    );
    const regLink = (
        <Link to="/register">注册账号</Link>
    );
    return (
        <div className="login-page">
            <div id="loginIntroDefault">
                <div className="logo"></div>
            </div>
            <Form
                className="login-form"
                onFinish={onFinish}
                size="large"
            >
                <div className="alert">{errors}</div>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: i18n.__('pages.LoginPage.usernameRequired') }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={i18n.__('pages.LoginPage.usernameRequired')} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: i18n.__('pages.LoginPage.passwordRequired') }]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder={i18n.__('pages.LoginPage.passwordRequired')} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        <T>pages.LoginPage.signIn</T>
                    </Button>
                </Form.Item>
                {forgetPwdLink} | {regLink}
            </Form>
        </div>

    );
};

export default LoginPage;