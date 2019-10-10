import React from 'react';
import { Button, View, Text, StatusBar } from 'react-native';


export default class Historial extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //imc: this.props.navigation.state.params.imc ,
      informacion: this.props.navigation.state.params.informacion,
    };

  }


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#64E74A', marginTop: StatusBar.currentHeight }}>
        <Text>wena wena {this.state.informacion}!</Text>
        {/* <Button
          title="Activar Lector QR"
          onPress={() => this.props.navigation.navigate('Details')}
        /> */}
      </View>
    );
  }
}