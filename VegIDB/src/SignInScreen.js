import React, {Component} from 'react';
import {AsyncStorage, Button, View} from 'react-native';

export class SignInScreen extends Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  /* I assume that onPress, call a function that verifies with mongo the user details.
  If it's correct, THEN it'll call _signInAsync. There is also a signOutAsync function in the example
  https://snack.expo.io/@react-navigation/auth-flow-v3

  there is a getUserID() query Alec designed.
  */

  render() {
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abcdefg');
    this.props.navigation.navigate('App');
  };
}