import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });
let allSockets: WebSocket[] = [];
let userCount = 0;

wss.on("connection", (socket: WebSocket) => {
  allSockets.push(socket);
  userCount += 1;
  console.log("User connected. Number of users:", userCount);

  socket.send("Socket connected successfully");

  socket.on("message", (event: Event) => {
    const message = event.toString();

    // Send the message to all users except the sender
    let filteredArray = allSockets.filter((user) => user !== socket);

    // Complete the project
    filteredArray.forEach((socketElement) => {
      socketElement.send(message);
    });
  });

  socket.on("close", () => {
    // Remove the socket when user disconnects
    allSockets = allSockets.filter((user) => user !== socket);
    userCount -= 1;
    console.log("User disconnected. Number of users:", userCount);
  });
});
