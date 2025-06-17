/*const message = function () {
    console.log("This message is shown affter 3 seconds");
}

setTimeout(message,3000);

setTimeout(() => {
    console.log("This message is shown affter 2 seconds")
}, 2000);*/

window.onload = function () {
  document.querySelector("#callback-btn")
    .addEventListener("click", function () {
      alert("User has clicked on the button!");
    });
};
