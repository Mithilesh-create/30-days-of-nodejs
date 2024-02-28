const { Server } = require('ws'); 

function setupWebSocketServer(server) {
  const wss = new Server({ server });

  const connectedClients = {};

  wss.on('connection', (ws, req) => {
    const userId = req.headers['x-user-id']; 

    connectedClients[userId] = ws;

    console.log(`Client connected: ${userId}`);

    ws.on('message', (message) => {
      for (const otherUserId in connectedClients) {
        if (otherUserId !== userId) {
          connectedClients[otherUserId].send(message);
        }
      }
      console.log(`Client ${userId} sent message: ${message}`);
    });

    ws.on('close', () => {
      delete connectedClients[userId];
      console.log(`Client ${userId} disconnected`);
    });
  });

  return wss;
}

const app = express();
const server = http.createServer(app);
const wss = setupWebSocketServer(server);



app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
