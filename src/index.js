const express = require("express");
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');




const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use((req,res,next) => {
    res.setHeader('Acess-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, UPDATE,DELETE');\
    next();
})
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log("server is up and running")

})






