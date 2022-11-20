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
    res.send({ groups: (await groupsCollection.find({}).toArray()).map((e) => e.groupId) });
    client.close();
});

app.post("/getTimetable", async (req, res) => {
    await client.connect();
    const db = client.db("universitytable");
    const groupSubjects = db.collection("group" + req.body.groupId);
    const commonTimetable = db.collection("commonTimetable");
    res.send({ timetable: (await groupSubjects.find({ weekDay: req.body.weekDay }).toArray()).map(e => {
        delete e._id;
        return e;
    }), commonTimetable: (await commonTimetable.find({}).toArray()).map(e => {
        delete e._id;
        return e;
    }) });
    client.close();
});

app.listen(3000);