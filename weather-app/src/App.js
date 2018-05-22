import React from 'react';
import Titles from './components/Titles'
import Form from './components/Form'
import Weather from './components/Weather'
import {inject, observer} from 'mobx-react';

const API_KEY = 'fbc9ab20e84082f88ca8f52ef856e80f';

@inject('WeatherStore')
@observer
class App extends React.Component {


getWeather = async (e) => {
  e.preventDefault();
  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;

  console.log(API_KEY);
  const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
  const data = await api_call.json();

  if(city && country){
    console.log(data);

      this.props.WeatherStore.temp = data.main.temp;
      this.props.WeatherStore.city= data.name;
      this.props.WeatherStore.country= data.sys.country;
      this.props.WeatherStore.humidity= data.main.humidity;
      this.props.WeatherStore.description= data.weather[0].description;
      this.props.WeatherStore.error= '';

  } else {

      this.props.WeatherStore.temp= undefined;
      this.props.WeatherStore.city= undefined;
      this.props.WeatherStore.country= undefined;
      this.props.WeatherStore.humidity= undefined;
      this.props.WeatherStore.description= undefined;
      this.props.WeatherStore.error= 'Please enter City & Country.';

  }
}

  render(){
    const {WeatherStore} = this.props;

    return(<div>
            <div className="wrapper">
              <div className="main">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-5 title-container">
                    <Titles/>
                    </div>
                    <div className="col-xs-7 form-container">
                    <Form getWeather = {this.getWeather}/>
                    <Weather
                    temperature = {WeatherStore.temp}
                    city = {WeatherStore.city}
                    country = {WeatherStore.country}
                    humidity = {WeatherStore.humidity}
                    description = {WeatherStore.description}
                    error = {WeatherStore.error}
                    />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>)
  }
}

export default App;
