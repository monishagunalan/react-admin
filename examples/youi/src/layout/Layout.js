import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'react-admin';
import { darkTheme, lightTheme } from './themes';
import Menu from './Menu';
import AppBar from './AppBar';

const CustomLayout = props => <Layout {...props} appBar={AppBar} menu={Menu} />;

export default connect(
    state => ({
        theme: state.theme === 'dark' ? darkTheme : lightTheme,
    }),
    {}
)(CustomLayout);
