let p = new Promise((resolve, reject) => {
    let a = 1 + 3;
    if(a == 2) {
        resolve('Successful');
    } else {
        reject('Failed');
    }
});

p.then((message) => {
    console.log('This is in the then ' + message);
}) .catch((message) => {
    console.log('This is in the catch ' + message);
})