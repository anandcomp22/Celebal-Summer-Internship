var net = require('net');

var server = net.createServer(function(connection) {
    console.log('Client Connected');

    connection.on('end', function() {
        console.log('Client disconnected');
    });
    connection.write('Hello World!\r\n');
    connection.pipe(connection);

    });
server.listen(8080, function(err) {
    if(err) {
        console.log(err);
    }
    console.log('server is listening on port 8080');
});
