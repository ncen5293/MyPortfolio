const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

let databaseConnection = "Waiting for Database response...";

router.get("/", function(req, res, next) {
    res.send(databaseConnection);
});

mongoose.connect("mongodb://localhost:27017/stock");

const database = mongoose.connection;

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const HobbySchema = new Schema({
  _id: ObjectId,
  Title: String,
  Likes: Number
});

const HobbyModel = mongoose.model('hobby', HobbySchema);

router.put("/hobbys/:title/like", (req,res) => {
  console.log(req.body);
  HobbyModel.findOneAndUpdate(
    { "Title": req.body.title },
    { "Likes": req.body.likeCounter + 1 },
    { new: true },
    (err, hobby) => {
      if (err) {
        return handleError(err);
      }
      if (!hobby) {
        let newHobby = { Likes: 1 }
        newHobby._id = mongoose.Types.ObjectId();
        let newHobbyModel = new HobbyModel(newHobby);
        newHobbyModel.save((err) => {
          if (err) {
            return handleError(err);
          }
        });
        res.send({newHobby.Likes});
      } else {
        res.send({hobby.Likes});
      }
  });
})

router.get("/hobbys/:title/like", (req,res) => {
  console.log(req.query);
  UserPortfolioModel.findOne({ "Title": req.query.title },
    (err, hobby) => {
      if (err) {
        return handleError(err);
      }
      if (!hobby) {
        let newHobby = { Likes: 0 }
        newHobby._id = mongoose.Types.ObjectId();
        let newHobbyModel = new HobbyModel(newHobby);
        newHobbyModel.save((err) => {
          if (err) {
            return handleError(err);
          }
        });
        res.status(201).json({ error: null, newHobby.Likes });
      } else {
        res.status(201).json({ error: null, hobby.Likes });
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
