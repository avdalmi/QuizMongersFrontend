import { useState, useContext } from "react";
import Select from "react-select";
import { ImageSelector } from "../../components";
import Form from "react-bootstrap/Form";
import { SocketContext } from "../../socket";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style.scss";

export const Hostpage = () => {
  const socket = useContext(SocketContext);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedNumQuestions, setSelectedNumQuestion] = useState("");
  const [hostName, setHostName] = useState("");
  const [image, setImage] = useState("");


  const categoryValues = selectedCategory?.map((cat) => {
    return cat.value;
  });

  const categoryString = categoryValues.join();

  const submitGameSettings = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `https://the-trivia-api.com/api/questions?categories=${categoryString}&limit=${selectedNumQuestions}&region=NL&difficulty=${selectedDifficulty}`
    );

    const data = { name: hostName, imageUrl: image, questions: response.data };
    socket.emit("createRoom", data);
  };

  const options = [
    { value: "film_and_tv", label: "Film & TV" },
    { value: "food_and_drink", label: "Food & Drink" },
    { value: "general_knowledge", label: "General Knowledge" },
    { value: "geography", label: "Geography" },
    { value: "history", label: "History" },
    { value: "science", label: "Science" },
    { value: "society_and_culture", label: "Society & Culture" },
    { value: "sport_and_leisure", label: "Sport & Leisure" },
  ];

  const handleSelect = (data) => {
    setSelectedCategory(data);
  };

  return (
    <>
      <Container className="container-center bg-patterns container-host">
        <Row>
          <Col className="host">
            <h1>Create a game</h1>
            <Form onSubmit={ submitGameSettings }>
              {/* Host name section (guys I don't know wtf the Form.Label thing is but Form.Input was not a thing, im so sorry)*/ }
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={ hostName }
                onChange={ (e) => setHostName(e.target.value) }
                placeholder="Enter your name"
              ></Form.Control>
              {/* End host name section */ }
              <Form.Label>Category</Form.Label>
              <Select
                className="select-cat"
                options={ options }
                placeholder="Select category"
                value={ selectedCategory }
                onChange={ handleSelect }
                isMulti
              />
              <Form.Label>Difficulty</Form.Label>
              <Form.Select
                onChange={ (e) => setSelectedDifficulty(e.target.value) }
                aria-label="Default select example"
              >
                <option>-</option>
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </Form.Select>
              <Form.Label># Questions</Form.Label>
              <Form.Select
                onChange={ (e) => setSelectedNumQuestion(e.target.value) }
                aria-label="Default select example"
              >
                <option>-</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </Form.Select>
              <Form.Label>Choose avatar</Form.Label>
              <ImageSelector setImage={ setImage } />
              <button type="submit" className="btn btn-success">
                Create Game
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
