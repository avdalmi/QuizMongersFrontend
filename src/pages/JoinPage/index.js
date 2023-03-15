import { useState, useContext } from "react";
import { SocketContext } from "../../socket";
import { ImageSelector } from "../../components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "./style.scss";

export const JoinPage = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  //In order to retrieve the socket out from the useContext hook, we need to import useContext from react and SocketContext from ../socket
  //Next we retrieve the socket out of the context:
  const socket = useContext(SocketContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { code, name, imageUrl: image };
    //Connect to socket.io
    //Socket.emit is sending a message to the server. If socket.emit is used in the backend, the server is sending something to the client.
    //We declare 'joinRoom' to the socket.emit method. In the backend, socket.on('joinRoom') is declared, the string needs to be identical
    //to the string declared in the client. The second (optional) parameter (data) is used to declare what information we are going to send. In our case,
    //we send the data that was declared in the above. In the server, the second parameter will refer to that same piece of information, so the server
    //receives exactly the same piece of data.
    socket.emit("joinRoom", data);
  };

  return (
    <>
      <Container className="container-center bg-patterns">
        <Row>
          <Col className="join">
            <h1 className="mb-3">Join a game</h1>
            <Form onSubmit={ handleSubmit }>
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                value={ code }
                onChange={ (e) => setCode(e.target.value) }
              ></Form.Control>
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Enter your name"
                type="text"
                value={ name }
                onChange={ (e) => setName(e.target.value) }
              ></Form.Control>

              <Form.Label>Choose avatar</Form.Label>

              <ImageSelector setImage={ setImage } />
              <button type="submit" className="btn btn-success">
                Join
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
