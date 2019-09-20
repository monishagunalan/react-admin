import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class HeatMap extends Component {

    static defaultProps = {
        center: {
            lat: 39.8333333,
            lng: -98.585522
        },
        zoom: 1
    };

    heatMapData = {
        positions: this.props.resultSet.loadResponse.data.map(obj => {
            return { 'lat': obj['Rawtemp.latitude'], 'lng': obj['Rawtemp.longitude'] }
        }),
        options: {
            radius: 20,
            opacity: 0.6,
        }
    }

    // onMapClick({ x, y, lat, lng, event }) {
    //     if (this._googleMap !== undefined) {
    //         const point = new google.maps.LatLng(lat, lng)
    //         this._googleMap.heatmap.data.push(point)
    //     }
    // }

    toggleHeatMap() {
        this.setState({
            heatmapVisible: !this.state.heatmapVisible
        }, () => {
            if (this._googleMap !== undefined) {
                this._googleMap.heatmap.setMap(this.state.heatmapVisible ?
                    this._googleMap.map_ : null)
            }
        })
    }

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: 500, width: '100%' }}>
                <GoogleMapReact
                    ref={(el) => this._googleMap = el}
                    bootstrapURLKeys={{
                        key: process.env.GOOGLE_MAP_API_KEY,
                    }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    heatmapLibrary={true}
                    heatmap={this.heatMapData}>
                </GoogleMapReact>
            </div>
        );
    }
}

export default HeatMap
