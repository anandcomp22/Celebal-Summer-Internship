const fs = require('node:fs/promises')

/*console.log('first');

fs.readFile("file.txt", "utf-8")
.then((data) => console.log(data))
.catch((error) => console.log(error))

console.log('second')*/


async function readFile() {
    try {
        const data = await fs.readFile('file.txt', 'utf-8');
        console.log(data);
    } catch(error) {
        console.log(error);
    }
}

readFile();