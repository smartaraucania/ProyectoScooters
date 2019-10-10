/*Example of Collapsible - Accordion - Expandable View in React Native*/
import React, { Component } from 'react';
//import react in our project
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Switch,
} from 'react-native';
//import basic react native components
import * as Animatable from 'react-native-animatable';
//import for the animation of Collapse and Expand

//import for the collapsible/Expandable view
import Accordion from 'react-native-collapsible/Accordion';
//import for the Accordion view

import Icon from 'react-native-vector-icons/Entypo';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import Textarea from 'react-native-textarea';


var colorTextInput = '#D9D9D9';
const { width: WIDTH } = Dimensions.get('window');

//Dummy content to show
//You can also use dynamic data by calling web service
const CONTENT = [
  {
    title: 'Pregunta 1',
    content:
      'Lorem Ipsum es simplemente un texto ficticio de la industria de impresión y composición tipográfica. Lorem Ipsum ha sido el texto ficticio estándar de la industria desde el año 1500, cuando una impresora desconocida tomó una galera de tipo y la mezcló para hacer un libro de muestras.',
  },
  {
    title: 'Pregunta 2',
    content:
      'Ha sobrevivido no solo cinco siglos, sino también el salto a la composición electrónica, permaneciendo esencialmente sin cambios. Se popularizó en la década de 1960 con el lanzamiento de las hojas de Letraset que contienen pasajes de Lorem Ipsum, y más recientemente con software de publicación de escritorio como Aldus PageMaker, incluidas las versiones de Lorem Ipsum.',
  },
  {
    title: 'Pregunta 3',
    content:
      'Contrariamente a la creencia popular, Lorem Ipsum no es simplemente un texto aleatorio. Tiene raíces en una pieza de literatura latina clásica del 45 a. C.,',
  },
  {
    title: 'Pregunta 4',
    content:
      'Lorem Ipsum proviene de las secciones 1.10.32 y 1.10.33 de "de Finibus Bonorum et Malorum" (Los extremos del bien y del mal) de Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado sobre la teoría de la ética, muy popular durante el Renacimiento. La primera línea de Lorem Ipsum',
  },
  {
    title: 'Pregunta 5',
    content:
      'Hay muchas variaciones de pasajes de Lorem Ipsum disponibles, pero la mayoría ha sufrido alteración de alguna forma, por humor inyectado o palabras aleatorias que ni siquiera parecen un poco creíbles. Si va a utilizar un pasaje de Lorem Ipsum, debe asegurarse de que no haya nada vergonzoso oculto en medio del texto.',
  },

];

export default class AsistenciaScreen extends React.Component {
  state = {
    //default active selector
    activeSections: [],
    //collapsed condition for the single collapsible
    collapsed: true,
    //multipleSelect is for the Multiple Expand allowed
    //true: You can expand multiple at a time
    //false: One can be expand at a time and other will be closed automatically
    multipleSelect: false,
    switchValue: false,

  };

  toggleSwitch = value => {
    //onValueChange of the switch this function will be called
    this.setState({ switchValue: value });
    //state changes according to switch
    //which will result in re-render the text
  };

