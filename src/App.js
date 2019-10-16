import React from 'react';
import Title from './Title';
import Form from './Form';
import Weather from './Weather';
import axios from 'axios';

const API_Key = 'd7fd1d5206fc7021070ff36eaa8c65c1';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined,
    }
    this.getWeather = this.getWeather.bind(this);
  }
  
  getWeather(e) {
    e.preventDefault();
    const city = e.target.city.value;
    const country = e.target.country.value;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_Key}`)
      // .then((res) => {
      //   console.log(res.data);
      //   this.setState({
      //     temperature: res.data.main.temp,
      //     city: res.data.name,
      //     country: res.data.sys.country,
      //     humidity: res.data.main.humidity,
      //     description: res.data.weather[0].description,
      //     error: ''
      //   });
      // });
      .then(res => {
        const temperature = res.data.main.temp;
        const city = res.data.name;
        const country = res.data.sys.country;
        const humidity = res.data.main.humidity;
        const description = res.data.weather[0].description;
        if (city && country) {
          this.setState({
            temperature: temperature,
            city: city,
            country: country,
            humidity: humidity,
            description: description,
            error: ''
          });
        } else {
          this.setState({
            temperature: undefined,
            city: undefined,
            counrty: undefined,
            humidity: undefined,
            description: undefined,
            error: 'Please enter the value.'
          });
        }
      });
  }
  render() {
    return (
      <div>
        <Title />
        <Form  getWeather={this.getWeather} />
        <Weather temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />
      </div>
    );
  }
};

export default App;