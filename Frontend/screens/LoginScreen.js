import React from 'react';

import {
    StyleSheet,
    View,
    Platform,
    Dimensions,
    TouchableOpacity,
    Text,
    TextInput,
    ImageBackground,
    Image,
    Animated,
    Keyboard,
    ToastAndroid
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
import * as Animatable from 'react-native-animatable';
import { Icon } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import API from '../conectionAPI/API';


export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            placeholderText: 'Ingrese su número de teléfono',
            //Carga de datos de la api
            url: API.api + '/public/usuarioFono/',
            numero: '',
        }

        this.handleChangeNumero = this.handleChangeNumero.bind(this);
    }

    handleChangeNumero(newValue) { //Cambio estado valor input
        this.setState({ numero: newValue })
    }

    cheqNumero = () => {
        // console.log(this.state.url+(this.state.numero).toString());

        fetch(this.state.url + (this.state.numero).toString(), {
            method: 'GET',
        })
            .then(res => {
                // console.log(res.status);
                if (res.status == 200) {
                    // res.json().then(data => {

                        this.props.navigation.navigate('LoginScreen2', { numero: this.state.numero });
                    // })

                }
                if (res.status == 404) {
                    ToastAndroid.show("Telefono no encontrado ", ToastAndroid.LONG);
                }
                if (res.status == 500) {
                    ToastAndroid.show("Error al conectar al servidor ", ToastAndroid.LONG);
                }

            })
            .catch(err => {
                ToastAndroid.show("Error " + err.toString(), ToastAndroid.LONG);
            })

    }

    componentWillMount() {
        this.loginHeight = new Animated.Value(150)

        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow',
            this.keyboardWillShow)

        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide',
            this.keyboardWillHide)

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
            this.keyboardWillShow)

        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
            this.keyboardWillHide)

        this.keyboardHeight = new Animated.Value(0)
        this.forwardArrowOpacity = new Animated.Value(0)
        this.borderBottomWidth = new Animated.Value(0)
    }

    keyboardWillShow = (event) => {

        if (Platform.OS == 'android') {
            duration = 100
        } else {
            duration = event.duration
        }

        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: duration + 100,
                toValue: event.endCoordinates.height + 10
            }),
            Animated.timing(this.forwardArrowOpacity, {
                duration: duration,
                toValue: 1
            }),
            Animated.timing(this.borderBottomWidth, {
                duration: duration,
                toValue: 1
            }),
        ]).start()
    }

    keyboardWillHide = (event) => {

        if (Platform.OS == 'android') {
            duration = 100
        } else {
            duration = event.duration
        }

        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: duration + 100,
                toValue: 0
            }),
            Animated.timing(this.forwardArrowOpacity, {
                duration: duration,
                toValue: 0
            }),
            Animated.timing(this.borderBottomWidth, {
                duration: duration,
                toValue: 0
            }),
        ]).start()
    }

    increaseHeightOfLogin = () => {
        //this.setState({ placeholderText: '963199291' })
        Animated.timing(this.loginHeight, {
            toValue: SCREEN_HEIGHT,
            duration: 500
        }).start(() => {
            this.refs.textInputMobile.focus()
        })
    }

    decreaseHeightOfLogin = () => {
        Keyboard.dismiss()
        Animated.timing(this.loginHeight, {
            toValue: 150,
            duration: 500
        }).start()
    }

    
    render() {

        const headerTextOpacity = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [1, 0]
        })
        const marginTop = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [25, 100]
        })
        const headerBackArrowOpacity = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [0, 1]
        })
        //////////////////////////////////////
        const titleTextLeft = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [100, 25]
        })
        const titleTextBottom = this.loginHeight.interpolate({
            inputRange: [150, 400, SCREEN_HEIGHT],
            outputRange: [0, 0, 100]
        })
        const titleTextOpacity = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [0, 1]
        })


        return (

            <View style={{ flex: 1 }}>

                <Animated.View
                    style={{
                        position: 'absolute',
                        height: 60, width: 60,
                        top: 35,
                        left: 25,
                        zIndex: 100,
                        opacity: headerBackArrowOpacity
                    }}
                >
                    <TouchableOpacity
                        onPress={() => this.decreaseHeightOfLogin()}
                    >
                        <Icon name="md-arrow-back" style={{ color: 'black' }} />
                    </TouchableOpacity>

                </Animated.View>

                <Animated.View
                    style={{
                        position: 'absolute',
                        height: 60, width: 60,
                        right: 10,
                        bottom: this.keyboardHeight,
                        opacity: this.forwardArrowOpacity,
                        zIndex: 100,
                        backgroundColor: '#54575e',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 30
                    }}
                >
                    <TouchableOpacity onPress={() => { this.cheqNumero() }}>
                        <Icon name="md-arrow-forward" style={{ color: 'white' }} />
                    </TouchableOpacity>

                    {/* <Icon name="md-arrow-forward" style={{ color: 'white' }} /> */}

                </Animated.View>

                <LinearGradient colors={['#28983C', '#247C34']} style={{ flex: 1 }}>
                    <ImageBackground
                        //source={require('../assets/images/fondo.jpg')}
                        style={{ flex: 1 }}
                    >
                        <View style={{
                            flex: 1, justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Animatable.View
                                animation="zoomIn" iterationCount={1}
                                style={{
                                    backgroundColor: 'white',
                                    height: 100, width: 100, alignItems: 'center',
                                    justifyContent: 'center', borderRadius: 50,
                                }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 26
                                }}>APP</Text>
                            </Animatable.View>
                        </View>

                        {/** botoom half**/}

                        <Animatable.View animation="slideInUp" iterationCount={1}>
                            <Animated.View
                                style={{
                                    height: this.loginHeight,
                                    backgroundColor: '#FFFFFF'
                                }}>

                                <Animated.View
                                    style={{
                                        opacity: headerTextOpacity,
                                        alignItems: 'flex-start',
                                        paddingHorizontal: 25,
                                        marginTop: marginTop
                                    }}>
                                    <Text style={{ fontSize: 24 }}>Iniciar Sesión</Text>
                                </Animated.View >

                                <TouchableOpacity

                                    onPress={() => this.increaseHeightOfLogin()}
                                >
                                    <Animated.View
                                        style={{
                                            marginTop: marginTop,
                                            paddingHorizontal: 25,
                                            flexDirection: 'row',
                                        }}>

                                        <Animated.Text
                                            style={{
                                                fontSize: 24,
                                                color: 'gray',
                                                position: 'absolute',
                                                bottom: titleTextBottom,
                                                left: titleTextLeft,
                                                opacity: titleTextOpacity
                                            }}
                                        >
                                            Ingrese su número de teléfono
                                       </Animated.Text>

                                        <Image
                                            source={require('../assets/images/chile2.png')}
                                            style={{ height: 24, width: 24, resizeMode: 'contain' }}
                                        />
                                        <Animated.View
                                            pointerEvents="none"
                                            style={{
                                                flexDirection: 'row',
                                                flex: 1,
                                                borderBottomWidth: this.borderBottomWidth
                                            }}
                                        >

                                            <Text style={{
                                                fontSize: 20,
                                                paddingHorizontal: 10
                                            }}>
                                                +56
                                        </Text>

                                            <TextInput
                                                keyboardType="numeric"
                                                maxLength={9}
                                                ref="textInputMobile"
                                                style={{ flex: 1, fontSize: 15 }}
                                                placeholder={this.state.placeholderText}
                                                underlineColorAndroid="transparent"
                                                onChangeText={this.handleChangeNumero}
                                            />

                                        </Animated.View>

                                    </Animated.View>
                                </TouchableOpacity>


                            </Animated.View>

                            {/* <View style={{
                            height: 70,
                            backgroundColor: 'white',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            borderTopColor: '#e8e8ec',
                            borderTopWidth: 1,
                            paddingHorizontal: 25
                        }}>
                            <Text
                                style={{
                                    color: '#5a7fdf',
                                    fontWeight: 'bold'
                                }}>
                                Iniciar sesión con una red social
                            </Text>
                        </View> */}


                            <View style={{
                                height: 70,
                                backgroundColor: 'white',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopColor: '#e8e8ec',
                                borderTopWidth: 1,
                                paddingHorizontal: 25
                            }}>
                                <Text
                                    onPress={() => this.props.navigation.navigate('Register')}
                                    style={{
                                        color: '#5a7fdf',
                                        fontWeight: 'bold',
                                        fontSize: 16,
                                    }}>
                                    Registrate!
                            </Text>
                            </View>


                        </Animatable.View>
                    </ImageBackground>
                </LinearGradient>
            </View >
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})