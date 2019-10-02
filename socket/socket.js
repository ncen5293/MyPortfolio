const { io } = require('../server');

io.on('connection', (socket) => {
  console.log('connected');

  socket.on('joinRoom', (roomName) => {
    const rooms = Object.keys(socket.rooms);
    rooms.forEach((room) => {
      socket.leave(room);
    })
    socket.join(roomName, () => {
      socket.name = 'Player';
      io.in(roomName).emit('joinRoom', io.sockets.adapter.rooms[roomName].sockets);
    })
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  })
})
