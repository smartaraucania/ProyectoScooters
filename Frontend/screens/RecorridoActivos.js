import React from 'react';
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';

import { KeyboardAvoidingView } from 'react-native';
import API from '../conectionAPI/API';


export default class RecorridoActivos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            // // Variables del scooter que se enviaron desde la pantalla menu
            latitud: '',
            longitud: '',
            fecha: '',

            costo: '',
            costoDesbloquear: '300',
            costoPorMinuto: '150',
            distancia: '1.5',
            tiempo: '',
            tiempoMostrar: '',

            // Variables cronometro 
            timer: null,
            minutes_Counter: '00',
            seconds_Counter: '00',
            startDisable: false,
            //estado que pasara desde la pantalla menu a esta pantalla
            estado: true,

            // datos de la api
            url: API.api + '/protected/historialfin',

            // token y idHistorial
            token: '',
            idHistorial: '',
        };

    }

    //////////////////////////////////////// CRONOMETRO ///////////////////////////////////
    onButtonStart = () => {

        let timer = setInterval(() => {

            var num = (Number(this.state.seconds_Counter) + 1).toString(),
                count = this.state.minutes_Counter;

            if (Number(this.state.seconds_Counter) == 59) {
                count = (Number(this.state.minutes_Counter) + 1).toString();
                num = '00';
            }

            this.setState({
                minutes_Counter: count.length == 1 ? '0' + count : count,
                seconds_Counter: num.length == 1 ? '0' + num : num
            });
        }, 1000);
        this.setState({ timer });

        this.setState({ startDisable: true })
    }


    onButtonStop = () => {
        clearInterval(this.state.timer);
        this.setState({ startDisable: false })
        // vamos a setear los valores al body
        this.setearValores()
    }


    onButtonClear = () => {
        this.setState({
            timer: null,
            minutes_Counter: '00',
            seconds_Counter: '00',
        });
    }


    // ESTE METODO FUNCIONA COMO RENDER, POR LO TANTO LO OCUPAREMOS PARA SETEAR EL VALOR DEL ESTADO 
    // DEL CRONOMETRO y obtendremos la fecha
    componentDidMount() {

        var that = this;
        var fecha = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        that.setState({
            //Setting the value of the date time
            fecha:
                // fecha + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
                year + '/' + month + '/' + fecha + ' ' + hours + ':' + min + ':' + sec,
        });


        if (this.props.navigation.state.params) {

            this.state.token = this.props.navigation.state.params.token;
            this.state.idHistorial = this.props.navigation.state.params.idHistorial;

        }

        if (this.state.estado) {
            this.onButtonStart()
        }
    }


    //////////////////////////////////////// Metodos para la api ///////////////////////////////////
    finalizarViaje = () => {

        // // console.log("el token es: " +this.state.token)
        // console.log("el IDhistorial es: " + this.state.idHistorial)
        // // console.log("el fecha es: " +this.state.fecha)
        // console.log("fecha de finalizar recorrido: " + this.state.fecha)

        fetch(this.state.url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                "Authorization": 'Bearer ' + this.state.token,
            },
            body: JSON.stringify({

                registro: this.state.idHistorial,
                fecha: this.state.fecha,
                costo: this.state.costo,
                distancia: this.state.distancia,
                tiempo: this.state.tiempo,
                latitud: '144',
                longitud: '154',
                

            })
        })
            .then(res => {
                if (res.status == 501) {

                    ToastAndroid.show('Error con la modificacion del scooter', ToastAndroid.SHORT);


                }
                if (res.status == 500) {

                    ToastAndroid.show('Error con el servidor', ToastAndroid.SHORT);


                }
                if (res.status == 404) {

                    ToastAndroid.show('No se encuentra registro', ToastAndroid.SHORT);

                }
                if (res.status == 401) {

                    console.log(this.state.idHistorial)
                    console.log(this.state.fecha)
                    console.log(this.state.costo)
                    console.log("la distancia es:" + this.state.distancia)
                    console.log(this.state.tiempo)

                    res.json().then(data => {
                        console.log(data.Error)
                        ToastAndroid.show('Error al guardar el historial', ToastAndroid.SHORT);
                        // this.props.navigation.goBack(null);
                    })
                }

                if (res.status == 200) {
                    // res.json().then(data => {

                    ToastAndroid.show('Recorrido finalizado! ', ToastAndroid.SHORT)
                    this.props.navigation.navigate('Home')
                    // })

                    //this.setState({ estadoUso: null })
                    this.setState({ minutes_Counter: '00' })
                    this.setState({ seconds_Counter: '00' })
                    this.setState({ tiempoMostrar: '' })
                    this.setState({ costo: '' })

                }
            })

    }

    

    // // metodos para obtener token y la id del historial
    // _getInformacion() {

    //     if (this.state.token == null || this.state.token == '') {

    //         this.getData()

    //     } else {
    //         console.log("")
    //     }

    // }
    // getData = async () => {

    //     try {
    //         // var token = await SecureStore.getItemAsync('token');
    //         var idHistorial = await SecureStore.getItemAsync('HistorialViaje');
    //     } catch (e) {
    //         console.log(e)
    //     }
    //     // this.setState({ token: token })
    //     this.setState({ idHistorial: idHistorial })
    //     // console.log("el token es: " + this.state.token)
    //     // console.log("el idHistorial es: " + this.state.idHistorial)
    // }


    // setear los valores al body
    setearValores() {
        //tiempo
        let tiempoBody = this.state.minutes_Counter.toString() + ":" + this.state.seconds_Counter.toString();
        let parseTiempo = (this.state.minutes_Counter * 60) + this.state.seconds_Counter

        this.setState({ tiempoMostrar: tiempoBody })
        this.setState({ tiempo: parseTiempo })
        //precio
        this.setState({ costo: (parseInt(this.state.minutes_Counter) * parseInt(this.state.costoPorMinuto)) + parseInt(this.state.costoDesbloquear) })
    }



    render() {
        // this._getInformacion();
        return (

            <View style={styles.mainbody}>
                <View style={styles.header}>

                    <View style={styles.box1}>
                        <Text style={styles.name}>
                            VIAJE EN CURSO
                        </Text>
                    </View>
                    <View style={styles.box2}>
                        <View style={styles.tiempo}>

                            <Text>
                                Tiempo
                            </Text>
                            <Text style={styles.tiempoViaje}>
                                {this.state.minutes_Counter} : {this.state.seconds_Counter}
                            </Text>
                        </View>
                        <View style={styles.distancia}>

                            <Text  >
                                Distancia
                            </Text>
                            <Text style={styles.distanciaViaje} >
                                {this.state.distancia}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.box3}>
                        <TouchableOpacity style={styles.btnFinRecorrido} onPress={this.onButtonStop}>
                            <Text style={styles.labelBtn}>
                                Finalizar recorrido
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <KeyboardAvoidingView style={styles.container} behavior="padding">

                    <View style={styles.body}>

                        <View style={styles.box4}>
                            <View style={styles.namePrecioEstandar}>

                                <Text style={styles.datosBodyIzquierda}>
                                    Precio Estandar
                                </Text>
                            </View>
                            <View style={styles.precioEstandar}>

                                <Text style={styles.datosBodyDerecha}>
                                    150
                                </Text>
                            </View>
                        </View>

                        <View style={styles.box4}>
                            <View style={styles.namePrecioEstandar}>

                                <Text style={styles.datosBodyIzquierda}>
                                    Costo Desbloquear
                                </Text>
                            </View>
                            <View style={styles.precioEstandar}>

                                <Text style={styles.datosBodyDerecha}>
                                    300
                                </Text>
                            </View>
                        </View>

                        <View style={styles.box4}>
                            <View style={styles.namePrecioEstandar}>

                                <Text style={styles.datosBodyIzquierda}>
                                    Distancia recorrida
                                </Text>
                            </View>
                            <View style={styles.precioEstandar}>

                                <Text style={styles.datosBodyDerecha}>
                                    {this.state.distancia}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.box4}>
                            <View style={styles.namePrecioEstandar}>

                                <Text style={styles.datosBodyIzquierda}>
                                    Tiempo transcurrido
                                </Text>
                            </View>
                            <View style={styles.precioEstandar}>

                                <Text style={styles.datosBodyDerecha}>
                                    {this.state.tiempoMostrar}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.box4}>
                            <View style={styles.namePrecioEstandar}>

                                <Text style={styles.datosBodyIzquierda}>
                                    Precio
                                </Text>
                            </View>
                            <View style={styles.precioEstandar}>

                                <Text style={styles.datosBodyDerecha}>
                                    {this.state.costo}
                                </Text>
                            </View>
                        </View>

                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.btnFinalizar} onPress={() => { this.finalizarViaje() }}>
                            <Text style={styles.labelBtn}>
                                Finalizar
                        </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>


        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    footer: {
        flex: 0.5,
        backgroundColor: '#FFF',
        borderTopColor: '#e8e8ec',
        borderTopWidth: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    datosBodyIzquierda: {
        fontSize: 18,
        color: '#B1B1B1',
    },
    datosBodyDerecha: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#B1B1B1',
    },
    name: {
        color: '#000',
        fontSize: 20,
        marginTop: 12,
        fontWeight: 'bold',
    },
    mainbody: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: StatusBar.currentHeight,
    },

    btnFinalizar: {
        width: '100%',
        height: 50,
        backgroundColor: '#28983C',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnFinRecorrido: {
        width: '80%',
        height: 40,
        borderRadius: 5,
        backgroundColor: '#28983C',
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelBtn: {
        color: '#FFF',
        fontSize: 20,
    },

    header: {
        height: 200,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#e8e8ec',
        borderBottomWidth: 1,
    },
    box2: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'red',
        width: '100%',
        justifyContent: 'center',
    },
    box3: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 0.5,
        backgroundColor: '#FFF',
        width: '100%',
        justifyContent: 'center',
    },
    box4: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#FFF',
        width: '100%',
        justifyContent: 'center',
    },
    box1: {
        alignItems: 'center',
        flex: 0.5,
        backgroundColor: '#FFF',
        width: '100%',
    },
    tiempo: {
        width: '50%',
        backgroundColor: '#FFF',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    namePrecioEstandar: {
        width: '50%',
        backgroundColor: '#ECECEC',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: '10%',
    },
    distancia: {
        backgroundColor: '#FFF',
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    precioEstandar: {
        backgroundColor: '#ECECEC',
        width: '50%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: '10%',
    },
    tiempoViaje: {
        color: '#28983C',
        fontWeight: 'bold',
        fontSize: 30,
    },
    distanciaViaje: {
        color: '#28983C',
        fontWeight: 'bold',
        fontSize: 30,
    }

})