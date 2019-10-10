import React from 'react';
import {
  TextInput,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ToastAndroid,
} from 'react-native';

import API from '../conectionAPI/API';
import * as SecureStore from 'expo-secure-store';


export default class MiCartera extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      // datos de la api
      url: API.api + '/protected/saldo',
      token: '',
      saldo: '',
    };

  }

  finalizarViaje = () => {

    console.log("el token es: " +this.state.token)
    // console.log("el IDhistorial es: " + this.state.idHistorial)
    // // console.log("el fecha es: " +this.state.fecha)
    // console.log("fecha de finalizar recorrido: " + this.state.fecha)

    fetch(this.state.url, {
      
      method: 'GET',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        "Authorization": 'Bearer ' + this.state.token,
      },
    })
      .then(res => {

        if (res.status == 500) {

          ToastAndroid.show('Error con el servidor', ToastAndroid.SHORT);


        }
        if (res.status == 404) {

          ToastAndroid.show('No se encuentro usuario con esa id', ToastAndroid.SHORT);

        }

        if (res.status == 200) {
          res.json().then(data => {

            // ToastAndroid.show('Recorrido finalizado! ', ToastAndroid.SHORT)
            // this.props.navigation.navigate('Home')
            this.setState({ saldo: data.saldo })

          })

          


        }
      })

  }

  recuperarToken = async () => {

    try {
      // var token = await AsyncStorage.getItem('token')
      const token = await SecureStore.getItemAsync('token');
      console.log("EL TOKEN ES: " + token)
      this.setState({token:token})
      
    } catch (e) {
      console.log(e)
    }

    this.finalizarViaje()
  }

  componentDidMount() {

    this.recuperarToken();
    
  }

  render() {
    return (

      <View style={styles.mainbody}>
        <View style={styles.box1}>
          <View style={styles.boxTitulo}>
            <Text style={styles.name} >Resumen Tarjeta</Text>
          </View>
          <View style={styles.boxTarjeta}>
            <View style={styles.tituloTarjeta}>
              <Text style={styles.name}>Saldo virtual</Text>
            </View>
            <View style={styles.contenidoTarjeta}>
              <Text style={styles.precio}>{this.state.saldo}</Text>
            </View>
            <View style={styles.contenidoBoton}>
              <TouchableOpacity style={styles.btnAgregar}>
                <Text style={styles.labelBtn}>
                  Agregar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.box2}>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  mainbody: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: StatusBar.currentHeight,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box2: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#FFF',
    width: '100%',
    justifyContent: 'center',
  },
  box1: {
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#FFF',
    width: '100%',
    justifyContent: 'center',
    borderBottomColor: '#e8e8ec',
    borderBottomWidth: 1,
  },
  boxTarjeta: {
    width: '85%',
    backgroundColor: '#B9E688',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 5,
  },
  boxTitulo: {
    alignItems: 'center',
    flex: 0.5,
    backgroundColor: '#FFF',
    width: '100%',
  },
  tituloTarjeta: {
    alignItems: 'center',
    flex: 0.5,
    backgroundColor: '#B9E688',
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
  },
  contenidoTarjeta: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#B9E688',
    width: '100%',
    // borderRadius: 5,
    justifyContent: 'center',
  },
  contenidoBoton: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 0.5,
    //marginBottom: 30,
    backgroundColor: '#B9E688',
    width: '100%',
    justifyContent: 'flex-end',
    borderRadius: 5,
    paddingRight: '5%',
    paddingBottom: '3%',
  },
  btnAgregar: {
    width: '30%',
    height: 40,
    //marginLeft: 35,
    //marginTop: 70,
    borderRadius: 5,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelBtn: {
    color: '#B9E688',
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    color: '#000',
    fontSize: 18,
    // marginTop: 12,
    //fontSize: 20,
    //color: '#222',
    fontWeight: 'bold',
  },
  precio: {
    color: '#000',
    fontSize: 25,
    // marginTop: 12,
    //fontSize: 20,
    //color: '#222',
    fontWeight: 'bold',
  },
})