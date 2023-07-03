require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8082"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

console.log(db.url);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    initial();
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to LearningPlatform  RESTful API Express." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


async function  initial()  {
  const numRoles = await Role.collection.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      const role1 = new Role({
        name: "user"
      });
      role1.save(role1).then(console.log("added 'user' to roles collection")).catch(err => {
        if (err) {
          console.log("error", err);
        }
      });

      const role2 = new Role({
        name: "moderator"
      });

      role2.save(role2).then(console.log("added 'moderator' to roles collection")).catch(err => {
        if (err) {
          console.log("error", err);
        }
      });

      const role3 = new Role({
        name: "admin"
      });
      
      role3.save(role3).then(console.log("added 'admin' to roles collection")).catch(err => {
        if (err) {
          console.log("error", err);
        }
      });
    }
  });
}
