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

async function runTask() {
    try{
        const result1 = await firstTask();
        const result2 = await secondTask(result1);
        console.log("All task completed: ",result2);
    } catch(error) {
        console.error("Error occured: ", error);
    }
}

runTask();