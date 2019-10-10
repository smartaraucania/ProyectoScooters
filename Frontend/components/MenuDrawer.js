import React from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class MenuDrawer extends React.Component {

    navLink(nav, text) {
        return (
            <TouchableOpacity style={{ height: 50 }} onPress={() => this.props.navigation.navigate(nav)}>
                <Text style={styles.link}>{text}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroller}>

                    <View style={styles.header}>

                        {/* <View style={styles.profile}> */}
                            {/* <View style={styles.imgView}> */}
                                <FontAwesome5 style={styles.img} name={"user-circle"} size={70} color="#fff" />
                                <Text style={styles.text}>Gabriel Uribe</Text>
                                <Text style={styles.textCorreo}>gabriel.uribe.022@gmail.com</Text>
                            {/* </View> */}
                            {/* <View style={styles.profileText}>
                                <Text style={styles.name}>Gabriel Uribe</Text>
                            </View> */}
                        {/* </View> */}
                    </View>


                    <View style={styles.bottomHome}>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0,0.2)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 35,
                                height: 35,
                                backgroundColor: '#fff',
                                borderRadius: 50,
                                marginLeft: 5,
                            }}
                        >
                            <FontAwesome5 name='map-marked-alt' color='#464646' size={20} style={styles.inputIconStyle} />
                        </View>
                        {this.navLink('Home', 'Home')}
                    </View>

                    <View style={styles.bottomMiCartera}>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0,0.2)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 35,
                                height: 35,
                                backgroundColor: '#fff',
                                borderRadius: 50,
                                marginLeft: 5,
                            }}
                        >
                            <Entypo name='wallet' color='#464646' size={20} style={styles.inputIconStyle} />
                        </View>
                        {this.navLink('Cartera', 'Mi Cartera')}
                        
                    </View>

                    <View style={styles.bottomAsistencia}>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0,0.2)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 35,
                                height: 35,
                                backgroundColor: '#fff',
                                borderRadius: 50,
                                marginLeft: 5,
                            }}
                        >
                            <Ionicons name='md-help' color='#464646' size={20} style={styles.inputIconStyle} />
                        </View>
                        {this.navLink('Asistencia', 'Asistencia')}
                    </View>

                    <View style={styles.bottomPerfil}>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0,0.2)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 35,
                                height: 35,
                                backgroundColor: '#fff',
                                borderRadius: 50,
                                marginLeft: 5,
                            }}
                        >
                            <FontAwesome5 name='user' color='#464646' size={20} style={styles.inputIconStyle} />
                        </View>
                        {this.navLink('Perfil', 'Perfil')}
                    </View>

                    <View style={styles.bottomViajesActivos}>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: 'rgba(0,0,0,0.2)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 35,
                                height: 35,
                                backgroundColor: '#fff',
                                borderRadius: 50,
                                marginLeft: 5,
                            }}
                        >
                            <MaterialCommunityIcons name='timer' color='#464646' size={20} style={styles.inputIconStyle} />
                        </View>
                        {this.navLink('RecorridoActivos', 'Recorrido Activo')}
                    </View>


                    <View style={styles.footer}>
                        <Text style={styles.description}>APP</Text>
                        <Text style={styles.version}>v1.0</Text>
                    </View>

                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scroller: {
        flex: 1,
        backgroundColor: 'lightgray',
    },
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
    },
    topLink: {
        height: 160,
        backgroundColor: '#FFFFFF'
    },
    bottomHome: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DEDEDE',
        //paddingBottom: 250,
    },
    bottomMiCartera: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DEDEDE',
        //paddingBottom: 250,
    },
    bottomAsistencia: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 5,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DEDEDE',
        //paddingBottom: 250,
    },
    bottomPerfil: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 5,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DEDEDE',
        // paddingBottom: 210,
    },
    bottomViajesActivos: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 5,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DEDEDE',
        paddingBottom: 200,
    },
    link: {
        flex: 1,
        fontSize: 20,
        padding: 6,
        paddingLeft: 14,
        margin: 5,
        textAlign: 'left',
    },
    profile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#777777',
    },
    profileText: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',

    },
    name: {
        fontSize: 20,
        paddingBottom: 5,
        color: 'white',
        textAlign: 'left',
    },
    imgView: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    img: {
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: 'lightgray',

    },
    version: {
        flex: 1,
        textAlign: 'right',
        marginRight: 20,
        color: 'black',
    },
    description: {
        flex: 1,
        marginLeft: 20,
        fontSize: 16,
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        //marginLeft: 15,
        color: '#fff',
        justifyContent: 'center',
    },
    textCorreo:{
        fontSize: 16,
        fontWeight: 'normal',
        //marginLeft: 15,
        color: '#fff',
        justifyContent: 'center',
    },
    header:{
        width: '100%',
        height: 200,
        backgroundColor: '#28883A',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    }
})