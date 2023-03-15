import { useContext } from "react";
import { useSelector } from "react-redux";
import { useLottie } from "lottie-react";
import { useNavigate } from "react-router-dom";
import retro from "./retro.json";
import { SocketContext } from "../../socket";
import { selectRoom } from "../../store/Room/selectors";
import "./style.scss";

export const LoadingPage = () => {
  const socket = useContext(SocketContext);
  const room = useSelector(selectRoom);


  const options = {
    loop: true,
    autoplay: true,
    animationData: retro,

  };
  const { View } = useLottie(options);

  const startGame = () => {
    socket.emit("startGame", room.roomId);
  };

  return (
    <div className="loading">
      <div>
        <>{ View }</>
      </div>
      <div className="loading__wrapper">
        <h1>join with code: { room.roomId }</h1>
        <p>Current players:</p>
        <div className="loading__players">
          { room.players.map((player) => {
            return (
              <div style={ { display: "flex" } }>
                <img src={ player.imageUrl } alt="anything" />
                <span className="player">{ player.name }</span>
              </div>
            );
          }) }
        </div>
        <button onClick={ startGame } className="btn btn-success">
          Start quiz
        </button>
      </div>
    </div>
  );
};
