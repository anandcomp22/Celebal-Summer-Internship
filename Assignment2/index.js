const http = require('http'); //Handle incoming request
const path = require('path'); //workking with files safely
const fs = require('fs'); //file operation
const url = require('url'); //parse incoming request

const FILE_DIR = path.join(__dirname, 'files'); //current directory with subfolder

if(!fs.existsSync(FILE_DIR)) { //checks that file exists or not
    fs.mkdirSync(FILE_DIR);
}

const server = http.createServer((req, res) => { //server creation
    const parseUrl = url.parse(req.url, true); //parsing url (query string into an object)
    const { pathname, query } = parseUrl;
    
    const filename = query.name;
    const filepath = path.join(FILE_DIR, filename || '');

    res.setHeader('Content-Type', 'text/plain');

    if(pathname === '/create') { //route for writing and creation
        if(!filename || !query.content) { //Check if the request is for file creation
            res.end('Missing "name" or "content" query parameters.');
            return;
        }
        fs.writeFile(filepath, query.content, (err) => { //can create or overwrite the file 
            if(err) {
                res.end('Error creating file.');
            } else {
                res.end(`File "${filename}" create successfully.`)
            }
        });
    }

    else if(pathname === '/read') { //route for read 
        if(!filename) {
            res.end('Missing "name" query parameter.');
            return;
        }
        fs.readFile(filepath, 'utf8', (err, data) => { // UTF-8 encoding
            if(err) {
                res.end(`Error reading file : ${err.message}`);
            } else {
                res.end(data);
            }
        });
    }

    else if(pathname == '/delete') { //route for deleting 
        if(!filename) {
            res.end('Missing "name" query parameter.');
            return;
        }
        fs.unlink(filepath, (err) => { //fs.unlink() used to delete files
            if(err) {
                res.end(`Error deleting file: ${err.message}`);
            } else {
                res.end(`File "${filename}" deleted successfully.`);
            }
        });
    }

    else { // Help Message 
        res.end(
            `Welcome to File Manager!\n\nUse the following endpoints:\n` +
            `/create?name=filename.txt&content=Hello\n` +
            `/read?name=filename.txt\n` +
            `/delete?name=filename.txt`
        );
    }
});

server.listen(3000, () => { //HTTP Server running on port 3000
    console.log('Server running on http://localhost:3000');
});