const express = require("express");
require('./src/db/mongoose');
const userRouter = require('./src/routers/user');
const taskRouter = require('./src/routers/task');
const cors = require('cors');
const path = require('path')



const app = express();
const port = process.env.PORT;
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(taskRouter);
app.get('/*', (req,res) =>{
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
    console.log("server is up and running")

})






