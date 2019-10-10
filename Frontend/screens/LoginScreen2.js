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
    ToastAndroid,
    AsyncStorage
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
import * as Animatable from 'react-native-animatable';
import { Icon } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import IconEntypo from 'react-native-vector-icons/Entypo';
import API from '../conectionAPI/API';
// import AsyncStorage from '@react-native-community/async-storage';

import * as SecureStore from 'expo-secure-store';
import ReactDOM from 'react-dom';

export default class LoginScreen2 extends React.Component {

    constructor(props) {
        super(props)
        //increaseHeightOfLogin()
        this.state = {
            placeholderText: 'Ingrese su número de teléfono',
            placeholderContraseña: 'Ingrese su contraseña',
            showPass: true,
            press: false,

            //Carga de datos de la api
            url: API.api + '/auth/login',
            password: '',
            numero: this.props.navigation.state.params.numero,
        }

        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleChangePassword(newValue) { //Cambio estado valor input
        this.setState({ password: newValue })
    }


    cheqPass = () => {

        if (this.validarRegistro()) {

            fetch(this.state.url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({

                    password: this.state.password.toString(),
                    telefono: this.state.numero.toString(),
                })
            })
                .then(res => {
                    if (res.status == 500) {
                        ToastAndroid.show('Error con el servidor', ToastAndroid.SHORT);
                    }
                    if (res.status == 401) {
                        ToastAndroid.show('Contraseña no corresponde', ToastAndroid.SHORT);
                    }

                    if (res.status == 200) {
                        res.json().then(data => {
                            //guardamos el token en la varible token al momento de logearnos
                            // AsyncStorage.setItem('token', data.token)
                            SecureStore.setItemAsync('token', data.token)
                            ToastAndroid.show('Ingreso Exitoso ', ToastAndroid.SHORT)
                            this.props.navigation.navigate('DrawerNavigation')
                        })
                    }
                })


        } else {
            ToastAndroid.show('Los campos son obligatorios', ToastAndroid.SHORT);
        }

    }

    // metodo async para poder mostrar valores de variables
    mostrarToken = async () => {

        try {
            // var token = await AsyncStorage.getItem('token')
            const token = await SecureStore.getItemAsync('token');
            // console.log("EL TOKEN ES: " + token)
        } catch (e) {
            console.log(e)
        }
    }

    validarRegistro() {

        let password = this.state.password.toString().length;
        let telefono = this.state.numero.toString().length;

        if (password == 0 || telefono == 0) {
            return (false);
        } else {
            return (true);
        }
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

    showPass = () => {
        if (!this.state.press) {
            this.setState({ showPass: false, press: true })
        } else {
            this.setState({ showPass: true, press: false })
        }
    }

    componentDidMount() {
        Animated.timing(this.loginHeight, {
            toValue: SCREEN_HEIGHT,
            duration: 500
        }).start(() => {
            this.refs.textInputMobile.focus()
        })
    }


    render() {

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

        // this.increaseHeightOfLogin();


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
                        // onPress={() => this.decreaseHeightOfLogin()}
                        onPress={() => this.props.navigation.goBack(null)}
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
                        borderRadius: 30,
                    }}
                >
                    <TouchableOpacity onPress={() => { this.cheqPass(), this.mostrarToken() }}>
                        <Icon name="md-arrow-forward" style={{ color: 'white' }} />
                    </TouchableOpacity>

                    {/* <Icon name="md-arrow-forward" style={{ color: 'white' }} /> */}

                </Animated.View>

                {/* <LinearGradient colors={['#F88536','#EC410E' ]} style={{ flex: 1 }}> */}
                <ImageBackground
                    //source={require('../assets/images/fondo.jpg')}
                    style={{ flex: 1 }}
                >
                    <Animatable.View animation="slideInUp" iterationCount={1}>
                        <Animated.View
                            style={{
                                //height: this.loginHeight,
                                backgroundColor: '#FFFFFF',
                                marginTop: 130
                            }}>

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
                                            opacity: titleTextOpacity,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        Ingrese su contraseña
                                       </Animated.Text>

                                    {/* <Image
                                        source={require('../assets/images/chile2.png')}
                                        style={{ height: 24, width: 24, resizeMode: 'contain' }}
                                    /> */}
                                    <IconEntypo name='lock-open' color='#464646' size={20} style={styles.inputIconStyle} />
                                    <Animated.View
                                        pointerEvents="none"
                                        style={{
                                            flexDirection: 'row',
                                            flex: 1,
                                            borderBottomWidth: this.borderBottomWidth
                                        }}
                                    >

                                        {/* <Text style={{
                                            fontSize: 20,
                                            paddingHorizontal: 10
                                        }}>
                                            +56
                                        </Text> */}

                                        <TextInput
                                            // keyboardType="numeric"
                                            // maxLength={9}
                                            // width= {50}
                                            secureTextEntry={this.state.showPass}
                                            ref="textInputMobile"
                                            style={{ flex: 1, fontSize: 15 }}
                                            placeholder={this.state.placeholderContraseña}
                                            underlineColorAndroid="transparent"
                                            autoCorrect={false}
                                            onChangeText={this.handleChangePassword}
                                        />

                                    </Animated.View>
                                    <TouchableOpacity onPress={this.showPass.bind(this)}>
                                        <IconEntypo name={this.state.press == false ? 'eye' : 'eye-with-line'} color='#464646' size={20} />
                                    </TouchableOpacity>
                                </Animated.View>
                            </TouchableOpacity>

                        </Animated.View>

                    </Animatable.View>
                </ImageBackground>
                {/* </LinearGradient> */}
            </View >
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputIconStyle: {
        // position: 'absolute',
        // top: 10,
        // left: 34,
        paddingHorizontal: 10
    },
})