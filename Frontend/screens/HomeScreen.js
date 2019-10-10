import React from 'react';

import {
  StyleSheet,
  View,
  Platform,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';

import * as Location from 'expo-location';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import MapView from 'react-native-maps';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const { width, height } = Dimensions.get("window");

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;

// para acercar el zoom del mapa
const LATITUDE_DELTA = 0.004757;
const LONGITUDE_DELTA = 0.006866;
// para acercar el zoom del mapa

const { width: WIDTH } = Dimensions.get('window');

var box_count = 3;
var box_height = height / box_count;


import { LocationButton } from '../components/LocationButton';
import ScooterLocation from '../components/ScooterLocation';

import MenuBottom from '../components/MenuBottom';
import ScannerButtom from '../components/ScannerButtom';
import AsistenciaButtom from '../components/AsistenciaButtom';
import Menu from '../Details/Menu';
// import CodigoQR from '../components/CodigoQR';


export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      informacion: null,

      location: null,
      errorMessage: null,
      loading: true,
      loadingMap: false,

      positionState: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },

      markerPosition: {
        latitude: 0,
        longitude: 0
      }
    };

  }



  // state = {
  //   location: null,
  //   errorMessage: null,
  //   loading: true,
  //   loadingMap: false,
  //   positionState: {
  //     latitude: 0,
  //     longitude: 0,
  //     latitudeDelta: 0,
  //     longitudeDelta: 0
  //   },

  //   markerPosition: {
  //     latitude: 0,
  //     longitude: 0
  //   }
  // };

  _getInformacion() {


    if (this.props.navigation.state.params) {
      this.state.informacion = this.props.navigation.state.params.informacion;
      // scaner = "wena";

    } else {
      // console.log("se salio");
    }

  }


  async componentWillMount() {
    Location.setApiKey('AIzaSyAHSZHScQK-AslKB8QSIyDfqwGc2adFaUM');
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      await this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync(
      {
        enableHighAccuracy: true, timeout: 20000, maxiumumAge: 1000
      });
    this.setState({ location });
    var lat = parseFloat(location.coords.latitude);
    var long = parseFloat(location.coords.longitude);


    var region = {
      latitude: lat,
      longitude: long,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };
    this.setState({ positionState: region });
    this.setState({ markerPosition: region });

  }

  componentDidUpdate() {
    if (this.state.positionState.latitude !== '0') {
      this.state.loadingMap = true;
      this.state.loading = false;
    }
  }

  centerMap() {
    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta } = this.state.positionState;

    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    })

  }

  render() {
    return (

      this._getInformacion(),

      <View style={styles.container}>
        <View style={styles.box1}>
          <LocationButton cb={() => { this.centerMap() }} />

          {this.state.loadingMap &&
            // esto tambien ve la localizacion de mi, va dentro de mapview
            // showsUserLocation loadingEnabled

            <MapView style={styles.map} initialRegion={this.state.positionState} ref={(map) => { this.map = map }} >
              <MapView.Marker coordinate={this.state.markerPosition}>
                <View style={styles.radius}>
                  <View style={styles.marker} />
                </View>
              </MapView.Marker>

              <ScooterLocation driver={{
                uid: 'null', location: {
                  latitude: -38.7239877,
                  longitude: -72.557905,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.05606756756756757,
                }
              }} />

              {/* {scaner ? (
                <Menu />
              ) : (
                  <Menu />
                )} */}

            </MapView>

          }
          {this.state.loading &&
            <View style={styles.loading}>
              <ActivityIndicator size='large' />

            </View>

          }

          <View style={styles.allNonMapThings}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Cartera')}>
              <View style={styles.box4}>
                <View >
                  <Text style={styles.buttonText} >
                    Mi cartera
                    </Text>
                </View>
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
                  <Entypo name='wallet' color='#47E245' size={20} style={styles.inputIconStyle} />
                </View>
              </View>
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.box3}>

          <MenuBottom navigation={this.props.navigation} />

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('CodigoQR')}
            style={{
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              backgroundColor: '#fff',
              borderRadius: 50,
              padding: 10,
            }}
          >
            <MaterialCommunityIcons name={"qrcode-scan"} size={50} color="#47E245" />

          </TouchableOpacity>

          {/* <AsistenciaButtom/> */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Asistencia')}
            style={{
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              height: 50,
              backgroundColor: '#fff',
              borderRadius: 50,
              left: 50,
            }}
          >
            <Entypo name={"help"} size={30} color="#000000" />
          </TouchableOpacity>

        </View>

        {/* <Text>{this.state.informacion}!</Text> */}


      </View>
    );
  }
}

// HomeScreen.navigationOptions = {
//   title: 'Ubicación',
//   headerStyle: {
//       backgroundColor: '#329BCB',
//   },
//   headerTintColor: '#fff',
//   headerTitleStyle: {
//       fontWeight: 'bold',
//       textAlign: "center",
//       flex: 1
//   },

// };


const styles = StyleSheet.create({

  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'normal',
  },

  button: {
    elevation: 1,
    position: 'absolute',
    bottom: 25,
    //bottom: 450,
    backgroundColor: '#47E245',
    borderRadius: 10,
    width: '45%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowColor: 'gray',
    shadowOffset: { height: 0, width: 0 },
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },

  allNonMapThings: {
    alignItems: 'center',
    marginTop: 25,
    //marginBottom: 0,
    // height: '100%',
    // width: '100%'
  },

  saldo: {
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
  },

  loginBtnStyle: {
    //width: Dimensions.get("window").width,
    //width: WIDTH - 55,
    height: 45,
    //alignItems: 'center',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    backgroundColor: '#339FFF',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
    width: 150,
    //marginTop: 100,
  },

  textBtnStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',

  },

  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },

  marker: {
    height: 20,
    width: 20,
    overflow: 'hidden',
    backgroundColor: '#007AFF',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
  },

  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    //marginBottom: 100,
    justifyContent: 'flex-end',
    //marginBottom: 30,
    //flexDirection: 'column',
    marginTop: StatusBar.currentHeight,

  },

  map: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 80,
    // right: 0,
    //marginTop: 15,
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width, //full width
  },

  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

  // contenedores////
  box: {
    height: box_height
  },
  box1: {
    flex: 10,
  },
  box3: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1.4,
    marginBottom: 30,

    //backgroundColor: '#FFFFFF',
    //width: Dimensions.get('window').width, 
  },

  box4: {
    alignItems: 'center', 
    flexDirection: 'row',
    //flex: 1.4,
    // marginBottom: 30,

    //backgroundColor: '#FFFFFF',
    //width: Dimensions.get('window').width, 
  }

});