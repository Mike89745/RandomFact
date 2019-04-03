/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
import SimpleToast from "react-native-simple-toast"
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
//import console = require('console');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
TranslatorConfiguration.setConfig(ProviderTypes.Google, 'AIzaSyDjpHuUZ2gA_ZWjAyDBtoQhWoecxeTpQ6c','cs');
const translator = TranslatorFactory.createTranslator();
export default class App extends Component {
  state = {
    Fact : "",
    OrginalFact : "",
    Loading : false
  }
  componentDidMount(){
    this.getRandomfact();
  }
  getRandomfact(){
    this.setState({Loading : true});
    fetch("http://randomuselessfact.appspot.com/random.json").then(response =>{
        return response.json()
      }).then((response) => {
        console.log(response);
        translator.translate(response.text).then(translatedText=>{
          this.setState({Fact : translatedText,Loading: false,OrginalFact: response.text});
        }).catch(error =>{
          console.log(error);
          SimpleToast.show("Error translatin fact",SimpleToast.LONG);
        })
      }).catch(error =>{
        SimpleToast.show("Error getting random Facts, please Try again",SimpleToast.LONG);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Originalní text</Text>
        <Text style={styles.instructions}>{this.state.OrginalFact}</Text>
        <Text>Přeložený text</Text>
        <Text style={styles.instructions}>{this.state.Fact}</Text>
        <Button style={styles.instructions} onPress={( ) => this.getRandomfact()} title={"Next random fact"} disabled={this.state.Loading}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
