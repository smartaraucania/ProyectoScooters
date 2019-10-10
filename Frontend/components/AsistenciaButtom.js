import React from 'react';
import { Button, View, Text, StatusBar, TouchableOpacity } from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';

export default class AsistenciaScreen extends React.Component {
    render() {
        return (

            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AsistenciaScreen')}
                style={{
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50,
                    height: 50,
                    backgroundColor: '#fff',
                    borderRadius: 50,
                    left: 50,
                }}
            >
                <Entypo name={"help"} size={30} color="#000000" />
            </TouchableOpacity>


        );
    }
}