const { io } = require('../server');
// const { router, connection, LobbyModel } = require("../routes/lobbies");

io.on('connection', (socket) => {
  console.log('connected');
  // connection.then((db) => {
  //   console.log('lobby server')
  // })

  const leavePreviousRooms = () => {
    const rooms = Object.keys(socket.rooms);
    rooms.forEach((room) => {
      if (room !== 'world') {
        socket.leave(room);
      }
    })
  }

  const joinCurrentRoom = (roomName, screenName) => {
    socket.join(roomName, () => {
      if (screenName === null || screenName === undefined) {
        socket.name = 'Player';
      } else {
        socket.name = screenName;
      }
      socket.currentRoom = roomName;
      console.log(roomName, 'wtf');
      console.log(io.sockets.adapter.rooms, 'wtf');
      io.in(roomName).emit('updateRoom', getAllPlayers(Object.keys(io.sockets.adapter.rooms[roomName].sockets)));
    })
  }

  const getAllPlayers = (playerIds) => {
    let playerNames = [];
    // playerIds.forEach((playerId, i) => {
    //   playerNames.push(io.sockets.connected[playerId].name);
    // });
    playerNames = playerIds.map((playerId, i) => io.sockets.connected[playerId].name);

    return playerNames;
  }

  const toTwoDigitString = (number) => {
    if (number < 10) {
      number = '0' + number.toString();
    }
    return number;
  }

  socket.on('joinRoom', (joinInfo) => {
    console.log(joinInfo, 'wtf');
    leavePreviousRooms();
    joinCurrentRoom(joinInfo.roomName, joinInfo.screenName);
  });

  socket.on('updatePlayerName', (updatedName) => {
    socket.name = updatedName;
    const roomName = socket.currentRoom;
    io.in(roomName).emit('updateRoom', getAllPlayers(Object.keys(io.sockets.adapter.rooms[roomName].sockets)));
  });

  socket.on('chatMessage', (message) => {
    const date = new Date();
    const min = toTwoDigitString(date.getMinutes());
    const sec = toTwoDigitString(date.getSeconds());
    const time = `${date.getHours()}:${min}:${sec}`;
    message.name = socket.name;
    message.time = time;
    if (message.where === 'world') {
      io.in('world').emit('chatMessage', message);
    } else {
      const roomName = socket.currentRoom;
      io.in(roomName).emit('chatMessage', message);
    }
  });

  socket.on('joinLobby', (lobbyInfo) => {
    // router.route("/socket").put((req, res) => {
    //
    // })
  });

  socket.on('createLobby', (lobbyInfo) => {

  });

  socket.on('disconnect', () => {
    const roomName = socket.currentRoom;
    if (io.sockets.adapter.rooms[roomName] != undefined) {
      io.in(roomName).emit('updateRoom', getAllPlayers(Object.keys(io.sockets.adapter.rooms[roomName].sockets)));
    }
    delete socket.currentRoom;
    console.log('disconnected');
  });
})
