// This entire file is a mess and needs to be cleaned up so there are probably bugs and missing features. //

const contentEL = document.getElementById('content');
const contentWrapperEL = document.getElementById('content-wrapper');
const mainEL = document.getElementById('main');
const libraryEL = document.getElementById('library');
const libraryEmptyEL = document.getElementById('library-background');
const accountsEL = document.getElementById('accounts');
const selectEL = document.getElementById('select-menu');
const newEL = document.getElementById('accounts-new');
const emailEL = document.getElementById('email');
const imageWrapperEL = document.getElementById('image-wrapper');
const imageEL = document.getElementById('image');
const libraryButtonEL = document.getElementById('lib-button');
const libraryTitleEL = document.getElementById('library-title');
const libraryGridEL = document.getElementById('grid');

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
        $.notifi("Could not generate new image.", { noticeClass:'custom-class' });
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

function setAccountsPosition() {
    if (window.innerWidth >= 768) {
        if (accountsEL.parentNode === mainEL) { mainEL.removeChild(accountsEL); }
        if (accountsEL.parentNode !== contentEL) { contentEL.insertBefore(accountsEL, contentWrapperEL); }
        mainEL.style.display = 'flex';
        libraryEL.classList.add('md-only');
        insertSavedImages()
    } else {
        if (accountsEL.parentNode === contentEL) { contentEL.removeChild(accountsEL); }
        if (accountsEL.parentNode !== mainEL) { mainEL.insertBefore(accountsEL, imageWrapperEL); }
        
    }
}

setAccountsPosition();

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

selectEL.addEventListener('change', function() {
    currentAccount = selectEL.value;
    currentAccount === 'new' ? showAddAccount() : hideAddAccount();
    libraryButtonEL.style.display = currentAccount !== 'new' && currentAccount !== 'default' ? 'block' : 'none';
    updateLibraryButtonTitle();
    updateLibraryTitle();
    insertSavedImages()
    updateLibraryEmptyText();
});

window.addEventListener('resize', function() {
    setAccountsPosition()
});

// ------------------------------------------
//  ACCOUNT FUNCTIONS
// ------------------------------------------

function addAccount() {
    const email = emailEL.value;
    isValidEmail(email) ? (insertAccount(email), currentAccount = email, hideAddAccount()) : $.notifi("Please enter a valid email address", { noticeClass:'custom-class' });
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
    libraryEL.classList.toggle("md-only");
    insertSavedImages();
}

function hideLibrary() {
    libraryEL.classList.toggle("md-only");
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

function updateLibraryEmptyText() {

    let imageURLs = accounts[currentAccount];

    if (imageURLs) {
        libraryEmptyEL.style.display = imageURLs.length > 0 ? 'none' : 'block';
    } else {
        libraryEmptyEL.style.display = 'block'
    }
}

function insertSavedImage() {
    libraryGridEL.insertAdjacentHTML('afterbegin', '<div class="grid-item"><img src="' + currentImageURL + '"></div>');
}

function insertSavedImages() {
    libraryGridEL.innerHTML = "";
    updateLibraryEmptyText();
    if (!accounts[currentAccount]) return;

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
    imageEL.src = imgURL;
}

function nextImage() {
    currentImageURL = null;
    fetchImage();
}

function saveImage() {
    if (!currentImageURL) { return; }
    if (currentAccount == 'default' || currentAccount == 'new') { $.notifi("No account selected.", { noticeClass:'custom-class' }); return; }
    !accounts[currentAccount].includes(currentImageURL) ? (accounts[currentAccount].push(currentImageURL), insertSavedImage()) : $.notifi("Image already exists on this account.", { noticeClass:'custom-class' });;
    updateLibraryButtonTitle();
    updateLibraryEmptyText();
}
