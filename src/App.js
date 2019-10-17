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
      sunrise: undefined,
      sunset: undefined,
      error: undefined,
    }
    this.getWeather = this.getWeather.bind(this);
  }
  
  getWeather(e) {
    e.preventDefault();
    const city = e.target.city.value;
    const country = e.target.country.value;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_Key}`)
      .then(res => {
        if (city && country) {
          this.setState({
                temperature: res.data.main.temp,
                city: res.data.name,
                country: res.data.sys.country,
                humidity: res.data.main.humidity,
                description: res.data.weather[0].description,
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

    const url = `https://sun.p.rapidapi.com/api/sun/?city=${city}`;
    const config = {
      "headers": {
        "x-rapidapi-host": "sun.p.rapidapi.com",
        "x-rapidapi-key": "ab5833d991mshc1da61291d862e9p14c626jsn634e2dd0aad4"
      }
    }
    axios.get(url, config)
      .then(res => {
        this.setState({
          sunrise: res.data[3].sunrise,
          sunset: res.data[1].sunset
        });
      });

  }

  render() {
    return (
      <div>
        <div className="wapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-md-5 title-container">
                  <Title />
                </div>
                <div className="col-md-7 form-container">
                  <Form  getWeather={this.getWeather} />
                  <Weather temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    sunrise={this.state.sunrise}
                    sunset={this.state.sunset} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;



