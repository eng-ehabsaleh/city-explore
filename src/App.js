import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import Alert from "react-bootstrap/Alert";
import Weather from "./component/Weather";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city_name: "",
      location: {},
      ShowLocation: false,
      mapImage: {},
      showalert: false,
      errMsg: "",
      showWeather: false,
      weatherData: {},
    };
  }
  cityName = (e) => {
    this.setState({ city_name: e.target.value });
  };

  formSubmit = async (e) => {
    e.preventDefault();
    // console.log(this.state.city_name);
    try {
      const url = ` https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY_LOCATIONIQ}&q=${this.state.city_name}&format=json`;
      const locationIQRES = await axios.get(url);
      const weatherUrl = `http://localhost:3020/weather?city_name=${this.state.city_name}`;
      const weatherRes = await axios.get(weatherUrl);
      console.log(url);
      console.log(weatherRes);
      this.setState({
        location: locationIQRES.data[0],
        showalert: false,
        ShowLocation: true,
        showWeather: true,
        weatherData: weatherRes,
      });
    } catch (err) {
      this.setState({
        errMsg: err.message, //||err.response.data.error
        showalert: true,
        ShowLocation: false,
        showWeather: false,
      });
    }
  };
  render() {
    console.log(this.state.location);
    console.log(this.state.weatherData);
    console.log(this.state.weatherData);

    return (
      <div>
        {this.state.showalert && (
          <Alert variant="danger">{this.state.errMsg}</Alert>
        )}
        <Form onSubmit={this.formSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>City Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter the name of the city"
              onChange={this.cityName}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>

        {this.state.ShowLocation && (
          <Weather
            location={this.state.location}
            weatherData={this.state.weatherData}
          />
        )}
      </div>
    );
  }
}

export default App;
