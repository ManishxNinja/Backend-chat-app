
import { WebSocketServer, WebSocket } from "ws";
const PORT = process.env.PORT || 8080; 
interface User {
  socket: WebSocket;
  room: string
}
  
let allSockets: User[] = [];

const wss = new WebSocketServer({port: PORT});

wss.on('connection', (socket) => {

  socket.on('message', (message) => {
    let parsedMessage;
    // Validate and parse the message
    try {
      parsedMessage = JSON.parse(message.toString());
    } catch (error) {
      console.error("Invalid JSON received:", message.toString());
      socket.send(JSON.stringify({ error: "Invalid JSON format" }));
      return; // Exit early if the message is invalid
    }
    console.log("hiii");
    if(parsedMessage.type == "join") {
      allSockets.push({
        socket,
        room: parsedMessage.roomId,
      });
      console.log("User joined room:", parsedMessage.roomId);
    }
    if(parsedMessage.type == "chat") {
      allSockets.forEach((user) => {
        //@ts-ignore
        if (user.room === parsedMessage.roomId) {
          user.socket.send(parsedMessage.message);
        }
      });
      console.log("Message Sentt");
    }
  
    
  });
});


