/*function first(callback) {
    setTimeout(function () {
        console.log("first");
        callback()
    },2000);
}

function second(callback) {
    setTimeout(function () {
        console.log("second");
        callback()
    },1000);
}

function third() {
    setTimeout(function () {
        console.log("third");
    },500);
}

first(function() {
    second(function() {
        third();
    });
});*/


function firstTask(callback) {
    const randomNumber = Math.floor(Math.random() * 10);
    if(randomNumber == 1) {
        callback(new Error("Error executing first task"));
    } else {
        setTimeout(function() {
            console.log("first task");
            callback();
        }, 700);
    }
}

function secondTask(callback) {
    const randomNumber = Math.floor(Math.random() * 10);
    if(randomNumber == 1) {
        callback(new Error("Error executing second task"));
    } else {
        setTimeout(function() {
            console.log("second task");
            callback();
        }, 1500);
    }
}

function thirdTask() {
    const randomNumber = Math.floor(Math.random() * 10);
    if(randomNumber == 1) {
        console.log(new Error("Error executing third task"));
    } else {
        setTimeout(function() {
            console.log("third task");
            console.log("third task completed successfully");
        }, 500);
    }
}


firstTask(function (error) {
    if(error) {
        console.log("Fail to execute first task")
    } else {
        console.log("First task completed successfully");
    }
    secondTask(function (error) {
        if(error) {
            console.log("Fail to execute second task")
        } else {
            console.log("second task completed successfully");
        }
        thirdTask();
    });
});