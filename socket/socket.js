const { io } = require('../server');

io.on('connection', (socket) => {
  console.log('connected');

  socket.on('joinRoom', (roomName) => {
    console.log(roomName);
    socket.join(roomName, () => {
      const playerNum = io.sockets.adapter.rooms[roomName].sockets.length;
      io.in(roomName).emit('joinRoom', io.sockets.adapter.rooms[roomName].sockets);
    })
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  })
})
