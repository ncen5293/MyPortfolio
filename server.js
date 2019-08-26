const express = require("express");
const cors = require("cors");
const app = express();
const hobbyRouter = require("./routes/hobbies");

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/hobbies", hobbyRouter);

app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
