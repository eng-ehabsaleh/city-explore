import React from "react";
import Card from "react-bootstrap/Card";
class Cardy extends React.Component {
  render() {
    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY_LOCATIONIQ}&center=${this.props.location.lat},${this.props.location.lon}&zoom=18&markers=icon:large-blue-cutout|${this.props.location.lat},${this.props.location.lon}`}
          />
          <Card.Body>
            <Card.Title>{this.props.location.display_name}</Card.Title>
            <Card.Text>the lat: {this.props.location.lat}</Card.Text>
            <Card.Text>the lon: {this.props.location.lon}</Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}
export default Cardy;
