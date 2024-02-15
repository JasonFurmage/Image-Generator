// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

// Listen for select menu changes so we can show the selected account library or new account section.
selectMenuEL.addEventListener('change', function() {
    if (selectMenuEL.value === 'default' || selectMenuEL.value === 'new') {
        if (selectMenuEL.value === 'new') showAddAccount();
        hideLibraryButton();
        unloadPreviousLibrary();
    } else {
        showLibraryButton();
        unloadPreviousLibrary();
        loadSelectedLibrary();
    }
});

// Listen for focus on text field so we can remove error class.
textFieldEL.addEventListener('focus', function() {
    textFieldEL.classList.remove('error');
})

// Listen for key press on text field so we can click add when enter button is pushed.
textFieldEL.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addButtonEL.click();
        textFieldEL.blur();
    }
});

// Listen for window size changes so we can adjust element positions and visibility when necessary.
window.addEventListener('resize', function() {
    adjustElementsAccordingToWindowSize();
});

// Move accounts section and hide mobile library on screens at least 768px wide.
function adjustElementsAccordingToWindowSize() {
    if (window.innerWidth >= 768) {
        moveAccountsWrapperToContent();
        hideLibrary();
    } else {
        moveAccountsWrapperToMain();
    }
}

// Move accounts section to content so it appears above library and image.
function moveAccountsWrapperToContent() {
    if (accountsWrapperEL.parentNode === mainEL) { mainEL.removeChild(accountsWrapperEL); }
    if (accountsWrapperEL.parentNode !== contentEL) { contentEL.insertBefore(accountsWrapperEL, contentWrapperEL); }
}

// Move accounts section to main so it appears above image.
function moveAccountsWrapperToMain() {
    if (accountsWrapperEL.parentNode === contentEL) { contentEL.removeChild(accountsWrapperEL); }
    if (accountsWrapperEL.parentNode !== mainEL) { mainEL.insertBefore(accountsWrapperEL, imageWrapperEL); }
}
