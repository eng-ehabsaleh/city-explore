import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import Alert from "react-bootstrap/Alert";
import Weather from "./component/Weather";
import Movies from "./component/Movies";
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
      movieData: {},
      showMovie: false,
    };
  }
  cityName = (e) => {
    this.setState({ city_name: e.target.value });
  };

  formSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY_LOCATIONIQ}&q=${this.state.city_name}&format=json`;
      const locationIQRES = await axios.get(url);
      this.setState({
        location: locationIQRES.data[0],
      });
      const weatherUrl = `${process.env.REACT_APP_SERVER_URL}/weather?lat=${this.state.location.lat}&lon=${this.state.location.lon}`;
      console.log(weatherUrl);
      console.log(this.state.location.lat);
      const weatherRes = await axios.get(weatherUrl);
      console.log(weatherRes);
      this.setState({
        weatherData: weatherRes,
      });
      this.setState({
        showalert: false,
        ShowLocation: true,
        showWeather: true,
      });
      const movieUrl = `${process.env.REACT_APP_SERVER_URL}/movies?city=${this.state.city_name}`;
      // const serverUrl = `${process.env.REACT_APP_SERVER_URL}/weather?`;
      // const serverRes = await axios.get(serverUrl);
      const movieRes = await axios.get(movieUrl);
      console.log("movie", movieRes);
      this.setState({
        movieData: movieRes,
        showMovie: true,
      });
      console.log("location", this.state.location);
    } catch (err) {
      this.setState({
        errMsg: err.message, //||err.response.data.error
        showalert: true,
        ShowLocation: false,
        showWeather: false,
        showMovie: false,
      });
    }
  };
  render() {
    // console.log(this.state.location);
    // console.log(this.state.weatherData);
    // console.log(this.state.weatherData);

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
        {this.state.showMovie && <Movies movieData={this.state.movieData} />}
      </div>
    );
  }
}

export default App;
