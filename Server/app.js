const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const auth = require('./middleware/authorization.js');
const cors = require('cors');
app.use(cors());
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
// Parse incoming request bodies
app.use(express.json({ limit: '90mb' })); // Increase the request payload size limit to 10MB
app.use(bodyParser.json({ limit: '90mb' }));
app.use(bodyParser.urlencoded({ limit: '90mb', extended: true }));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
  },
});
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Whatsup_DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/api/Tokens', auth.processLogin)

// Routes
app.use('/api/Users', userRoutes);
app.use('/api/Chats' ,chatRoutes);

io.on("connection", (socket) => {

  socket.on('send_contact', (data) => {
    socket.broadcast.emit('receive_contact', data);
  });
  socket.on('send_chat_deleted', (data) => {
    socket.broadcast.emit('receive_chat_deleted', data);
  });
  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data);
  });

});
// Start the server
server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
