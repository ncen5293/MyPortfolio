const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

let databaseConnection = "Waiting for Database response...";

router.get("/", function(req, res, next) {
    res.send(databaseConnection);
});

const connection = mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/socket", { useNewUrlParser: true  });
const database = mongoose.connection;

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const LobbySchema = new Schema({
  _id: ObjectId,
  Name: String,
  Password: String,
  Host: String,
  Users: []
});

const LobbyModel = mongoose.model('lobby', LobbySchema);

router.put("/lobby", (req,res) => {
  console.log(req.body);
  if (req.body.lobbyInfo.users.length === 0) {
    LobbyModel.findOneAndDelete(
      {
        "Name": req.body.lobbyInfo.name,
        "Host": req.body.lobbyInfo.host,
        "_id": req.body.lobbyInfo._id
      },
      (err, lobby) => {
        if (err) {
          return handleError(err);
        }
        res.send({message: 'deleted lobby'});
      }
    )
  } else {
    LobbyModel.findOneAndUpdate(
      {
        "Name": req.body.lobbyInfo.name,
        "Host": req.body.lobbyInfo.host
      },
      { "Users": req.body.lobbyInfo.users },
      { new: true },
      (err, lobby) => {
        if (err) {
          return handleError(err);
        }
        if (!lobby) {
          console.log('creating new lobby');
          let newLobby = {
            Name: req.body.lobbyInfo.name,
            Password: req.body.lobbyInfo.password ? req.body.lobbyInfo.password : '',
            Host: req.body.lobbyInfo.host,
            Users: req.body.lobbyInfo.users
          };
          newLobby._id = mongoose.Types.ObjectId();
          console.log(newLobby);
          let newLobbyModel = new LobbyModel(newLobby);
          newLobbyModel.save((err) => {
            if (err) {
              return handleError(err);
            }
          });
          res.send({message: 'created new lobby'});
        } else {
          res.send({message: 'updated lobby'});
        }
    });
  }
})

router.get("/lobby", (req,res) => {
  console.log(req.query);
  LobbyModel.find({},
    (err, lobbies) => {
      if (err) {
        return handleError(err);
      }
      res.send({ lobbies });
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
