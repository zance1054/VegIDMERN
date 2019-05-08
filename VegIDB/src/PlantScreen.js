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
                                                   <Text> CAMTONO BEAN </Text>
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

    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props)
        this.state = {
            items: []
        }
    }



    //DATABASE: GET ALL PLANTS : LIST OF PLANTS
    //Watered
    //Will mount: check state's previous date. If less than today's date, reset watered. else, ignore.
    componentDidMount(){
        this.setState({items:
            [
                { id: 0, name: 'TURQUOISE', code: '#1abc9c', liked: true }, { id: 1, name: 'EMERALD', code: '#2ecc71',liked: false },
                { id: 2, name: 'PETER RIVER', code: '#3498db',liked: false }, { id: 3,name: 'AMETHYST', code: '#9b59b6',liked: false },
                { id: 4, name: 'WET ASPHALT', code: '#34495e',liked: false }, { id: 5, name: 'GREEN SEA', code: '#16a085',liked: false },
                { id: 6, name: 'NEPHRITIS', code: '#27ae60',liked: false }, { id: 7, name: 'BELIZE HOLE', code: '#2980b9',liked: false },
                { id: 8, name: 'WISTERIA', code: '#8e44ad',liked: false }, { id: 9, name: 'MIDNIGHT BLUE', code: '#2c3e50',liked: false },
                { id: 10, name: 'SUN FLOWER', code: '#f1c40f',liked: false }, { id: 11, name: 'CARROT', code: '#e67e22',liked: false },
                { id: 12, name: 'ALIZARIN', code: '#e74c3c',liked: false }, { id: 13, name: 'CLOUDS', code: '#ecf0f1',liked: false },
                { id: 14, name: 'CONCRETE', code: '#95a5a6',liked: false }, { id: 15, name: 'ORANGE', code: '#f39c12',liked: false },
                { id: 16, name: 'PUMPKIN', code: '#d35400',liked: false }, { id: 17, name: 'POMEGRANATE', code: '#c0392b',liked: false },
                { id: 18, name: 'SILVER', code: '#bdc3c7',liked: false }, { id: 19, name: 'ASBESTOS', code: '#7f8c8d',liked: false },
            ]
        });
    }

    //DATABASE: trigger !liked
    toggleLike = (item) => {
        let temp = this.state.items;
        temp[item.id].liked = !temp[item.id].liked;
        this.setState({items: temp});
    }

    //DATABASE: trigger !watered
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

    hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
            a: .5
        } : null;
    }

    getRgb(json){
        var rgba = "rgba(" + json.r + "," + json.g + "," + json.b + "," + json.a + ")"
    }

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
                                                       <Text> CAMTONO BEAN </Text>
                                                       <Icon name = "rocket" size = {DeviceWidth*scaleVal} color="#900" />
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
