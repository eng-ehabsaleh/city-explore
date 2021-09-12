import React from "react";
import Card from "react-bootstrap/Card";
class Cardy extends React.Component {
  render() {
    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
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
