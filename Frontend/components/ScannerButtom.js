import React from 'react';
import { Button, View, Text, StatusBar, TouchableOpacity } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ScannerButtom extends React.Component {
    render() {

        return (

            <TouchableOpacity
                // onPress={() => this.props.navigation.navigate('CodigoQR')}
                style={{
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    backgroundColor: '#fff',
                    borderRadius: 50,
                    padding: 10,
                }}
            >
                <MaterialCommunityIcons name={"qrcode-scan"} size={50} color="#47E245" />

            </TouchableOpacity>


        );
    }
}