import { Route, Routes, useNavigate } from "react-router-dom";
import {
  Welcomepage,
  JoinPage,
  Hostpage,
  Quizpage,
  Scorepage,
  LoadingPage,
  QuestionPage,
  FinalScorePage,
} from "./pages";

import "./App.scss";

//socket dependent:
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRoom } from "./store/Room/slice";
import { SocketContext } from "./socket";

function App() {
  //extract socket from the socketContext (the one that is wrapped around App.js)
  const socket = useContext(SocketContext);
  //dispatch and navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    //when the socket receives the "roomUpdate" signal, data is sent along. We can use that data like in the console.log
    socket.on("roomUpdate", (data) => {
      //when we receive a roomUpdate, we set the redux room state with this new updated room:
      dispatch(setRoom(data));
      //we also check the roomStatus, based on that we navigate to each page
      switch (data.roomStatus) {
        case "preLoad":
          navigate("/loading");
          break;
        case "question":
          navigate("/quiz");
          break;
        case "score":
          navigate("/score");
          break;
        case "endGame":
          navigate("/end");
          break;
        default:
          console.log("something went wrong");
      }
    });
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcomepage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/host" element={<Hostpage />} />
        <Route path="/quiz" element={<Quizpage />} />
        <Route path="/score" element={<Scorepage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/end" element={<FinalScorePage />} />
      </Routes>
    </div>
  );
}

export default App;
