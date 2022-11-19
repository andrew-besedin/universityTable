const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const client = new MongoClient("mongodb://localhost:27017");

app.use(express.static(__dirname + "/assets"));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/assets/index.html");
});

app.get("/getGroupsList", async (req, res) => {
    await client.connect();
    const db = client.db("universitytable");
    const groupsCollection = db.collection("groups");
    const groups = await groupsCollection.find({}).toArray();
    res.send({groups: (await groupsCollection.find({}).toArray()).map((e) => e.groupId)});
    client.close();
});

app.listen(3000);