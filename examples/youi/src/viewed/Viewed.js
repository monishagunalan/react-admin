import React from 'react';
import { Chart } from 'react-google-charts';

const ViewedList = props => (
    <Chart
        width={'100%'}
        height={'300px'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={[
            [
                'Element',
                'Viewers',
                { role: 'style' },
                {
                    sourceColumn: 0,
                    role: 'annotation',
                    type: 'string',
                    calc: 'stringify',
                },
            ],
            ['Big Buck Bunny', 5000, '#b87333', null],
            ['Top Gun', 2000, 'silver', null],
            ['The Princess Bride', 1750, 'gold', null],
            ['The Life of Brian', 500, 'color: #e5e4e2', null],
        ]}
        options={{
            title: 'Movie viewership',
            width: '100%',
            height: 400,
            bar: { groupWidth: '95%' },
            legend: { position: 'none' },
        }}
        // For tests
        rootProps={{ 'data-testid': '6' }}
    />
);

export default ViewedList;
