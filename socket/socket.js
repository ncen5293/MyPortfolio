const { io } = require('../server');
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/socket");

io.on('connection', (socket) => {
  console.log('connected');

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

  const toTwoDigitString = (number) => {
    if (number < 10) {
      number = '0' + number.toString();
    }
    return number;
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
  })

  socket.on('disconnect', () => {
    delete socket.currentRoom;
    console.log('disconnected');
  })
})
