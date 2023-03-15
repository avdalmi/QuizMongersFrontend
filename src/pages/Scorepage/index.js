import { useSelector } from "react-redux";
import { selectRoom } from "../../store/Room/selectors";
import "./style.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Scorepage = () => {
  const room = useSelector(selectRoom);
  const previousAnswer = room.previousAnswer.answer;
  const playerArray = room?.players;
  const sortedPlayerArray = [...playerArray].sort((a, b) => b.score - a.score);

  return (
    <Container className="bg-patterns score-container">
      <Row>
        <Col className="score-wrapper">
          <h2 className="previousAnswer">
            The answer to the previous question was:{ " " }
            { <strong>{ previousAnswer } </strong> }
          </h2>
          <h1 className="scoreTitle">Player Ranking</h1>

          { sortedPlayerArray.map((player, index) => {
            return (
              <div className="scoreList" key={ index }>
                <img src={ player.imageUrl } alt="anything" />
                <span> { player.name } answered: </span>
                { previousAnswer === player.previousAnswer ? (
                  <span className="rightAnswer">{ player.previousAnswer }</span>
                ) : (
                  <span className="wrongAnswer">{ player.previousAnswer }</span>
                ) }{ " " }
                <span>current score:{ <strong> { player.score }</strong> }</span>
              </div>
            );
          }) }
        </Col>
      </Row>
    </Container>
  );
};
