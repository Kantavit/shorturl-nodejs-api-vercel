const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const path = require("path");
process.env['NODE_CONFIG_DIR'] = path.join(path.resolve("./"),"config/")

const app = express();

connectDB(); // connect to database

app.use(cors());

app.use(express.json({extended: false}));

app.use('/', require('./routes/index'))
app.use('/api/url', require('./routes/url'))

const PORT = 5000;

app.listen(PORT, '0.0.0.0', ()=> console.log(`Server running on port ${PORT}`));
