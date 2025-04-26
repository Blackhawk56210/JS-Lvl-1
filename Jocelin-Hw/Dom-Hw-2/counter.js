// Select elements using tag names p and button
let paragraphTag = document.getElementsByTagName("p");
let button = document.getElementsByTagName("button");
let count = 0;
display();
// Select the first paragraph and the two buttons

// Counter logic
function increaseNumber() {
  count++;
  paragraphTag[0].innerText = count;
};
console.log("increaseNumber:", increaseNumber);

function decreaseNumber() {
    count--
    paragraphTag[0].innerText = count;
}

function display() {
    paragraphTag.innerHTML = count;
}

