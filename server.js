var net = require('net');

var port = 3000;

var clients =[];

var server = net.createServer(function(client){
	clients.push(client);
	console.log(clients.length, ' clients connected');
	client.write('Hello Client\r\n');

	client.on('data', function(data){
		console.log(data.toString().trim());
		clients.forEach(function(c){
			if (c!=client){
				c.write(data);
			}
		});
	});

	client.on('end', function(){
		console.log('client disconnected');
	});

});

server.listen(port, function(){
	console.log('listening on '+ port);
});