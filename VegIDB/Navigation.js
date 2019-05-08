import React, {Component} from 'react';

import {
Button,
ActivityIndicator,
AsyncStorage,
StatusBar,
AppRegistry,
View,
TouchableOpacity }
from 'react-native';

import {
createBottomTabNavigator,
createStackNavigator,
createAppContainer,
createDrawerNavigator,
createSwitchNavigator } from 'react-navigation';

//import {CameraScreen} from './src/CameraScreen';
import {WeatherScreen} from './src/Weather';
import {LoginScreen} from './src/LoginScreen';
import {PlantsResultsScreen} from './src/PlantsResultsScreen';
import {InsertPlantForm, UpdatePlantForm} from './src/PlantForm';
import { NewUserForm, UpdateUserForm } from './src/UserForm';
import {StatsScreen} from './src/StatsScreen';
import {SignInScreen} from './src/SignInScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/HomeScreen';
import PlantsScreen from './src/PlantScreen';
import ProfileScreen from './src/ProfileScreen';



const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        //Menu: SlideMenu,
        //Home: LoginScreen,
        //Camera: CameraScreen
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'transparent',
            },
        }
    }
);

const PlantStack = createStackNavigator({
        Plants: PlantsScreen,
        PlantsResults: PlantsResultsScreen,
        UpdatePlantForm: UpdatePlantForm

    },
    {
    }
);

const ProfileStack = createStackNavigator({
        Profile: ProfileScreen,
        EditProfile: UpdateUserForm
    },
    {
    }
);

const StatsStack = createStackNavigator({
        Statistics: StatsScreen,
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'transparent',
            },
        }
    }
);

const AuthStack = createStackNavigator({
        SignIn: SignInScreen,
        //Forgot Password:
});

class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const BottomTabNavigator = createBottomTabNavigator({
    Home: HomeStack,
    Plants: PlantStack,
   // Camera: CameraStack,
    Profile: ProfileStack,
    Stats: StatsStack,

    },{
        navigationOptions: ({ navigation }) => ({

        //define the icon for each tab here...
        tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
    },
    }),
        tabBarOptions: {
            initialRouteName: 'Plants',
            style: {
                backgroundColor: 'white',
                color: 'white',
            }
    }
});


//disables the warnings
console.disableYellowBox=true;
export default createAppContainer(createSwitchNavigator(
{
    AuthLoading: AuthLoadingScreen,
    App: BottomTabNavigator,
    Auth: AuthStack,
},
{
    initialRouteName: 'AuthLoading',
}
)
);





