import React, {Component} from 'react';
import { LineChart, Grid, XAxis, PieChart } from 'react-native-svg-charts';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import {  ScrollView, StyleSheet, View, Text, FlatList, Dimensions, Button, Image, ImageBackground } from 'react-native';

var months =["Jan", "Feb", "March",
             "April", "May", "June",
             "July", "August", "September",
             "October", "November", "December"];

var sevenMonths = [];

export class StatsScreen extends Component {


    static navigationOptions = {
        title: 'Statistics',
        headerTitleStyle:{
            color: 'black',
        },
        headerStyle:{
            backgroundColor: 'transparent',
            zIndex: 100,
        },
    };


    componentWillMount(){
        var month = new Date().getMonth();
        //get previous 7 months
        var i = 0;
        for(i = month - 6; i <= month; i++)
        {
            if(i < 0)
            {
                temp = 12 + i;
                sevenMonths.push(months[temp]);
            }
            else
            {
                sevenMonths.push(months[i]);
            }
        }

        console.log(sevenMonths);
    }

    render() {

        const deadAlive = [ 12, 3 ];
        const plantsAdded = [2, 4, 10, 3, 15, 4, 7];

        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
        const pieData = deadAlive
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', value),
                    label: "as"
                },
                key: `pie-${index}`,
            }));

        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                    <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'}/>
                    <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'}/>
                </LinearGradient>
            </Defs>
        )

        console.log("yeet: " + sevenMonths);
        return (
            <ScrollView>
                <View style ={styles.col}>
                    <View style={styles.statsBox}>
                        <View style={styles.statsTitleBox}>
                            <Text style ={styles.statsTitle}> YOUR PLANTS </Text>
                        </View>
                        <PieChart
                            style={ { height: 200 } }
                            data={ pieData }
                        />
                    </View>
                    <View style={styles.statsBox}>
                        <View style={styles.statsTitleBox}>
                            <Text style ={styles.statsTitle}> YOUR PLANTS </Text>
                        </View>
                        <LineChart
                            style={ { height: 200 } }
                            data={ plantsAdded }
                            contentInset={ { top: 20, bottom: 20 } }
                            svg={{
                                strokeWidth: 2,
                                stroke: 'url(#gradient)',
                            }}
                        >
                            <Grid/>
                            <Gradient/>
                        </LineChart>
                        <XAxis
                            data={ sevenMonths }
                            formatLabel={(value,index) => value}
                            contentInset={{ left: 10, right: 10 }}
                            svg={{ fontSize: 7, fill: 'black' }}
                        />
                    </View>
                    <View style={styles.statsBox}>
                        <View style={styles.statsTitleBox}>
                            <Text style ={styles.statsTitle}> YOUR PLANTS </Text>
                        </View>
                        <PieChart
                            style={ { height: 200 } }
                            data={ pieData }
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    title:{
        fontFamily: 'Leixo',
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
    statsTitleBox:{
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
    },
    statsBox: {
        height: 300,
        overflow: 'hidden',
        justifyContent: 'space-evenly',
        backgroundColor: '#e5ffea'
    },
    col:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    statsTitle: {
        fontFamily: 'Leixo',
        fontSize: 23,
        color: 'white',

    },
});
