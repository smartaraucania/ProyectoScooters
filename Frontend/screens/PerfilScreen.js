import React from 'react';
import { TextInput, View, Text, StatusBar, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get("window");

import { KeyboardAvoidingView } from 'react-native';

export default class PerfilScreen extends React.Component {
  render() {
    return (

      <View style={styles.mainbody}>
        <View style={styles.header}>
          <FontAwesome5 style={styles.imgprofile} name={"user-circle"} size={80} color="#fff" />
          <Text style={styles.name}>
            Gabriel
          </Text>
          <Text style={styles.username}>
            gabriel.uribe.022@gmail.com
          </Text>
        </View>

        <KeyboardAvoidingView style={styles.container} behavior="padding">

          <View style={styles.itemprofile}>
            <FontAwesome5 style={styles.imgitem} name={"user-circle"} size={40} color="#000" />
            {/* <Image style={styles.imgitem} source={require("../assets/images/userName50.png")} /> */}
            <Text style={styles.labelitem} >
              Nombre
            </Text>
            <TextInput style={styles.sublabelitem} placeholder='nombreInput'>

            </TextInput>
          </View>

          <View style={styles.itemprofile}>
            <Foundation style={styles.imgitem} name={"telephone"} size={40} color="#000" />
            {/* <Image style={styles.imgitem} source={require("../assets/images/celular48.png")} /> */}
            <Text style={styles.labelitem} >
              Telefono
            </Text>
            <TextInput style={styles.sublabelitem} placeholder='telefonoInput'>

            </TextInput>
          </View>

          <View style={styles.itemprofile}>
            <MaterialCommunityIcons style={styles.imgitem} name={"email-outline"} size={40} color="#000" />
            {/* <Image style={styles.imgitem} source={require("../assets/images/userName50.png")} /> */}
            <Text style={styles.labelitem} >
              Email
            </Text>
            <TextInput style={styles.sublabelitem} placeholder='emailInput'>

            </TextInput>
          </View>

          {/* <View style={styles.boton}> */}
          <TouchableOpacity style={styles.btnGuardar}>
            <Text style={styles.labelBtn}>
              Guardar
            </Text>
          </TouchableOpacity>
          {/* </View> */}
        </KeyboardAvoidingView>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  name: {
    color: 'white',
    fontSize: 22,
    //marginLeft: 100,
    marginTop: 12,
  },

  mainbody: {
    flex: 1,
    // marginTop: 30,
    // marginLeft: 24,
    // marginRight: 24,
    // marginBottom: 70,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  imgprofile: {
    // marginLeft: 100,
    marginTop: 50,
    // height: 70,
    // width: 70
  },

  username: {
    color: 'white',
    fontSize: 16,
    //marginLeft: 110,
    marginTop: 4,
    marginBottom: 30,
    // alignItems: 'center',
    // justifyContent: 'center',

  },
  itemprofile: {
    marginTop: 30,
    marginLeft: 20,
    // flex: 2,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  labelitem: {
    marginTop: -45,
    marginLeft: 60,
    fontSize: 18,
    color: 'black'
  },
  sublabelitem: {
    marginTop: 4,
    marginLeft: 60,
    fontSize: 16,
    color: 'black',

  },
  btnGuardar: {
    width: '80%',
    height: 40,
    marginLeft: 35,
    marginTop: 70,
    borderRadius: 5,
    backgroundColor: '#28983C',
    alignItems: 'center',
    justifyContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  labelBtn: {
    color: '#FFFFFF',
    fontSize: 20,
    // fontWeight: 'bold'
  },
  imgitem: {
    //color: '#FFFFFF',
    //fontSize: 20,
    // fontWeight: 'bold'
  },
  header: {
    //width: '100%',
    height: 200,
    backgroundColor: '#28883A',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  boton: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  }

})



// <View style={styles.itemprofile}>
//           <FontAwesome5 style={styles.imgitem} name={"user-circle"} size={40} color="#000" />
//           {/* <Image style={styles.imgitem} source={require("../assets/images/userName50.png")} /> */}
//           <Text style={styles.labelitem} >
//             Apellido
//             </Text>
//           <Text style={styles.sublabelitem} >
//             apellidoInput
//             </Text>
//         </View>