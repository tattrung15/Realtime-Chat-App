require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;
const DB = process.env.MONGODB_URI;

mongoose.connect(DB, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Database connected"));

require('./socket')(io);

server.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})