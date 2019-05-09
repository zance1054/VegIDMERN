import React, {Component} from 'react';
import {AsyncStorage, Button, View} from 'react-native';

export class SignInScreen extends Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

    //_signInAsync will access our asynchronous storage to get the user token
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