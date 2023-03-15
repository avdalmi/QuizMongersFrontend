import { selectQuestions } from "../../store/Room/selectors";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Scorepage } from "../Scorepage";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "../LoadingPage";
import { ProgressBar } from "react-bootstrap";

const randomInteger = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const QuestionPage = () => {
  const questions = useSelector(selectQuestions);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerOptions, setAnswerOptions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (questions.length) {
      const question = questions[questionIndex];

      let answers = [...question.incorrectAnswers];
      answers.splice(
        randomInteger(question.incorrectAnswers.length),
        0,
        question.correctAnswer
      );
      setAnswerOptions(answers);
    }
  }, [questions, questionIndex]);

  const handleChosenAnswer = (e) => {
    const question = questions[questionIndex];

    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate("/score");
    }
  };
  return (
    <div>
      { !questions ? (
        <LoadingPage />
      ) : (
        <div>
          <h3>{ questions[questionIndex].question }</h3>
          { answerOptions.map((answer, id) => {
            return (
              <button onClick={ handleChosenAnswer } key={ id }>
                { answer }
              </button>
            );
          }) }
          <ProgressBar bgColer="blue" completed="50%" />
          <br />
          <br />
          <Scorepage />
        </div>
      ) }
    </div>
  );
};
