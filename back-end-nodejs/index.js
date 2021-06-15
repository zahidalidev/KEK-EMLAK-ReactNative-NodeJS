const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')

const Users = require("./routes/Users")
const Products = require("./routes/Products")

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '15MB' }))

app.use(express.json());

app.use(express.static('assets'))
app.use("/api/users", Users);
app.use("/api/products", Products);

// set port, from environment variable or 5000
app.set('port', (process.env.PORT || 5000));

// listining on port
const port = app.get('port');
app.listen(port, () => console.log(`app is running on port ${port}...`));
