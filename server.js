"use strict";
const cors = require("cors");
const app = require("./app");

app.use(cors());
const { PORT } = require("./config");


app.listen(PORT, function () {
    console.log(`Started on ${PORT}`);
});

app.get("/api", (req, res) => {
    res.json({message: "Hello this is server"})
})