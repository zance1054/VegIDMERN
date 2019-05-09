import React, {Component} from 'react';
import { TouchableOpacity, ImageBackground, Image, ScrollView ,KeyboardAvoidingView, Alert, AppRegistry, StyleSheet, Text, View, TouchableHighlight } from 'react-native';

var t = require('tcomb-form-native');
var Form = t.form.Form;
// here we are: define your domain model
var User = t.struct({
  FirstName: t.String,
  LastName: t.String,
  Email: t.String,
  Password: t.String,
  AboutMe: t.String,
});


var options = {
    fields:{
        Email: {
            error: "Insert a valid email"
        },
        Password:{
            secureTextEntry: true
        },
        AboutMe:{
            multiline: true,
            numberOfLines: 4
        }
    }
};



export class NewUserForm extends Component {

  //DATABASE: CREATE NEW USER
  onPress=()=> {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of User
      console.log(value.UserName);
    }

  }

  //View for our Users
  render() {
    const { navigation } = this.props;

    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.pictureBox}>
            <Image
                source={require('./Images/plant-3.jpg')}
                style={styles.picture}
                />
            </View>
        <Form
          ref="form"
          type={User}
          options={options}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
        <View style={{height: 60}}/>
      </View>
      </ScrollView>
    );
  }
}

export class UpdateUserForm extends Component {

  //Updates the user OnClick
  onPress=()=> {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of User
      console.log(value.UserName);
    }
    Alert.alert("Profile Updated!");
    this.props.navigation.goBack();
  }

  render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user', 'NO-ID');
    //const user = {name: "UpdateUserForm"};
    const updateValue = {
        UserName: user.name,
    };

    //Returns a scrollview for our user form for update
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.pictureBox}>
            <ImageBackground
                source={require('./Images/plant-3.jpg')}
                style={styles.picture}
            >
            <TouchableOpacity onPress={()=> Alert.alert("hi")}>
            <View styles={{alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
                    <Text style={{borderWidth: 2, borderColor: 'white', color: 'white', fontSize: 25}}> EDIT PHOTO </Text>
                </View>
            </View>
            </TouchableOpacity>
            </ImageBackground>
        </View>
        <Form
          ref="form"
          type={User}
          options={options}
          value={updateValue}
        />
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
        <View style={{height: 60}}/>
      </View>
      </ScrollView>
    );
  }
}


//Styling
var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  pictureBox: {
      height: 200,
      margin: 10,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: 'steelblue'
  },
  picture: {
      flex:1,
      resizeMode: 'cover',
      alignItems: 'center',
      height: undefined,
      width: undefined
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});