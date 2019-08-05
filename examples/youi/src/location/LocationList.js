import React from 'react';
import { Chart } from 'react-google-charts';

const LocationList = props => (
    <Chart
        width={'100%'}
        height={'500px'}
        chartType="GeoChart"
        data={[
            ['Country', 'Popularity'],
            ['Germany', 200],
            ['United States', 300],
            ['Brazil', 400],
            ['Canada', 1000],
            ['France', 600],
            ['RU', 1],
        ]}
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        mapsApiKey="YOUR_KEY_HERE"
        rootProps={{ 'data-testid': '1' }}
    />
);

export default LocationList;
