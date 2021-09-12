import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import Card from "./component/Card";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city_name: "",
      location: {},
      ShowLocation: false,
    };
  }
  cityName = (e) => {
    this.setState({ city_name: e.target.value });
  };

  formSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.city_name);
    try {
      const url = ` https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY_LOCATIONIQ}&q=${this.state.city_name}&format=json`;
      const locationIQRES = await axios.get(url);
      console.log(locationIQRES.data[0]);
      this.setState({ location: locationIQRES.data[0] });
    } catch (error) {}
  };
  render() {
    return (
      <div>
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
        {this.state.location && <Card location={this.state.location} />}
      </div>
    );
  }
}

export default App;
