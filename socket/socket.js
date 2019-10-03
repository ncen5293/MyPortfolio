const { io } = require('../server');

io.on('connection', (socket) => {
  console.log('connected');

  const leavePreviousRooms = () => {
    const rooms = Object.keys(socket.rooms);
    rooms.forEach((room) => {
      socket.leave(room);
    })
  }

  const joinCurrentRoom = (roomName, screenName) => {
    socket.join(roomName, () => {
      if (screenName === undefined) {
        socket.name = 'Player';
      } else {
        socket.name = screenName;
      }
      socket.currentRoom = roomName;
      io.in(roomName).emit('updateRoom', getAllPlayers(Object.keys(io.sockets.adapter.rooms[roomName].sockets)));
    })
  }

  const getAllPlayers = (playerIds) => {
    let playerNames = [];
    playerIds.forEach((playerId, i) => {
      playerNames.push(io.sockets.connected[playerId].name);
    });

    return playerNames;
  }

  socket.on('joinRoom', (joinInfo) => {
    console.log(joinInfo)
    leavePreviousRooms();
    joinCurrentRoom(joinInfo.roomName, joinInfo.screenName);
  });

  socket.on('updatePlayerName', (updatedName) => {
    socket.name = updatedName;
    const roomName = socket.currentRoom;
    io.in(roomName).emit('updateRoom', getAllPlayers(Object.keys(io.sockets.adapter.rooms[roomName].sockets)));
  })

  socket.on('disconnect', () => {
    delete socket.currentRoom;
    console.log('disconnected');
  })
})
