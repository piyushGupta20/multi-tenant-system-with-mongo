const express = require('express');
const { connectDB } = require('./db/connectDB');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use('/', require('./routes/routes'))

app.listen(process.env.PORT, () => {
    connectDB()
    console.log(`server listening on localhost:${process.env.PORT}`,)
});