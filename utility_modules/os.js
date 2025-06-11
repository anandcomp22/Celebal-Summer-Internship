var os = require('os');

console.log('Endiannes : ' + os.endianness());//LE - long term support

console.log('type : ' + os.type());

console.log('Platform  : ' + os.platform());

console.log('Total Memory : ' + os.totalmem() / 1024 + 'mbytes');

console.log('Free Memory : ' + os.freemem() / 1024 + 'mbytes');