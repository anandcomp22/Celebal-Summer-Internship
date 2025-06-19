"use strict";
const makeError = () => {
    let i = 0;
    while (i <= 5) {
        try {
            if(i % 2 !== 0) {
                throw new Error("Old number");
            }
            console.log("Even number!")
        } catch (err) {
            console.error(err.stack);
        } finally {
            console.log("...finally");
            i++;
        }
    }
    
};

makeError();