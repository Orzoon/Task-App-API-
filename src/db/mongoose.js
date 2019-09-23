const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASECONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true
});

