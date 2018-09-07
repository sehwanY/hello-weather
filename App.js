import React from 'react';
import { StyleSheet, Text, View, StatusBar, Button  } from 'react-native';
import Weather from './Weather'
import MapView from 'react-native-maps';

const API_KEY = "9eb8d2c23d9da16008fa0db06b6989e7";

export default class App extends React.Component {
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null
  };

  componentDidMount(){
    // navigator.geolocation.getCurrentPosition(
    //   position => {
    //     this._getWeather(position.coords.latitude, position.coords.longitude);
    //   },
    //   error => {
    //     this.setState({
    //       error:error
    //     });
    //     console.log('eroor:' + error);
    //   }  
    // );
  }

  componentDidUpdate(){
    // 잠시 대기
  }

  _getWeatherLoad(){
    // 나중에 여기서 현재 위치 gps 정보를 이용하여 날씨정보를 얻어오도록 구현
  }

  _getSelectGPSWeather(){
    // map 에서 gps 를 선택해서 해당 gps의 날씨를 얻어오도록 설계
  }

  _getWeather= (lat, long) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}`)
    .then(response=> response.json())
    .then(json=>{
      console.log(json);
      this.setState({
        temperature: json.main.temp,
        name: json.weather[0].main,
        isLoaded: true
      });
    });
  }

  render() {
    const { isLoaded, error, temperature, name } = this.state;
 
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        { isLoaded ? (
          <Weather weatherName={name} temp={Math.floor(temperature - 273.15)} /> 
        ): (
          <View style={styles.loading}>
            <View style={styles.topArea}>
                <Button
                  onPress = {this._getWeatherLoad}
                  title="Load Weather~!!!"
                  color="blue"
                  accessibilityLabel = "test"
                />
            </View>
            <View style={styles.bodyArea}>
              <Text style={styles.loadingMessage}>Getting the Hello Weather</Text>
              { error ? <Text style={styles.errorText}>{error}</Text> : null }
            </View>
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
  topArea: {
    flex: 1,
    backgroundColor:"transparent",
    marginTop: 15,
    paddingRight: 25,
    alignContent: "center"
  },
  bodyArea: {
    flex: 9,
    backgroundColor: '#FDF6AA',
    justifyContent: "flex-end"
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
