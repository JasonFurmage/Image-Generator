// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

// Listen for select menu changes so we can show the selected library or new account section.
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

// Move accounts wrapper to content so it appears above library and image.
function moveAccountsWrapperToContent() {
    if (accountsWrapperEL.parentNode === mainEL) { mainEL.removeChild(accountsWrapperEL); }
    if (accountsWrapperEL.parentNode !== contentEL) { contentEL.insertBefore(accountsWrapperEL, contentWrapperEL); }
}

// Move accounts wrapper to main so it appears above image.
function moveAccountsWrapperToMain() {
    if (accountsWrapperEL.parentNode === contentEL) { contentEL.removeChild(accountsWrapperEL); }
    if (accountsWrapperEL.parentNode !== mainEL) { mainEL.insertBefore(accountsWrapperEL, imageWrapperEL); }
}
