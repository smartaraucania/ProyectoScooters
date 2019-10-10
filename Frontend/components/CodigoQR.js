import React from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, View, StyleSheet, Button, Dimensions, ToastAndroid } from 'react-native';
import * as Permissions from 'expo-permissions';

const { width } = Dimensions.get('screen');
const { width: WIDTH } = Dimensions.get('window');

import API from '../conectionAPI/API';

export default class CodigoQR extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      // url api
      url: API.api + '/public/scooter/',
      //datos scooter
      modelo: '',
      estado: '',
      latitud: '',
      longitud: '',
      IdScooter: '',
    };
  }


  validarQR = (data) => {

    if ((data).toString().length == 0) {
      ToastAndroid.show('Error lectura codigo QR', ToastAndroid.SHORT);
      this.props.navigation.goBack(null)
    } else {
      fetch(this.state.url + data, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json',
        }
      })
        .then(res => {

          if (res.status == 404) {
            ToastAndroid.show('No se ha encontrado scooter', ToastAndroid.SHORT);
            this.props.navigation.goBack(null)
          }
          if (res.status == 200) {

            res.json().then(datos => {

              this.setState({ estado: datos.estado });
              this.setState({ modelo: datos.modelo });
              this.setState({ latitud: datos.latitud });
              this.setState({ longitud: datos.longitud });

              this.props.navigation.navigate('Menu', {
                IdScooter: this.state.IdScooter, estado: this.state.estado, modelo: this.state.modelo, latitud: this.state.latitud
                , longitud: this.state.longitud
              });

            })

          } if (res.status == 500) {
            ToastAndroid.show('Error, codigo qr no valido', ToastAndroid.SHORT);
            this.props.navigation.goBack(null)
          }

        })

    }

  }

  static navigationOptions = {
    header: null //hide the header bar 
  };

  // state = {
  //   hasCameraPermission: null,
  //   scanned: false,
  // };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const leftTop = {
      borderLeftWidth: 3,
      borderTopWidth: 3,
      borderColor: 'white'
    };
    const leftBottom = {
      borderLeftWidth: 3,
      borderBottomWidth: 3,
      borderColor: 'white'
    };
    const rightTop = {
      borderRightWidth: 3,
      borderTopWidth: 3,
      borderColor: 'white'
    };
    const rightBottom = {
      borderRightWidth: 3,
      borderBottomWidth: 3,
      borderColor: 'white'
    };

    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: '#000' }}>

        <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={{ ...StyleSheet.absoluteFill, backgroundColor: '#000', marginTop: 65 }} />

        <View style={styles.precioContainer}>
          <Text style={styles.precioStyle}>Escanear Codigo QR</Text>
        </View>

        <View style={{ ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: width / 2, height: width / 2 }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1, ...leftTop }} />
              <View style={{ flex: 1 }} />
              <View style={{ flex: 1, ...rightTop }} />
            </View>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1, ...leftBottom }} />
              <View style={{ flex: 1 }} />
              <View style={{ flex: 1, ...rightBottom }} />
            </View>
          </View>
        </View>

        {scanned && (

          console.log("wena wena")
          
        )}

      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {

    this.setState({ IdScooter: data });
    this.validarQR(data);
    this.setState({ scanned: false });
    this.setState({ scanned: null });

  };
}

//const opacity = "rgba(0, 0, 0, .6)";

const styles = StyleSheet.create({

  precioContainer: {
    marginTop: 25,
  },

  precioStyle: {
    color: '#fff',
    fontSize: 30,
    backgroundColor: '#272727',
    textAlign: 'center',
  },


});