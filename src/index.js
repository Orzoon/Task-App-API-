const express = require("express");
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const cors = require('cors');



const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use(cors())
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log("server is up and running")

})






