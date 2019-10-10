import React, { Component } from "react";

import {
  Container,
  TypeTitle,
  TypeDescription,
  TypeImage,
  RequestButton,
  RequestButtonText,
  AsyncStorage,
} from "./styles";

import {
  StyleSheet,
  View,
  ToastAndroid
} from 'react-native';

import patinete2 from '../assets/images/patinete2.png';

var estadoScooter = ''
import * as SecureStore from 'expo-secure-store';
import API from '../conectionAPI/API';

export default class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //datos del scooter recibidos
      scooter: this.props.navigation.state.params.IdScooter,
      estado: this.props.navigation.state.params.estado,
      modelo: this.props.navigation.state.params.modelo,
      latitud: this.props.navigation.state.params.latitud,
      longitud: this.props.navigation.state.params.longitud,

      // url: API.api + '/protected/me',
      url: API.api + '/protected/historial',
      fecha: '',
      token: '',
      idHistorial: '',

    };

  }

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
  }

  getData = async () => {

    try {
      var token = await SecureStore.getItemAsync('token');
    } catch (e) {
      console.log(e)
    }
    this.setState({ token: token })
    // console.log("el token es: " + this.state.token)
  }

  // getIdHisotiral = async () => {

  //   try {
  //     var idHistorial = await SecureStore.getItemAsync('RecorridoActivos');
  //   } catch (e) {
  //     console.log(e)
  //   }
  //   this.setState({ idHistorial: idHistorial })
  //   console.log("el idHistorial es: " + this.state.idHistorial)
  // }

  cheqViaje = () => {

    fetch(this.state.url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
        "Authorization": 'Bearer '+ this.state.token,
      },
      body: JSON.stringify({

        scooter: this.state.scooter,
        latitud: this.state.latitud,
        longitud: this.state.longitud,
        fecha: this.state.fecha,

      })
    })
      .then(res => {
        if (res.status == 501) {

          ToastAndroid.show('Error con el servidor usuario', ToastAndroid.SHORT);
          

        }
        if (res.status == 500) {

          ToastAndroid.show('Error con el servidor', ToastAndroid.SHORT);
          

        }
        if (res.status == 502) {

          ToastAndroid.show('Error con el servidor scooter', ToastAndroid.SHORT);
         

        }
        if (res.status == 503) {

          // console.log(this.state.scooter)
          // console.log(this.state.latitud)
          // console.log(this.state.longitud)
          // console.log(this.state.fecha)

          ToastAndroid.show('Error con el servidor historial', ToastAndroid.SHORT);
          

        }
        if (res.status == 404) {

          ToastAndroid.show('ID no valida', ToastAndroid.SHORT);
          

        }
        if (res.status == 401) {

          ToastAndroid.show('Scooter no disponible', ToastAndroid.SHORT);
          this.props.navigation.goBack(null); 

        }

        if (res.status == 200) {
          res.json().then(data => {
            // console.log("fecha del menu: " + this.state.fecha)
            SecureStore.setItemAsync('HistorialViaje', data.historial._id );
            
            this.setState({ idHistorial: data.historial._id })

            this.props.navigation.navigate('RecorridoActivos', {
              token: this.state.token, idHistorial: this.state.idHistorial}) 
            ToastAndroid.show('Recorrido en curso! ', ToastAndroid.SHORT)
          })
        }
      })

  }

  _getInformacion() {

    if (this.state.token == null || this.state.token == '') {

      this.getData()

    } else {
      if (!this.state.estado) {
        estadoScooter = 'Scooter disponible'

      } else {
        estadoScooter = 'Scooter no disponible'
      }
    }

  }

  render() {

    this._getInformacion();

    return (

      <View style={styles.container}>
        <Container>
          <TypeTitle>{this.state.scooter}</TypeTitle>
          {/* <TypeDescription>Viajes realizados de este scooter</TypeDescription> */}

          <TypeImage source={patinete2} />
          <TypeTitle>{this.state.modelo}</TypeTitle>
          <TypeDescription >{estadoScooter}</TypeDescription>
          <TypeDescription >{this.state.fecha}</TypeDescription>
          <TypeDescription >{this.state.longitud}</TypeDescription>

          <RequestButton onPress={() => { }}>
            <RequestButtonText onPress={() => { this.cheqViaje() }}>DESBLOQUEAR SCOOTER</RequestButtonText>
          </RequestButton>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#A4A4A4',
  },

})
