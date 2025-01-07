const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Ar veikia?");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveris paleistas: http://localhost:${PORT}`);
});