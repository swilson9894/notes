const router = require('express').Router()
const fs = require('fs')
const path = require('path')

const DB_PATH = path.join(__dirname, "../db/db.json");
function getDB() {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8')) || []
}
function setDB(val) {
    fs.writeFileSync(DB_PATH, JSON.stringify(val))
}

router.get("/notes", function (req, res) {
    const db = getDB();

    res.json(db)
})

router.post("/notes", function (req, res) {
    const db = getDB();

    const note = req.body;

    note.id = db.length;

    db.push(note);

    setDB(db)

    res.sendStatus(200)
})

router.delete("/notes/:id", function(req, res){
    const id = parseInt(req.params.id)
    const db = getDB();

    const newDB = [];
    for(var i = 0; i < db.length; i++){
        if(db[i].id !== id){
            newDB.push(db[i])
        }
    }
    setDB(newDB);

    res.sendStatus(200)
})

module.exports = router;