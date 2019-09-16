/* eslint react/jsx-key: off */
import React from 'react';
import { Admin, Resource } from 'react-admin'; // eslint-disable-line import/no-unresolved
import { render } from 'react-dom';
import { Route } from 'react-router';
import { reducer as tree } from 'ra-tree-ui-materialui';
import CustomRouteLayout from './customRouteLayout';
import CustomRouteNoLayout from './customRouteNoLayout';
import dataProvider from './dataProvider';
import i18nProvider from './i18nProvider';
import analytics from './analytics';
import users from './users';
import tags from './tags';
import home from './home';
import configure from './configure';
import layout from './layout/Layout';
import clickstream from './clickstream';
import activity from './activity';
import viewed from './viewed';
import location from './location';
import login from './layout/Login';
import authProvider from './authProvider';

// aws-cognito integration
//import { AuthProvider, Login } from 'ra-cognito';
import Amplify from 'aws-amplify';
import config from '../config';

// AWS Cognito login ... now to hook it up!
//https://youi-admin.auth.us-east-1.amazoncognito.com/login?client_id=46ds0sdku9fiaoc1crujud417n&redirect_uri=http://localhost:8080/&response_type=code

Amplify.configure({
    Auth: {
        mandatorySignId: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    },
});

render(
    <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        appLayout={layout}
        loginPage={login}
        title="Administration"
        locale="en"
        customReducers={{ tree }}
        customRoutes={[
            <Route
                exact
                path="/custom"
                component={CustomRouteNoLayout}
                noLayout
            />,
            <Route exact path="/custom2" component={CustomRouteLayout} />,
        ]}
    >
        {permissions => [
            <Resource name="Home" {...home} />,
            <Resource name="Analytics" {...analytics} />,
            <Resource name="ClickStream" {...clickstream} />,
            <Resource name="Viewed" {...viewed} />,
            <Resource name="Location" {...location} />,
            <Resource name="Activity" {...activity} />,

            permissions ? <Resource name="tags" {...tags} /> : null,

            // Only include the categories resource for admin users
            permissions === 'admin' ? (
                <Resource name="Users" {...users} />
            ) : null,

            permissions === 'admin' ? (
                <Resource name="Configure" {...configure} />
            ) : null,
        ]}
    </Admin>,
    document.getElementById('root')
);
