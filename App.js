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
//import console = require('console');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  state = {
    Fact : "",
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
        if(response.language == "en" || response.language == "cz"){
          this.setState({Fact : response.text,Loading: false});
        }else{
          this.getRandomfact();
        }
      }).catch(error =>{
        SimpleToast.show("Error getting random Facts, please Try again",SimpleToast.LONG);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{this.state.Fact}</Text>
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
