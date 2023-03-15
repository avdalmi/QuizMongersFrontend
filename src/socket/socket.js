import io from "socket.io-client";
import React from "react";

const apiUrl = `http://localhost:4000`;
export const socket = io(apiUrl, {
  transports: ["websocket"],
});
export const SocketContext = React.createContext(socket);
