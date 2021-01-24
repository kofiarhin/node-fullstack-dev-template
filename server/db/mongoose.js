const mongoose = require("mongoose")

// connect to database
mongoose.connect(process.env.mongo_url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}).then( () => console.log("connected to database"))
.catch(e => console.log(e.message))