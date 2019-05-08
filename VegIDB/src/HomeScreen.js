import React, {Component} from 'react';
import {FlatList, ImageBackground, AsyncStorage, Dimensions, ScrollView, Image, StyleSheet, WebView, Button, TouchableOpacity, View, Text} from 'react-native';
import ActionButton from 'react-native-action-button';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Icon from 'react-native-vector-icons/Ionicons';
import {getDailyTip} from './DailyTips';
import {WeatherScreen} from './Weather';
import { connect } from 'react-redux';

import { selectedUser } from './actions/index';

const DeviceWidth = Dimensions.get('window').width;
const scaleVal = 0.4;

var months =["Jan", "Feb", "March",
             "April", "May", "June",
             "July", "August", "September",
             "October", "November", "December"];

class HomeScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props)

        this.state = {
            check : false,
            date: '',
            dailyTip: '',
            userName: '',
        }
    }

    //get userID from token
    componentWillMount(){
        var name = this.props.selectedUser("5cd256b43405bf42d8628b43").name;
        console.log("here");
        console.log(name);
        var that = this;
        var date = new Date().getDate(); //Current day
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        that.setState({
          date:
            months[month - 1] + ' ' + date + 'th, ' + year,
          dailyTip: getDailyTip(),
          userName: name,
        });
    }

    renderWebView(){
        if(this.state.check){
            return(
                <WebView
                source={{uri: 'https://stackoverflow.com/questions/41236255/open-webview-on-touchableopacity-onpress-react-native'}}
                style={{marginTop: 20}}
                />
            );
            }else {
            return(
                <TouchableOpacity
                onPress={()=>this.setState({check: true})}>
                    <Text style={{fontSize: 50}}>News</Text>
                </TouchableOpacity>
            );
        }
    }

    handleClick = (data) => {
        this.props.navigation.navigate(data);
    }

    signOutAsync = async() => {
        console.log("loggin you out");
        console.log("here: ");
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Auth');
    };

    render() {

        return (
        <View>
            <ScrollView style={{backgroundColor:'white'}}>
                <ImageBackground
                source={require('./Images/homeBack.jpg')}
                style={styles.picture}
                >
                <FlatList
                    data={this.props.user}
                    renderItem={({item}) => <View> <Text>hewo {item}</Text> </View>}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style ={styles.col}>
                     <View style={{flex:1, flexDirection:'row'}}>
                         <View style={styles.plantTitleBox}>
                            <Text style ={[styles.plantTitle]}>
                               Welcome Home, {" "}
                            </Text>
                            <Text style ={[styles.plantTitle, {color: 'green'}]}>
                                {this.state.userName}
                            </Text>
                         </View>

                         <View style={{flex:1, overflow:'hidden', marginRight: 3}}>
                            <Image style={[styles.picture, {resizeMode: 'contain'}]} source={require('./Images/sunGIF.gif')}/>
                         </View>
                     </View>
                    <View style={styles.dateBox}>
                        <ImageBackground
                        source={require('./Images/spring.jpg')}
                        style={styles.picture}
                        >
                            <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
                                <Text style ={styles.dateIntroText}> Today is </Text>
                                <Text style ={styles.dateText}> {this.state.date} </Text>
                            </View>
                        </ImageBackground>
                    </View>

                     <View style={styles.plantBox}>
                         <View style={styles.dailyTipBox}>
                              <ImageBackground
                              source={require('./Images/quoteBack.png')}
                              style={styles.picture}
                              >
                                  <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
                                      <Text style ={[styles.dailyTip, {fontSize: 22}, {textAlign: 'left'}]}> Daily Tip: </Text>
                                      <Text style ={styles.dailyTip}> {this.state.dailyTip} </Text>
                                  </View>
                              </ImageBackground>
                          </View>
                         <View style={styles.weatherBox} >
                            <WeatherScreen />
                         </View>

                         <View style={styles.plantRowBox}>
                              <ImageBackground
                              source={require('./Images/rowPlants.png')}
                              style={styles.picture}
                              >
                              </ImageBackground>
                          </View>
                     </View>
                 </View>
                </ImageBackground>
            </ScrollView>

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
                                    <TouchableOpacity onPress={() => this.handleClick('Plants')}>
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
                                    <TouchableOpacity onPress={() => this.signOutAsync()}>
                                        <View style={[styles.fourSquare, {marginLeft: 1}, {backgroundColor: 'red'}, {borderBottomRightRadius: 10}]} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                 </SlidingUpPanel>
             </View>
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
    },
    fourSquare1: {
        width: DeviceWidth*scaleVal,
        height: DeviceWidth*scaleVal,
        marginBottom:1,
        backgroundColor: 'blue'
    },
    dailyTipBox: {
        flex:1,
        height: 190,
        marginTop: 10,
        borderRadius: 8,
        overflow:'hidden',
        justifyContent: 'center',
    },
    plantRowBox: {
        height: 190,
        marginTop: 10,
        borderRadius: 8,
        overflow:'hidden',
        justifyContent: 'center',
    },
    dailyTip: {
        fontFamily: 'OrangeBlossoms',
        color: 'black',
        fontSize: 35,
        textAlign: 'center'
    },
    headerText: {
        fontFamily: 'Roboto',
        fontSize: 30,
        color: 'black',
        textAlign:'left',
        color: 'white',
        marginLeft: 10,
        marginTop: 10,
        fontWeight: 'bold'
    },
    plantBox: {
        flex:1,
        backgroundColor: 'transparent'
    },
    plantTitleBox: {
        marginTop: 45,
        height: 120,
        borderRadius: 8,
        marginLeft: 5,
        justifyContent: 'flex-start',
    },
    weatherBox: {
        height: 248,
        width: DeviceWidth,
        borderRadius: 8,
    },
    dateBox: {
        height: 250,
        margin: 10,
        marginBottom: 0,
        overflow: 'hidden',
        borderRadius: 8,
        backgroundColor: 'pink',
        justifyContent: 'center',
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
        fontFamily: 'OrangeBlossoms',
        fontSize: 45,
        textAlign:'left',
        color: 'black',
    },
    dateText: {
        fontFamily: 'Leixo',
        fontSize: 40,
        color: 'white',
    },
    dateIntroText: {
            fontFamily: 'Leixo',
            fontSize: 30,
            color: 'white',
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

const mapStateToProps = state => {
    return {
        people: state.people,
        detailView: state.detailView
    }
}
export default connect(mapStateToProps, { selectedUser })(HomeScreen);