const selectEL = document.getElementById('accounts');
const newEL = document.getElementById('new');
const emailEL = document.getElementById('email');
const pictureEL = document.getElementById('picture');
const errorEL = $('#error');
const accounts = {};
let selectedValue = 'default';

selectEL.addEventListener('change', function() {
    selectedValue = selectEL.value;
    newEL.style.display = selectedValue === 'new' ? showAddAccount() : hideAddAccount();
});

function addAccount() {
    const email = emailEL.value;
    errorEL.hide();

    if (isValidEmail(email)) {
        insertAccount(email);
        selectedValue = email;
        hideAddAccount();
    } else {
        errorEL.fadeIn(1000);
    }
}

function insertAccount(email) {
    const newOption = document.createElement("option");
    newOption.value = email;
    newOption.textContent = email;
    selectEL.appendChild(newOption);
    accounts[email] = [];
}

function showAddAccount() {
    newEL.style.display = 'flex';
    selectEL.style.display = 'none';
}

function hideAddAccount() {
    newEL.style.display = 'none';
    selectEL.style.display = 'block';
    errorEL.hide();
    emailEL.value = '';
    if (selectedValue === 'new') selectedValue = 'default';
    selectEL.value = selectedValue;
}

function isValidEmail(value) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value);
}

fetch('https://picsum.photos/400/300')
    .then (response => response.url)
    .then (imgURL => displayImage(imgURL))

function displayImage(imgURL) {
    const img = document.createElement('img');
    img.src = imgURL;
    pictureEL.prepend(img);
}


















// // Initialize an array to store image URLs
// var imageUrls = [];

// // Function to fetch image URLs from Picsum
// function fetchImageUrls() {
//   fetch('https://picsum.photos/200/300') // Fetch a random image from Picsum with dimensions 200x300
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.url; // Get the URL of the image
//     })
//     .then(url => {
//       imageUrls.push(url); // Store the URL in the array
//       displayImages(); // Call a function to display the images (see below)
//     })
//     .catch(error => {
//       console.error('There was a problem with the fetch operation:', error);
//     });
// }

// // Function to display images using the stored image URLs
// function displayImages() {
//   imageUrls.forEach(url => {
//     const img = document.createElement('img');
//     img.src = url;
//     document.body.appendChild(img); // Append the image to the document body
//   });
// }

// // Fetch multiple image URLs and store them in the array
// fetchImageUrls();