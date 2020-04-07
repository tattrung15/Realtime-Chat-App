//require('dotenv').config();
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

io.on('connection', (socket) => {

    socket.on('client-send-roomId', (data) => {
        socket.Room = data;
        socket.join(data);
        io.sockets.in(socket.Room).emit('socket-send-room', {
            data: data,
            numOfOnline: socket.adapter.rooms[socket.Room].length
        });
    });

    socket.on('client-out-roomId', (data) => {
        socket.leave(data);
        if(socket.adapter.rooms[data]){
            io.sockets.in(data).emit('server-send-num-in-room', socket.adapter.rooms[data].length);
        }
    });

    socket.on('disconnect', () => {
        if(socket.adapter.rooms[socket.Room]){
            io.sockets.in(socket.Room).emit('server-send-num-in-room', socket.adapter.rooms[socket.Room].length);
        }
        socket.broadcast.to(socket.Room).emit('socket-stop-typing');
    })

    socket.on('client-send-message', (data) => {
        socket.broadcast.to(socket.Room).emit('server-send-message', data);
    });

    socket.on('typing', () => {
        socket.broadcast.to(socket.Room).emit('socket-typing');
    });

    socket.on('stop-typing', () => {
        socket.broadcast.to(socket.Room).emit('socket-stop-typing');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})