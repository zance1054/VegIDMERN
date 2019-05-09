import React, { Component } from 'react';

//Weather module
import {  StyleSheet, View, Text, FlatList, Dimensions, Button, Image, ImageBackground } from 'react-native';
//import ForecastCard from './components/ForecastCard';
//import { API_KEY } from './utils/WeatherAPIKey';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Svg, {Text as SvgText} from 'react-native-svg';
import ActionButton from 'react-native-action-button';
import {Alert, AppRegistry, Platform, TouchableOpacity} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Ionicons';
import { PlantsResultsScreen } from './PlantsResultsScreen';

import {SearchBar} from 'react-native-elements';

const DeviceWidth = Dimensions.get('window').width;
const scaleVal = 0.4;

import { connect } from 'react-redux';
import {loadInitialPlants, selectedUser} from './actions/index';

// project ID = 5c92bc84f2a30baf4b46fea1
//import { findFirst1 } from './Queries/findDB';


export class SlideMenu extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        handleClick = (data) => {
                this.props.navigation.navigate(data);
        }

        _signOutAsync = async() => {
            await AsyncStorage.remove('userToken');
            this.props.navigation.navigate('Auth');
        };

        return (
          <View style={{flex:1, backgroundColor: 'transparent'}}>
          <ActionButton onPress={() => this._panel.show() }
                    buttonColor="rgba(0,66,14,1)"
                    position="center"
                    offsetY={8}
                    />

            <SlidingUpPanel
                            allowDragging = {false}
                            ref={c => this._panel = c}>
                           <View style={styles.fourSquareMenuContainer}>
                                   <View style={styles.fourSquareMenuRow}>
                                       <View>
                                           <TouchableOpacity onPress={() => this.handleClick('Camera')}>
                                               <View style={[styles.fourSquare, {borderTopLeftRadius: 10}]}>
                                                   <Text style={{textAlign:'center'}}> CAMERA </Text>
                                                   <Icon name = "rocket" size = {DeviceWidth*scaleVal} color="#900" />
                                               </View>
                                           </TouchableOpacity>
                                           <TouchableOpacity onPress={() => this.handleClick("Plants")}>
                                               <View style={[styles.fourSquare, {borderBottomLeftRadius: 10}]}>
                                               </View>
                                           </TouchableOpacity>
                                       </View>
                                       <View>
                                           <TouchableOpacity onPress={() => this.handleClick('Plants')}>
                                               <View style={[styles.fourSquare, {marginLeft: 1}, {borderTopRightRadius: 10}]} />
                                           </TouchableOpacity>
                                           <TouchableOpacity onPress={() => this._signOutAsync()}>
                                               <View style={[styles.fourSquare, {marginLeft: 1}, {backgroundColor: 'red'}, {borderBottomRightRadius: 10}]} />
                                           </TouchableOpacity>
                                       </View>
                                   </View>
                               </View>
                        </SlidingUpPanel>
            </View>
        )
      }

}

export class PlantsScreen extends Component {
    //Rids of a header
    static navigationOptions = {
        header: null
    };

    //Constructor
    constructor(props){
        super(props)
        this.state = {
            items: []
        }
    }

    //After the components mount, set the objects for our plants
    componentDidMount(){
        this.setState({items:
            [
                { id: 0, name: 'Cactus', image: './Images/cactus.jpg', code: '#1abc9c', liked: true }, { id: 1, name: 'Cactus', image: './Images/cactus1.jpg', code: '#2ecc71',liked: false },
                { id: 2, name: 'Lily', image: './Images/lily.jpg', code: '#3498db',liked: false }, { id: 3,name: 'Cactus', image:'/Images/cactus3.jpg', code: '#9b59b6',liked: false },
                { id: 4, name: 'Shrub', image: './Images/shrub.jpg', code: '#34495e',liked: false }, { id: 5, name: 'Dandelion', image: '/Images/dandelion.jpg', code: '#324222', liked: false },
                { id: 6, name: 'Tree', image: './Images/tree.jpg', code: '#27ae60',liked: false }, { id: 7, name: 'Tree', image:'./Images/tree2.jpg', code: '#2980b9',liked: false },
                { id: 12, name: 'ALIZARIN', code: '#e74c3c',liked: false }, { id: 13, name: 'CLOUDS', code: '#ecf0f1',liked: false },
                { id: 14, name: 'CONCRETE', code: '#95a5a6',liked: false }, { id: 15, name: 'ORANGE', code: '#f39c12',liked: false },
                { id: 16, name: 'PUMPKIN', code: '#d35400',liked: false }, { id: 17, name: 'POMEGRANATE', code: '#c0392b',liked: false },
                { id: 18, name: 'SILVER', code: '#bdc3c7',liked: false }, { id: 19, name: 'ASBESTOS', code: '#7f8c8d',liked: false },
                { id: 12, name: 'ALIZARIN', code: '#e74c3c',liked: false }, { id: 13, name: 'CLOUDS', code: '#ecf0f1',liked: false },
                { id: 14, name: 'CONCRETE', code: '#95a5a6',liked: false }, { id: 15, name: 'ORANGE', code: '#f39c12',liked: false },
                { id: 16, name: 'PUMPKIN', code: '#d35400',liked: false }, { id: 17, name: 'POMEGRANATE', code: '#c0392b',liked: false },
                { id: 18, name: 'SILVER', code: '#bdc3c7',liked: false }, { id: 19, name: 'ASBESTOS', code: '#7f8c8d',liked: false },
            ]
        });
    }

