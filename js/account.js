// ------------------------------------------
//  ACCOUNT
// ------------------------------------------

// Show add account section and hide the select menu.
function showAddAccount() {
    accountsNewEL.style.display = 'flex';
    selectMenuEL.style.display = 'none';
}

// Hide add account section, show select menu, clear email address from text field, and reset select menu to default if currently on new.
function hideAddAccount() {
    accountsNewEL.style.display = 'none';
    selectMenuEL.style.display = 'block';
    textFieldEL.value = '';
    textFieldEL.classList.remove('error');
    if (selectMenuEL.value === 'new') selectMenuEL.value = 'default';
}

// Add account to saved images object and select menu, show library button, and load new library.
function addAccount() {
    const email = textFieldEL.value;

    if (isValidEmail(email)) {

        if (isDuplicateAccount(email)) { 
            $.notifi("Account already exists.", { noticeClass:'custom-class failure' });
            textFieldEL.classList.add('error'); 
            return; 
        }

        savedImages[email] = [];
        addSelectMenuOption(email);
        showLibraryButton();
        loadSelectedLibrary();
        hideAddAccount();

        $.notifi("Account added successfully.", { noticeClass:'custom-class success' })
    } else {
        textFieldEL.classList.add('error');
        $.notifi("Please enter a valid email address.", { noticeClass:'custom-class failure' })
    }
}

// Add account to select menu and make it the selected value.
function addSelectMenuOption(email) {
    const newOption = document.createElement("option");
    newOption.value = email;
    newOption.textContent = email;
    selectMenuEL.appendChild(newOption);
    selectMenuEL.value = email;
}

// Check keys of saved images object to see if account has already been added.
function isDuplicateAccount(email) {
    const accounts = Object.keys(savedImages);
    return (accounts.includes(email));
}
