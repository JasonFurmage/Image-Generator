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
    .then (checkStatus)
    .then (response => response.url)
    .then (imgURL => displayImage(imgURL))
    .catch (error => console.log('There was an error fetching image:', error));

function displayImage(imgURL) {
    const img = document.createElement('img');
    img.src = imgURL;
    pictureEL.prepend(img);
}

function checkStatus(response) {
    if (response.ok) return Promise.resolve(response);
    else return Promise.reject(new Error(response.statusText));
}
