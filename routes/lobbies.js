const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

let databaseConnection = "Waiting for Database response...";

router.get("/", function(req, res, next) {
    res.send(databaseConnection);
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/socket");
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

router.put("/lobbys", (req,res) => {
  console.log(req.body);
  if (req.body.users.length === 0) {
    LobbyModel.findOneAndDelete(
      {
        "Name": req.body.name,
        "Host": req.body.Host
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
        "Name": req.body.name,
        "Host": req.body.host
      },
      { "Users": req.body.users },
      { new: true },
      (err, lobby) => {
        if (err) {
          return handleError(err);
        }
        if (!lobby) {
          console.log('creating new lobby');
          let newLobby = {
            Name: req.body.name,
            Password: req.body.password,
            Host: req.query.host,
            Users: req.body.users
          };
          newLobby._id = mongoose.Types.ObjectId();
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

router.get("/lobbys", (req,res) => {
  console.log(req.query);
  LobbyModel.find({},
    (err, lobbies) => {
      if (err) {
        return handleError(err);
      }
      res.send(lobbies);
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
