const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

let databaseConnection = "Waiting for Database response...";

router.get("/", function(req, res, next) {
    res.send(databaseConnection);
});

const connection = mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio", { useNewUrlParser: true  });
const database = mongoose.connection;

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const LobbySchema = new Schema({
  _id: ObjectId,
  RoomId: Number,
  Name: String,
  Password: String,
  Host: String,
  Users: [],
  VideoIds: []
});

const LobbyModel = mongoose.model('lobby', LobbySchema);

router.post("/lobby", (req,res) => {
  console.log(req.body);
  console.log('creating new lobby');
  let newLobby = {
    Name: req.body.lobbyInfo.name,
    Password: req.body.lobbyInfo.password,
    Host: req.body.lobbyInfo.host,
    Users: [req.body.lobbyInfo.users],
    VideoIds: []
  };
  console.log(newLobby);
  LobbyModel.findOne(
    {}, {}, { sort: { 'created_at' : -1 }},
    (err, lobby) => {
      if (lobby) {
        newLobby.RoomId = lobby.RoomId + 1;
      } else {
        newLobby.RoomId = 1;
      }
      newLobby._id = mongoose.Types.ObjectId();
      let newLobbyModel = new LobbyModel(newLobby);
      newLobbyModel.save((err) => {
        if (err) {
          console.log(err);
        }
      });
      res.send({ newLobby });
  });
})

router.put("/lobby", (req,res) => {
  console.log(req.body);
  LobbyModel.findOne({ "RoomId": req.body.roomId },
    (err, lobby) => {
      if (err) {
        console.log(err);
      }
      if (!lobby) {
        res.send({ exists: false });
      } else {
        if (req.body.reason === 'join') {
          lobby.Users.push(req.body.user);
        } else {
          for (let i=0; i< lobby.Users.length; i++) {
            if (lobby.Users[i] === req.body.user) {
              lobby.Users.splice(i, 1);
            }
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
})

router.delete("/lobby", (req,res) => {
  LobbyModel.findOneAndDelete(
    {
      "RoomId": req.query.roomId
    },
    (err, lobby) => {
      if (err) {
        console.log(err);
      }
      console.log(lobby);
      res.send({ exists: false });
    }
  )
})

router.get("/lobby", (req,res) => {
  console.log(req.query);
  const roomId = req.query.roomId;
  if (roomId.length > 0) {
    LobbyModel.findOne({ "RoomId": req.query.roomId },
      (err, lobby) => {
        if (err) {
          console.log(err);
        }
        if (!lobby) {
          res.send({ lobby, exists: false });
        } else {
          res.send({ lobby, exists: true });
        }
    });
  } else {
    LobbyModel.find({},
      (err, lobbies) => {
        if (err) {
          console.log(err);
        }
        res.send({ lobbies });
    });
  }
})

router.put("/video", (req,res) => {
  console.log(req.body);
  LobbyModel.findOne({ "RoomId": req.body.roomId },
    (err, lobby) => {
      if (err) {
        console.log(err);
      }
      if (!lobby) {
        res.send({ exists: false });
      } else {
        lobby.VideoIds.push(req.body.videoId);
        console.log(lobby);
        lobby.save((err) => {
          if (err) {
            console.log(err);
          }
        });
        res.send({ exists: true, lobby });
      }
  });
})

database.on("error", error => {
    console.log("Database connection error:", error);
    databaseConnection = "Error connecting to Database";
});

// If connected to MongoDB send a success message
database.once("open", () => {
    console.log("Connected to Database!");
    databaseConnection = "Connected to Database";
});

module.exports = router;
