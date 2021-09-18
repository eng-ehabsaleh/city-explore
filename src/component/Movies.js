import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

export class Movies extends Component {
  render() {
    return (
      <div>
        {this.props.movieData.data.map((ele) => {
          return (
            <>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={ele.image_url} />
                <Card.Body>
                  <Card.Title>movie title: {ele.title}</Card.Title>
                  <Card.Text>movie overview: {ele.overview}</Card.Text>
                  <Card.Text>movie popularity: {ele.popularity}</Card.Text>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </div>
    );
  }
}

export default Movies;
