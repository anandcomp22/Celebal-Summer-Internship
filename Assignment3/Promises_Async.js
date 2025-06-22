function firstTask() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("First task done");
            resolve("Result of first task");
        }, 1000);
    })
}

function secondTask(datafromFirst) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Second task done', datafromFirst);
            resolve("Result of second task");
        }, 1000);
    })
}

firstTask()
    .then(result1 => secondTask(result1))
    .then(result2 => console.log("All task completed: ", result2))
    .catch(error => console.log("Error occured:", error));