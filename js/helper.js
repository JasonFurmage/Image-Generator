// ------------------------------------------
//  HELPER
// ------------------------------------------

// Get selected account in a more readable way.
function getSelectedAccount() {
    return selectMenuEL.value;
}

// Use regex to check if email address is valid.
function isValidEmail(string) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(string);
}

// Create username for library screen by using first part of email address.
function getUsername() {
    const email = getSelectedAccount();
    const username = capitalizeFirstLetter(email.split('@')[0]);
    return username;
}

// Capitalise first letter of a string.
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
