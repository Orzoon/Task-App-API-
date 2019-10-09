const express = require("express");
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');




const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
})
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log("server is up and running")

})






