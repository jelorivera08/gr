const { MongoClient } = require("mongodb");

let mongoDB;

const setupDB = (callback) => {
  const uri =
    "mongodb+srv://jelo:a9bc839993@cluster0-voope.mongodb.net/<dbname>?retryWrites=true&w=majority";

  MongoClient.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        return callback(err);
      }
      mongoDB = client.db("babe");
      return callback("DB OK");
    }
  );
};

const getDB = () => mongoDB;

module.exports = { setupDB, getDB };
