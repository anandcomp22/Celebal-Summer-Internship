//Simple Server Creation in Node JS
const http = require('http');// use to start server
const fs = require('fs');//manage file (file System)
const port = 3000; // Port on which server runs



const server = http.createServer(function(req,res){
    res.writeHead(200, { 'content-type' : 'text/html' });//status code with successfull execute the content from html
    fs.readFile('index.html', function(error, data){// data represent in file is render
        if(error) {
            res.writeHead(404);// status code in failure(not found)
            res.write("Error : File not Found");
        } else {
            res.write(data);
        }
        res.end();
    })
});

server.listen(port, function(error){ // Listening port 3000 (running server)
    if(error) {
        console.log("Something went wrong", error);
    } else {
        console.log("Server is listening on port " + port)
    }
})