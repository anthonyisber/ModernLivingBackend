const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
port = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
const users = require("./routes/users");
const property = require("./routes/property");
// const path = require('path');



app.get("/", (req, res) => {
    res.json({ message: "Server Side Alive" })
});


app.use("/api/users", users);
app.use("/api/property", property);

app.listen(port, () => {
    console.log(`API is running on the port ${port}`)
})