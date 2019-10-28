const express = require("express");
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const cors = require('cors');
const path = require('path')



const app = express();
const port = process.env.PORT;
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(taskRouter);

app.get('/', (req,res) => {
    res.sendfile(path.join(__dirname +'../public/index.html'));
})
app.listen(port, () => {
    console.log("server is up and running")

})






