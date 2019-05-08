import React, { Component } from 'react';
import { ImageBackground, ScrollView, Image, StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';
import {Alert, AppRegistry, Platform, TouchableOpacity} from 'react-native';
export class PlantsResultsScreen extends Component {

    constructor(props){
        super(props);
        this.editPlant = this.editPlant.bind(this);
        state:{
            plant: ''
        }
    }

    componentWillMount(){
        const { navigation } = this.props;
        const thePlant = navigation.getParam('item', 'NO-ID');
        this.setState({
            plant: thePlant
        });
    }
    static navigationOptions = {
            header: null
        };

    editPlant(plant){
        console.log(plant.id);
        console.log(plant.name);
        console.log(plant.code);
        this.props.navigation.navigate('UpdatePlantForm', {plant});
    }


    render() {


        return (
            <ScrollView style={{backgroundColor:'white'}}>
            <ImageBackground
            source={require('./Images/homeBack.jpg')}
            style={styles.picture}
            >
                <View style ={styles.col}>
                    <View style={{flex: 1, marginTop: 30}}>
                        <TouchableOpacity onPress={() => this.editPlant(this.state.plant)}>
                            <Text style={styles.editButton}> EDIT </Text>
                        </TouchableOpacity>
                     </View>
                     <View style={styles.pictureBox}>
                        <Image
                            source={require('./Images/plant-3.jpg')}
                            style={styles.picture}
                            />
                     </View>

                     <View style={styles.plantBox}>
                         <View style={styles.plantTitleBox}>
                            <Text style ={[styles.plantTitle,{textAlign: 'left'}, {marginLeft: 10}, {fontWeight: 'bold'}]}> {this.state.plant.name} </Text>
                            <Text style ={[styles.plantTitle,{textAlign: 'left'}, {marginLeft: 15}, {color: 'gray'}, {fontSize: 20}]}> Garden Plant </Text>
                         </View>
                         <View style={[styles.plantTitleBox, {height: 110}, {backgroundColor: '#ccb29d'}]}>
                             <Text style ={[styles.plantSubTitle,{textAlign: 'left'}, {marginLeft: 10}, {fontWeight: 'bold'}]}> About </Text>
                             <Text style ={styles.plantDescription}>
                                Lorem Ipsum suck a bitch motherfucker waht the fuck do you want I do gorilla warfare in the united states navy
                             </Text>
                         </View>
                     </View>

                 </View>
             </ImageBackground>
            </ScrollView>
        );
    }
}

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
    pictureBox: {
            height: 400,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor: 'steelblue'
        },
    plantBox: {
        height: 300,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 8,
        backgroundColor: 'rgba(155,106,0,.3)'
    },
    plantTitleBox: {
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

    picture: {
        flex:1,
        resizeMode: 'cover',
        alignItems: 'center',
        height: undefined,
        width: undefined
    },
    plantTitle: {
        fontFamily: 'Leixo',
        fontSize: 30,
        color: 'black',
        textAlign:'center',
        color: 'green',

    },
    plantSubTitle: {
        fontFamily: 'Roboto',
        fontSize: 25,
        color: 'black',
        textAlign:'left',

    },
    plantDescription: {
        fontFamily: 'Roboto',
        fontSize: 15,
        color: 'black',
        textAlign:'left',
        marginLeft: 10
    }
});