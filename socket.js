const fs = require('fs');
const fsx = require('fs-extra');
const xssFilters = require('xss-filters');

module.exports = (io) => {

	io.on('connection', (socket) => {

		socket.on('client-send-roomId', (data) => {
			socket.Room = data;
			socket.join(data);
			io.sockets.in(socket.Room).emit('socket-send-room', {
				data: xssFilters.inHTMLData(data),
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
			} else {
				fsx.remove(__dirname + '/public/upload', (err) => {
					if(err) throw err;
				});
			}
			socket.broadcast.to(socket.Room).emit('socket-stop-typing');
		})
	  
		socket.on('client-send-message', (data) => {
			socket.broadcast.to(socket.Room).emit('server-send-message', xssFilters.inHTMLData(data));
		});
	  
		socket.on('typing', () => {
			socket.broadcast.to(socket.Room).emit('socket-typing');
		});
	  
		socket.on('stop-typing', () => {
			socket.broadcast.to(socket.Room).emit('socket-stop-typing');
		});
	  
		socket.on('client-send-image', (data) => {
	  
			if (!fs.existsSync(__dirname + '/public/upload/')){
				fs.mkdirSync( __dirname + '/public/upload/');
			}
	  
			let guess = data.base64.match(/^data:image\/(png|jpeg);base64,/)[1];
			let ext = '';
	  
			switch(guess) {
				case 'png'  : ext = '.png'; break;
				case 'jpeg' : ext = '.jpg'; break;
				default     : ext = '.bin'; break;
			}
			
			let savedFilename = '/upload/' + randomString(10) + ext;
	  
			fs.writeFile(__dirname + '/public' + savedFilename, getBase64Image(data.base64), 'base64',  function(err) {
					if (err !== null)
						console.log(err);
					else {
						socket.broadcast.to(socket.Room).emit('server-send-image', {
							path: savedFilename
						});
					}
			});
		});
	});
}

function randomString(length){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

  for( var i=0; i < length; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function getBase64Image(imgData) {
  return imgData.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
}