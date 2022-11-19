const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const client = new MongoClient("mongodb://localhost:27017");

app.use(express.static(__dirname + "/assets"));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/assets/index.html");
});

app.get("/test", async (req, res) => {
    await client.connect();
    const db = client.db("test");
    const collection = db.collection("names");
    await collection.insertOne({name: "Andrew"});
    client.close();
    res.send({ ok: true });
});



app.listen(3000);