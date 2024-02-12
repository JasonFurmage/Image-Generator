const mainEL = document.getElementById('main');
const libraryEL = document.getElementById('library');
const selectEL = document.getElementById('accounts');
const newEL = document.getElementById('new');
const emailEL = document.getElementById('email');
const pictureEL = document.getElementById('picture');
const libraryButtonEL = document.getElementById('library-button');
const libraryTitleEL = document.getElementById('library-title');
const libraryGridEL = document.getElementById('library-grid');

const accounts = {};
let currentAccount = selectEL.value;
let currentImageURL;

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchImage() {
    fetch('https://picsum.photos/400/300')
    .then (checkStatus)
    .then (response => response.url)
    .then (imgURL => displayImage(imgURL))
    
    .catch (error => {
        console.log('There was an error fetching image:', error)
        notif('Could not generate new image.');
    });
}

fetchImage();

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
    if (response.ok) return Promise.resolve(response);
    else return Promise.reject(new Error(response.statusText));
}

function isValidEmail(value) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value);
}

function getUsername() {
    const username = capitalizeFirstLetter(currentAccount.split('@')[0]);
    return username;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

selectEL.addEventListener('change', function() {
    currentAccount = selectEL.value;
    currentAccount === 'new' ? showAddAccount() : hideAddAccount();
    libraryButtonEL.style.display = currentAccount !== 'new' && currentAccount !== 'default' ? 'block' : 'none';
    updateLibraryButtonTitle();
    updateLibraryTitle();
});

// ------------------------------------------
//  ACCOUNT FUNCTIONS
// ------------------------------------------

function addAccount() {
    const email = emailEL.value;
    isValidEmail(email) ? (insertAccount(email), currentAccount = email, hideAddAccount()) : notif('Please enter a valid email address.');
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
    emailEL.value = '';

    if (currentAccount === 'new') currentAccount = 'default';
    selectEL.value = currentAccount;
    libraryButtonEL.style.display = currentAccount !== 'new' && currentAccount !== 'default' ? 'block' : 'none';
    updateLibraryButtonTitle();
    updateLibraryTitle();
}

// ------------------------------------------
//  LIBRARY FUNCTIONS
// ------------------------------------------

function showLibrary() {
    mainEL.style.display = 'none';
    libraryEL.style.display = 'flex';
    insertSavedImages();
}

function hideLibrary() {
    libraryEL.style.display = 'none';
    mainEL.style.display = 'flex';
    libraryGridEL.innerHTML = '';
}

function updateLibraryTitle() {
    libraryTitleEL.textContent = `${getUsername()}'s Library`;
}

function updateLibraryButtonTitle() {
    if (accounts[currentAccount]) {
        const imageCount = accounts[currentAccount].length;
        libraryButtonEL.textContent = `View Saved Images (${imageCount})`;
    }
}

function insertSavedImages() {
    let imageURLs = accounts[currentAccount];

    for (let url of imageURLs) {
        libraryGridEL.insertAdjacentHTML('afterbegin', '<div class="grid-item"><img src="' + url + '"></div>');
    }
}

// ------------------------------------------
//  PICTURE FUNCTIONS
// ------------------------------------------

function displayImage(imgURL) {
    currentImageURL = imgURL;
    pictureEL.src = imgURL;
}

function nextImage() {
    fetchImage();
}

function saveImage() {
    if (!currentImageURL) { notif('No image to save.'); return; }
    if (currentAccount == 'default' || currentAccount == 'new') { notif('No account selected.'); return; }
    !accounts[currentAccount].includes(currentImageURL) ? (accounts[currentAccount].push(currentImageURL), notif('Image saved.')) : notif('Image already exists on this account.');
    updateLibraryButtonTitle();
}
