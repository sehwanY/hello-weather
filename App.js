import React from 'react';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import Weather from './Weather'

const API_KEY = "9eb8d2c23d9da16008fa0db06b6989e7";

export default class App extends React.Component {
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null
  };
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error:error
        })
      }
    
    );
  }
  
  _getWeather= (lat, long) => {
    fetch('http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}')
    .then(response=> response.json())
    .then(json=>{
      console.log(json);
      this.setState({
        temperature: json.main.temp,
        name: json.weather[0].main
      });
    });
  }

  render() {
    const { isLoaded, error } = this.state;
 
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        { isLoaded ? <Weather /> : (
          <View style={styles.loading}>
            <Text style={styles.loadingMessage}>Getting the Hello Weather</Text>
            { error ? <Text style={styles.errorText}>{error}</Text> : null }
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  errorText:{
    color:"red",
    backgroundColor:"transparent",
    marginBottom: 40
  },
  loading : {
    flex: 1,
    backgroundColor: '#FDF6AA',
    justifyContent: 'flex-end',
    paddingLeft: 25
  },
  loadingMessage: {
    fontSize: 38,
    marginBottom: 24
  }
});
