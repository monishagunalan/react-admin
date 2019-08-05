import React from 'react';
import { Layout } from 'react-admin';
import Menu from './Menu';
import AppBar from './AppBar';

const CustomLayout = props => <Layout {...props} menu={Menu} appBar={AppBar} />;

export default CustomLayout;
