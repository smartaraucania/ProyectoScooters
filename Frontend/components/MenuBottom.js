import React from 'react';
import { Button, View, Text, StatusBar, TouchableOpacity } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';


export default class MenuBottom extends React.Component {
    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.toggleDrawer()}
                style={{
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50,
                    height: 50,
                    backgroundColor: '#fff',
                    borderRadius: 50,
                    padding: 10,
                    right: 50,

                }}
            >
                <AntDesign name={"menu-fold"} size={30} color="#000000" />

            </TouchableOpacity>


        );
    }
}