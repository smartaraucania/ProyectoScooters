import React from 'react';
import { Button, View, Text, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';


export default class MenuBottom2 extends React.Component {
    render() {
        return (
            <Entypo
                name = "menu"
                color="#000000"
                size = {32}
                style = {styles.menuIcons} 
            />
        );
    }
}

const styles = StyleSheet.create({
    menuIcons:{
        zIndex: 9,
        position: 'absolute',
        top: 40,
        left: 20,
    }
})