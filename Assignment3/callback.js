function firstTask(callback) {
    setTimeout(() => {
        console.log('First Task done');
        callback(null,'Result of first task')
    }, 1000);
}

function secondTask(datafromFirst, callback) {
    setTimeout(() => {
        console.log('Second Task done',datafromFirst);
        callback(null, 'Result of second task');
    }, 1000);
}

//Callback hell
firstTask((err,result1) => {
    if(err) {
        console.log('Error to first task', err);
        return;
    }
    secondTask(result1,(err,result2) => {
        if(err) {
            console.log('Error to second task', err);
            return;
        }
    console.log('All task completed', result2);
    })
})

