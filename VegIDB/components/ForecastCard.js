import React, {Component} from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';


export default class ForecastCard extends Component {

	render() {
		let time;

		// Create a new date from the passed date time
		var date = new Date(this.props.detail.dt*1000);

		// Hours part from the timestamp
		var hours = date.getHours();

		//converts default military time to standard time
		if(Number(hours) > 12)
		{
			var tmp = Number(hours) - 12;
			hours = String(tmp);
			var status = " PM";
		}

		else
		{
            var status = " AM"
		}

		// Minutes part from the timestamp
		var minutes = "0" + date.getMinutes();

		time = hours + ':' + minutes.substr(-2) + status;

		return (
			<View style={styles.card}>
				<Text style={styles.notes}>{this.props.location}</Text>

				<View style={{flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}>
					<Image style={{width:70, height:70, alignSelf: 'center'}} source={{uri:"https://openweathermap.org/img/w/" + this.props.detail.weather[0].icon + ".png"}} />
					<Text style={styles.time}>{time}</Text>
				</View>

				<View style={{flexDirection:'column', alignItems:'center'}}>
				    <Text style={styles.notes}>{this.props.detail.dt_txt.substr(0,10)}</Text>
					<Text style={styles.notes}>{Math.round( this.props.detail.main.temp * 10) / 10 }&#8457;</Text>
				</View>
			</View>
		);
	}
}
//	<Text style={styles.notes}>{this.props.detail.weather[0].description}</Text>

const styles = StyleSheet.create({
	card:{
		backgroundColor:'pink',
		borderWidth:0,
		margin: 3,
		height: 220,
		borderRadius:20,
		alignItems: 'center'
	},
	time:{
		fontSize:18,
		color:'#fff'
	},
	notes: {
		fontSize: 16,
		color:'#fff',
		textTransform:'capitalize',
		marginTop: 10,
		flexWrap: 'wrap',
	}
});