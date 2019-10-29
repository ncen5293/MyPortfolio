const { io } = require('../server');
const { LobbyModel } = require("../routes/lobbies");
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
      const roomInfo = {
        players: getAllPlayers(Object.keys(io.sockets.adapter.rooms[roomName].sockets)),
        roomName
      }
      io.in(roomName).emit('updateRoom', roomInfo);
      io.in('world').emit('updateLobbyList');
    })
  }

  const getAllPlayers = (playerIds) => {
    return playerIds.map((playerId, i) => io.sockets.connected[playerId].name);
  }

  const toTwoDigitString = (number) => {
    if (number < 10) {
      number = '0' + number.toString();
    }
    return number;
  }

  socket.on('joinRoom', (joinInfo) => {
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

  socket.on('getYoutubeData', () => {
    const roomName = socket.currentRoom;
    io.in(roomName).emit('getYoutubeData');
  })

  socket.on('disconnect', () => {
    const roomName = socket.currentRoom;
    if (io.sockets.adapter.rooms[roomName] != undefined) {
      io.in(roomName).emit('updateRoom', getAllPlayers(Object.keys(io.sockets.adapter.rooms[roomName].sockets)));
    }
    delete socket.currentRoom;
    console.log('disconnected');
  });

  const updateLobbyCount = () => {
    LobbyModel.findOne({ "RoomId": req.body.roomId },
      (err, lobby) => {
        if (err) {
          console.log(err);
        }
        if (!lobby) {
          res.send({ exists: false });
        } else if (req.body.reason === 'join') {
          lobby.Users.push(req.body.user);
          console.log(lobby);
          lobby.save((err) => {
            if (err) {
              console.log(err);
            }
          });
          res.send({ exists: true, lobby });
        } else if (lobby.Users.length === 1) {
          LobbyModel.findOneAndDelete(
            {
              "RoomId": roomId
            },
            (err, lobby) => {
              if (err) {
                console.log(err);
              }
              console.log(lobby);
              res.send({ exists: false });
            }
          )
        } else {
          for (let i=0; i< lobby.Users.length; i++) {
            if (lobby.Users[i] === req.body.user) {
              lobby.Users.splice(i, 1);
              break;
            }
          }
          console.log(lobby);
          lobby.save((err) => {
            if (err) {
              console.log(err);
            }
          });
          res.send({ exists: true, lobby });
        }
    });
  }
})
