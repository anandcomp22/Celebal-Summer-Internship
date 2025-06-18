const userleft = false;
const userWatchingCatMeme = true;

function watchTutorialPromise() {
    return new Promise((resolve, reject) => {
    if(userleft) {
        reject({
            name: 'User Left',
            message: ':('
        })
    } else if (userWatchingCatMeme) {
        reject({
            name: 'User Watching Cat Meme',
            message: 'WebDevSimplified < Cat'
        })
    } else {
        resolve('Thumbs up and Subscribe');
    }
})
}

watchTutorialPromise()
    .then((message) => {
        console.log('Success: ' + message);
    }) 
    .catch((error) => {
        console.log(`Error: ${error.name} - ${error.message}`);
    });