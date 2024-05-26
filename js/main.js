// Check sessionStorage for 'visited' flag
let startscreen = document.querySelector('#container-startscreen');
let flag = sessionStorage.getItem('visited');

// console.log(startscreen);

// Function to toggle start screen visibility
function toggleStartScreen() {
  if (flag === 'true') {
    startscreen.style.display = 'none';
  } else {
    startscreen.style.display = 'block';
  }
}

// Call the function to toggle start screen visibility
if (startscreen) {
toggleStartScreen();
}
