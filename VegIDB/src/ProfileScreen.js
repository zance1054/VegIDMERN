import React, { Component } from 'react';
import { ImageBackground, ScrollView, Image, StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';
import {Alert, AppRegistry, Platform, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { selectedUser } from './actions/userActions';

class ProfileScreen extends Component {

    //Constructor
    constructor(props){
        super(props);
        this.editUser = this.editUser.bind(this);
    }

    //Rids of the header
    static navigationOptions = {
        header: null
    };

    //OnClick, navigates you to the EditProfile Form
    editUser(user){
        console.log(user.name);
        this.props.navigation.navigate('EditProfile', {user});
    }

    //Renders the views
    render() {
        const { navigation } = this.props;
        //User is here
        //const User = navigation.getParam('user', 'NO-ID');
        const user = {name: "HOLLYHOES"}


        return (
            <ScrollView style={{backgroundColor:'white'}}>
                <ImageBackground
                source={require('./Images/homeBack.jpg')}
                style={styles.picture}
                >
                <View style ={styles.col}>
                     <View style={{flex: 1, marginTop: 30}}>
                        <TouchableOpacity onPress={() => this.editUser(user)}>
                            <Text style={styles.editButton}> EDIT </Text>
                        </TouchableOpacity>
                     </View>
                     <View style={styles.pictureBox}>
                        <View style={styles.circleImageBox}>
                            <Image
                                source={require('./Images/plant-3.jpg')}
                                style={styles.picture}
                                />
                        </View>

                        <View style={styles.row}>
                            <View style={[styles.userDetailsBox, {borderLeftWidth: 0}, {borderLeftColor: 0}]}>
                                <Text style={{textAlign:'center', color: 'black', fontSize: 20}}>12</Text>
                                <Text style={{textAlign:'center', color: 'black', fontSize: 14}}>P L A N T S</Text>
                            </View>
                            <View style={styles.userDetailsBox}>
                                <Text style={{textAlign:'center', color: 'black', fontSize: 20}}>5</Text>
                                <Text style={{textAlign:'center', color: 'black', fontSize: 14}}>F A V O R I T E S</Text>
                            </View>
                            <View style={styles.userDetailsBox}>
                                <Text style={{textAlign:'center', color: 'black', fontSize: 20}}>5</Text>
                                <Text style={{textAlign:'center', color: 'black', fontSize: 14}}>D E A D</Text>
                                <Text style={{textAlign:'center', color: 'black', fontSize: 14}}>P L A N T S</Text>
                            </View>
                        </View>

                     </View>

                     <View style={styles.UserBox}>
                         <View style={styles.UserTitleBox}>
                            <Text style ={[styles.UserTitle,{textAlign: 'left'}, {marginLeft: 10}, {fontWeight: 'bold'}]}> {user.name} </Text>
                            <Text style ={[styles.UserTitle,{textAlign: 'left'}, {marginLeft: 15}, {color: 'gray'}, {fontSize: 20}]}> Expert Gardener </Text>
                         </View>
                         <View style={[styles.UserTitleBox, {height: 110}, {backgroundColor: 'rgba(124,85,0,.1)'}]}>
                             <Text style ={[styles.UserSubTitle,{textAlign: 'left'}, {marginLeft: 10}, {fontWeight: 'bold'}]}> About </Text>
                             <Text style ={styles.UserDescription}>
                                Hey everyone! I am a friendly gardener who is here to be fun! Water my plants.
                             </Text>
                         </View>
                     </View>

                 </View>
                 </ImageBackground>
            </ScrollView>
        );
    }
}

//Styling for all of out views
const styles = StyleSheet.create({
    picture: {
        flex:1,
        resizeMode: 'cover',
        alignItems: 'center',
        height: undefined,
        width: undefined
    },
    editButton: {
        fontSize:20,
        marginRight: 10,
        textAlign: 'right',
    },
    circleImageBox: {
        height: 200,
        width: 200,
        overflow: 'hidden',
        borderRadius: 200/2,
    },
    pictureBox: {
        height: 300,
        overflow: 'hidden',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
    },
    userDetailsBox: {
        alignItems:'center',
        justifyContent:'center',
        height: 50,
        width: 120,
        borderLeftWidth: 1,
        borderLeftColor: 'black'
    },
    UserBox: {
        height: 300,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,0.7)',
    },
    UserTitleBox: {
            height: 85,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            borderRadius: 8,
            backgroundColor: 'rgba(255,255,255,.7)'
    },
    col:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    row:{
        flexDirection: 'row',
    },
    picture: {
            flex:1,
            resizeMode: 'cover',
            alignItems: 'center',
            height: undefined,
            width: undefined,
        },
    UserTitle: {
        fontFamily: 'Leixo',
        fontSize: 30,
        color: 'black',
        textAlign:'center',
        color: 'green',

    },
    UserSubTitle: {
        fontFamily: 'Roboto',
        fontSize: 25,
        color: 'black',
        textAlign:'left',

    },
    UserDescription: {
        fontFamily: 'Roboto',
        fontSize: 15,
        color: 'black',
        textAlign:'left',
        marginLeft: 10
    }
});

const mapStateToProps = state => {
    return {
        people: state.people,
    }
}
export default connect(mapStateToProps, { selectedUser })(ProfileScreen);