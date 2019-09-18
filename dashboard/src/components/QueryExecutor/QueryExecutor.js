import React from 'react';
import { QueryRenderer } from '@cubejs-client/react';
import cubejs from '@cubejs-client/core';
import { Spin } from 'antd';

const API_URL = 'http://localhost:4000';
const cubejsApi = cubejs(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Njc2MDk3ODcsImV4cCI6MTU2NzY5NjE4N30.wTWi_Az27UJqkHBhmLiq7BJID8aeS2-LKD6mH5_tIXM',
    {
        apiUrl: API_URL + '/cubejs-api/v1',
    }
);

const renderChart = Component => ({ resultSet, error }) =>
    (resultSet && <Component resultSet={resultSet} />) ||
    (error && error.toString()) || <Spin />;

const QueryExecutor = ({ queryString, chartType }) => (
    <QueryRenderer
        query={queryString}
        cubejsApi={cubejsApi}
        render={renderChart(chartType)}
    />
);

export default QueryExecutor;
