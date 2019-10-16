import React from 'react';

class Weather extends React.Component {
  render() {
    return (
      <div>
        { this.props.city && this.props.country && <p>Location: { this.props.city }, { this.props.country }</p> }
        { this.props.temperature && <p>Temperature: { this.props.temperature }</p> }
        { this.props.humidity && <p>Humidity: { this.props.humidity }</p> }
        { this.props.description && <p>Conditions: { this.props.description }</p> }
        { this.props.error && <p>{ this.props.error }</p> }
        { this.props.sunrise && <p>Sunrise: { this.props.sunrise }</p> }
        { this.props.sunset && <p>Sunset: { this.props.sunset }</p> }
      </div>
    );
  }
};

export default Weather;