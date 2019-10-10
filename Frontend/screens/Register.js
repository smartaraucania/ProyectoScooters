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
    ToastAndroid
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
import { Icon } from 'native-base';

import * as Animatable from 'react-native-animatable';
const { width: WIDTH } = Dimensions.get('window');
import IconEntypo from 'react-native-vector-icons/Entypo';
var colorTextInput = '#D9D9D9';
import { LinearGradient } from 'expo-linear-gradient';

import { KeyboardAvoidingView } from 'react-native';

import API from '../conectionAPI/API';


export default class Register extends React.Component {
    constructor() {
        super()

        this.state = {
            placeholderText: 'Ingrese su número de teléfono',
            placeholderTextEmail: 'Ingrese su correo electronico',
            showPass: true,
            press: false,

            //Valores iniciales variables registro
            telefono: '',
            password: '',
            email: '',

            //Carga de datos de la api
            url: API.api + '/auth/register',
        }

        this.handleChangeTelefono = this.handleChangeTelefono.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
    }

    //Acciones encargadas del CRUD
    handleChangeTelefono(newValue) {
        this.setState({ telefono: newValue })
    }

    handleChangePassword(newValue) {
        this.setState({ password: newValue })
    }
    handleChangeEmail(newValue) {
        this.setState({ email: newValue })
    }

    // getDatos = () => {
    //     //this.setState({ loading: true });
    //     fetch(this.state.url)
    //         .then(res => res.json())
    //         .then(res => {
    //             ToastAndroid.show(res.usuarios, ToastAndroid.LONG);
    //             console.log(res.usuarios)
    //             console.log("gg")
    //         })
    // }


    //-----------------------------------------------------------------