    //DATABASE: trigger !liked to show that we have FAVORITED or UNFAVORITED
    toggleLike = (item) => {
        let temp = this.state.items;
        temp[item.id].liked = !temp[item.id].liked;
        this.setState({items: temp});
    }

    //DATABASE: trigger !watered to show that we have watered the plant or unmark it
    toggleWater = (item) => {
        let temp = this.state.items;
        temp[item.id].watered = !temp[item.id].watered;
        this.setState({items: temp});
        //increment or decrement a water counter. if temp at ID is watered

    }

    //When uses presses a plant, navigates them to each plant's result screen
    handleClick = (item) => {
        this.props.navigation.navigate('PlantsResults', {item});
        //this.props.navigation.navigate('Home');
    }

    handleClickSquare = (data) => {
            this.props.navigation.navigate(data);
    }


    //Views of a grid of our plants with...
    //a card dedicated to a plant
    //a function to FAVORITE or LIKE a plant which puts it in your own repository
    //the ability to navigate to the plant's specific results page with its own information
    render() {
        //Need MongoDB Query to get this shit
        //List of JSON Objects

        //do item.liked
        return (
            <View style={{flex:1, backgroundColor: 'white'}}>
            <ImageBackground
            source={require('./Images/homeBack.jpg')}
            style={styles.picture}
            >
            <View style={styles.headerTitleBox}>
                <Text style ={[styles.headerTitle]}>
                   Your Plants
                </Text>
            </View>
            <FlatGrid
            itemDimension={130}
            items={this.state.items}
            style={styles.gridView}
            renderItem={({ item, index }) => (

            <TouchableOpacity onPress={() => this.handleClick(item)}>
                <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                <ImageBackground style ={styles.imageThumbnail} source={require('./Images/sunflower.jpg')} resizeMode='cover'>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <View style={{flex:1, alignItems: 'flex-end'}}>
                            <TouchableOpacity onPress={() => this.toggleLike(item)}>
                                <Image
                                  source={item.liked ? require('./Images/heart.png') : require('./Images/heart-outline.png')}
                                  style={{width: 30, height: 30, margin: 4}}
                                  resizeMode="cover"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.itemName}>{item.name}</Text>
                        </View>
                    </View>
                </ImageBackground>
                </View>
            </TouchableOpacity>

            )}
            />

                      <ActionButton onPress={() => this._panel.show() }
                                buttonColor="rgba(0,66,14,1)"
                                position="center"
                                offsetY={0}
                                />

                        <SlidingUpPanel
                                allowDragging = {false}
                                ref={c => this._panel = c}>
                               <View style={styles.fourSquareMenuContainer}>
                                       <View style={styles.fourSquareMenuRow}>
                                           <View>
                                               <TouchableOpacity onPress={() => this.handleClickSquare('Camera')}>
                                                   <View style={[styles.fourSquare, {borderTopLeftRadius: 10}]}>
                                                       <Text style={{textAlign:'center'}}> CAMERA </Text>
                                                   </View>
                                               </TouchableOpacity>
                                               <TouchableOpacity onPress={() => this.handleClickSquare("Plants")}>
                                                   <View style={[styles.fourSquare, {borderBottomLeftRadius: 10}]}>
                                                   </View>
                                               </TouchableOpacity>
                                           </View>
                                           <View>
                                               <TouchableOpacity onPress={() => this.handleClickSquare('Plants')}>
                                                   <View style={[styles.fourSquare, {marginLeft: 1}, {borderTopRightRadius: 10}]} />
                                               </TouchableOpacity>
                                               <TouchableOpacity onPress={() => this.handleClickSquare('Plants')}>
                                                   <View style={[styles.fourSquare, {marginLeft: 1}, {borderBottomRightRadius: 10}]} />
                                               </TouchableOpacity>
                                           </View>
                                       </View>
                                   </View>
                            </SlidingUpPanel>
            </ImageBackground>
            </View>
        );
    }
}

//Styling for our views
const styles = StyleSheet.create({
    headerTitleBox: {
        marginTop: 30,
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
    },
    headerTitle: {
        fontFamily: 'OrangeBlossoms',
        fontSize: 45,
        textAlign:'left',
        color: 'black',
    },
    picture: {
        flex:1,
        resizeMode: 'cover',
        alignItems: 'center',
        height: undefined,
        width: undefined
    },
  fourSquareMenuContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 10,
    marginBottom: 0,
  },
  fourSquareMenuRow: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: DeviceWidth,
    justifyContent: 'center'
    },
  fourSquare: {
      width: DeviceWidth*scaleVal,
      height: DeviceWidth*scaleVal,
      marginBottom:1,
      backgroundColor: 'powderblue'
  },
  fourSquare1: {
        width: DeviceWidth*scaleVal,
        height: DeviceWidth*scaleVal,
        marginBottom:1,
        backgroundColor: 'blue'
    },
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    position: 'absolute',
    bottom: 0,
    marginLeft: 5
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
    },
  imageThumbnail: {
    flex: 1,
    resizeMode: 'contain',
    borderRadius: 10,
    height: undefined,
    width: undefined,
    overflow: 'hidden',
    },
  backBox:{
    flex:1,
    height: 125,
    backgroundColor: 'gray',
  }
});


const mapStateToProps = state => {
    return {
        plants: state.plants,
    }
}
export default connect(mapStateToProps, { loadInitialPlants, selectedUser })(PlantsScreen);