  toggleExpanded = () => {
    //Toggling the state of single Collapsible
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = sections => {
    //setting up a active section state
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    //Accordion Header view
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Text style={styles.headerText}>{section.title} </Text>
        <Icon name='chevron-thin-down' color='#464646' size={20} style={styles.IconStyle} />
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    //Accordion Content view
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Animatable.Text
          animation={isActive ? 'bounceIn' : undefined}
          style={{ textAlign: 'left'}}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  render() {
    const { multipleSelect, activeSections } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView >
          <View style={styles.tituloPContainer}>
            <Text style={styles.tituloPrincipalTextStyle}>Preguntas Frecuentes</Text>
          </View>

          {/*Code for Accordion/Expandable List starts here*/}
          <Accordion
            activeSections={activeSections}
            //for any default active section
            sections={CONTENT}
            //title and content of accordion
            touchableComponent={TouchableOpacity}
            //which type of touchable component you want
            //It can be the following Touchables
            //TouchableHighlight, TouchableNativeFeedback
            //TouchableOpacity , TouchableWithoutFeedback
            expandMultiple={multipleSelect}
            //Do you want to expand mutiple at a time or single at a time
            renderHeader={this.renderHeader}
            //Header Component(View) to render
            renderContent={this.renderContent}
            //Content Component(View) to render
            duration={400}
            //Duration for Collapse and expand
            onChange={this.setSections}
          //setting the state of active sections
          />
          {/*Code for Accordion/Expandable List ends here*/}


          <View style={styles.switchContainer}>

            <View style={{ width: '80%', height: 1, backgroundColor: '#329BCB', marginTop: 30 }} />

            {/* <Text style={{ marginTop: 20 }}>
              {this.state.switchValue ? 'Switch is ON' : 'Switch is OFF'}</Text>
            
            <Switch
              style={{ marginTop: 30 }}
              onValueChange={this.toggleSwitch}
              value={this.state.switchValue}
            /> */}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textStyle}>Para mayor información contáctenos</Text>
          </View>


          <View style={styles.inputContainer}>

            <TextInput
              style={styles.inputStyle}
              placeholder={'Nombre'}
              placeholderTextColor={colorTextInput}
              underlineColorAndroid='transparent'
            />
            <IconAwesome name='drivers-license' color='#464646' size={20} style={styles.inputIconStyle} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputStyle}
              placeholder={'Apellido'}
              placeholderTextColor={colorTextInput}
              underlineColorAndroid='transparent'
            />
            <IconAwesome name='drivers-license' color='#464646' size={20} style={styles.inputIconStyle} />
          </View>


          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputStyle}
              placeholder={'Email'}
              placeholderTextColor={colorTextInput}
              underlineColorAndroid='transparent'
            />
            <IconEntypo name='email' color='#464646' size={20} style={styles.inputIconStyle} />
          </View>

          <View style={styles.containerArea}>
            <Textarea
              containerStyle={styles.textareaContainer}
              style={styles.textarea}
              onChangeText={this.onChange}
              defaultValue={this.state.text}
              maxLength={120}
              placeholder={'Escriba aquí su pregunta...'}
              placeholderTextColor={'#c7c7c7'}
              underlineColorAndroid={'transparent'}
            />
          </View>

          <View style={styles.botonContainer}>
            <TouchableOpacity style={styles.finalizarBtnStyle} onPress={this.loginBtn}>
              <Text style={styles.textBtnStyle}>Enviar</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: '80%', height: 40, backgroundColor: '#FFFFFF', marginTop: 5 }} />

        </ScrollView>
      </View>
    );
  }
}

AsistenciaScreen.navigationOptions = {
  title: 'ASISTENCIA',
  headerStyle: {
      backgroundColor: '#329BCB',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: "center",
      flex: 1
  },

};

const styles = StyleSheet.create({

  inputContainer: {
    marginTop: 30,
  },

  inputStyle: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 5,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: '#F2F2F2',
    marginHorizontal: 25,
  },

  inputIconStyle: {
    position: 'absolute',
    top: 12,
    left: 34,
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },

  IconStyle: {
    position: 'absolute',
    top: 5,
    right: 20,

  },

  header: {
    backgroundColor: '#F5FCFF',
    //padding: 1,
  },
  headerText: {
    //textAlign: 'left',
    paddingLeft: 10,
    fontSize: 20,
    //fontWeight: '500',
    backgroundColor: '#F2F2F2',
    //borderBottomWidth: 1,
    borderTopWidth: 1,
    height: 40,
    color:'#959595',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },



  // text area //

  containerArea: {
    flex: 3,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textareaContainer: {
    height: 180,
    padding: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    width: WIDTH - 55,

  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },

  // boton // 

  botonContainer: {
    alignItems: 'center',
    flex: 3,
    marginTop: 20,
  },

  finalizarBtnStyle: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 5,
    backgroundColor: '#339FFF',
    justifyContent: 'center',
    //marginTop: 25,
  },

  textBtnStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',

  },

  // switch //

  switchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // textos // 

  textStyle: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'center',




    //color: '#959595',
    //fontSize: 25,
    //textAlign: 'center',
    fontWeight: 'bold',
  },

  // texto principal // 

  tituloPrincipalTextStyle: {
    color: '#959595',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tituloPContainer: {
    marginTop: 5,
    marginBottom: 20,
  },


});