    //Encargado de enviar los datos de registro a la API
    registrarBtn = () => {

        if (this.validarRegistro()) {
            if (this.validateEmail()) {
                fetch(this.state.url, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.state.email.toString().replace(/ /g, ''),
                        // displayName: this.state.name.toString() + ' ' + this.state.lastname.toString(),
                        password: this.state.password.toString(),
                        telefono: this.state.telefono.toString(),
                    })
                })
                    .then(res => {
                        if (res.status == 500) {
                            ToastAndroid.show('Error en el registro', ToastAndroid.SHORT);
                        }
                        if (res.status == 401) {
                            ToastAndroid.show('Telefono ya registrado', ToastAndroid.SHORT);
                        }
                        if (res.status == 402) {
                            ToastAndroid.show('Email ya registrado', ToastAndroid.SHORT);
                        }
                        if (res.status == 200) {
                            ToastAndroid.show('Se ha registrado con exito!', ToastAndroid.SHORT);
                            this.props.navigation.navigate('LoginScreen');
                        }
                    })

            } else {
                ToastAndroid.show('Dirección de Correo Electrónico Inválido', ToastAndroid.SHORT);
            }
        }else{
            ToastAndroid.show('Los campos son obligatorios', ToastAndroid.SHORT);
        }


    }
    //-----------------------------------------------------------------

    validarRegistro() {
        let email = this.state.email.toString().length;
        let pass = this.state.password.toString().length;
        let phone = this.state.telefono.toString().length;

        if (email == 0 || pass == 0 || phone == 0) {
            return (false);
        } else {
            return (true);
        }
    }

    componentWillMount() {
        this.loginHeight = new Animated.Value(155)

    }

    showPass = () => {
        if (!this.state.press) {
            this.setState({ showPass: false, press: true })
        } else {
            this.setState({ showPass: true, press: false })
        }
    }

    decreaseHeightOfLogin = () => {
        Keyboard.dismiss()
        Animated.timing(this.loginHeight, {
            toValue: 150,
            duration: 500
        }).start()
    }

    //valida la correcta sintaxis para un correo
    validateEmail() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (reg.test(this.state.email.toString().replace(/ /g, ''))) {
            return (true);
        } else {
            return (false);
        }
    }

    render() {

        // const headerBackArrowOpacity = this.loginHeight.interpolate({
        //     inputRange: [150, SCREEN_HEIGHT],
        //     outputRange: [0, 1]
        // })

        return (

            <View style={{ flex: 1 }}>
                {/* '#39C3CE', '#1C919B' */}
                <LinearGradient colors={['#28983C', '#247C34']} style={{ flex: 1 }}>

                    <Animated.View style={{ position: 'absolute', height: 60, width: 60, top: 35, left: 25, zIndex: 100}}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack(null)}
                        >
                            <Icon name="md-arrow-back" style={{ color: 'black' }} />
                        </TouchableOpacity>

                    </Animated.View>

                    <ImageBackground
                        //source={require('../assets/images/fondo.jpg')}
                        style={{ flex: 1 }}
                    >
                        <View style={{
                            flex: 1, justifyContent: 'center',
                            alignItems: 'center',
                            //backgroundColor: 'red',
                            paddingTop: 40

                        }}>
                            <Animatable.View
                                animation="fadeInDown" iterationCount={1}
                                style={{
                                    backgroundColor: 'white',
                                    height: 100, width: 100, alignItems: 'center',
                                    justifyContent: 'center', marginBottom: 30, borderRadius: 50,
                                }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 26,
                                    color: 'black'
                                }}>APP</Text>
                            </Animatable.View>

                            <Animatable.View
                                animation="fadeInDown" iterationCount={1}
                                style={{
                                    //backgroundColor: 'white',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    color: 'white'
                                }}>Informacion de la cuenta</Text>
                            </Animatable.View>
                        </View>

                        {/** botoom half**/}

                        <KeyboardAvoidingView style={styles.container} behavior="padding">
                            <Animatable.View animation="slideInUp" iterationCount={1}>
                                <Animated.View
                                    style={{
                                        height: this.loginHeight,
                                        //backgroundColor: 'white',
                                        marginBottom: 30,
                                        alignItems: 'center',
                                        //justifyContent: 'flex-start'

                                    }}>

                                    <Animated.View
                                        style={{
                                            paddingHorizontal: 25,
                                        }}>
                                        <View>
                                            <TextInput
                                                style={styles.inputStyle}
                                                placeholder={'Email'}
                                                placeholderTextColor={colorTextInput}
                                                underlineColorAndroid='transparent'
                                                autoCorrect={false}
                                                colorTextInput={'#464646'}
                                                onChangeText={this.handleChangeEmail}
                                            />
                                            <IconEntypo name='email' color='#464646' size={20} style={styles.inputIconStyle} />
                                        </View>
                                    </Animated.View >

                                    <View style={{ marginTop: 20 }}>
                                        <TextInput
                                            style={styles.inputStyle}
                                            placeholder={'Contraseña'}
                                            secureTextEntry={this.state.showPass}
                                            placeholderTextColor={colorTextInput}
                                            underlineColorAndroid='transparent'
                                            onChangeText={this.handleChangePassword}
                                        />
                                        <IconEntypo name='lock-open' color='#464646' size={20} style={styles.inputIconStyle} />

                                        <TouchableOpacity style={styles.eyeBtnStyle} onPress={this.showPass.bind(this)}>
                                            <IconEntypo name={this.state.press == false ? 'eye' : 'eye-with-line'} color='#464646' size={20} />
                                        </TouchableOpacity>

                                    </View>

                                    <Animated.View
                                        style={{
                                            paddingHorizontal: 25,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 20
                                        }}>
                                        <Image
                                            source={require('../assets/images/chile2.png')}
                                            style={{ height: 24, width: 24, resizeMode: 'contain' }}
                                        />
                                        <Text style={{
                                            fontSize: 20,
                                            paddingHorizontal: 5,
                                            color: '#FFFFFF'
                                        }}>
                                            +56
                                        </Text>
                                        <TextInput
                                            keyboardType="numeric"
                                            maxLength={9}
                                            // ref="textInputMobile"
                                            style={{ fontSize: 16, paddingLeft: 5, color: '#ffffff' }}
                                            placeholder={this.state.placeholderText}
                                            //placeholderTextColor={colorTextInputNumero}
                                            underlineColorAndroid="transparent"
                                            onChangeText={this.handleChangeTelefono}
                                        />
                                    </Animated.View >

                                </Animated.View>

                                <TouchableOpacity onPress={() => {
                                    this.registrarBtn()
                                    // this.props.navigation.navigate('LoginScreen')
                                }}
                                >

                                    <View style={{
                                        height: 35,
                                        backgroundColor: 'white',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        //borderTopColor: '#e8e8ec',
                                        //borderTopWidth: 1,
                                        //paddingHorizontal: 25,
                                        marginTop: 10,
                                        flexDirection: 'column',
                                        width: '50%',
                                        left: '25%',
                                        borderRadius: 5,
                                    }}>

                                        <Text
                                            style={{
                                                //color: '#ffffff',
                                                fontWeight: 'bold',
                                                fontSize: 20,
                                            }}>
                                            Crear cuenta
                                </Text>

                                    </View>

                                </TouchableOpacity>
                            </Animatable.View>
                        </KeyboardAvoidingView>
                    </ImageBackground>
                </LinearGradient>
            </View >

        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    eyeBtnStyle: {
        position: 'absolute',
        top: 12,
        right: 34,
    },

    inputIconStyle: {
        position: 'absolute',
        top: 12,
        left: 34,
    },

    inputStyle: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: '#F2F2F2',
        //color: '#464646',
        marginHorizontal: 25,

    },

})