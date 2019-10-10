import React from 'react';

import {
    Image,
    View,
} from 'react-native';

//import { MapView, AnimatedRegion } from 'expo';
//import { MapView, AnimatedRegion } from 'expo';
import MapView from 'react-native-maps';


export default class ScooterLocation extends React.Component {

    constructor(props) {
        super(props);
        const driver = this.props.driver ?
            this.props.driver :
            {
                uid: "noDriversPassed",
                location: { latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0 }

            }
        const coordinate = new MapView.AnimatedRegion({
            latitude: driver.location.latitude,
            longitude: driver.location.longitude,
            latitudeDelta: driver.location.latitudeDelta,
            longitudeDelta: driver.location.longitudeDelta,
        })
        this.state = {
            driver: driver,
            coordinate: coordinate,
        }
    }

    render() {

        // const cb = props.cb ? props.cb : () => console.log('me tocaste verga');

        return (
            <MapView.Marker.Animated
                coordinate={this.state.coordinate}
                anchor={{ x: 0.35, y: 0.32 }}
                ref={marker => { this.marker = marker }}
                style={{ width: 50, height: 50 }} >
                <Image
                    source={require('../assets/images/patinete.png')}
                    style={{
                        width: 32,
                        height: 32,
                    }}
                    // onPress={() => { cb() }} />
                />
            </MapView.Marker.Animated>
        )
    }

}
