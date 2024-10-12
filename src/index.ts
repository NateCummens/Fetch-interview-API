const express = require("express");
const app = express();
const PORT = 3000;
app.user(express.json());

app.listen(
    PORT,
    () => console.log(`Server is running on http://localhost:${PORT}`)
)