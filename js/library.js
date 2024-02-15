// ------------------------------------------
//  LIBRARY
// ------------------------------------------

// Remove 'md-only' to show mobile library and hide main.
function showLibrary() {
    libraryEL.classList.remove("md-only");
    mainEL.style.display = 'none';
}

// Add 'md-only' to hide mobile library and show main.
function hideLibrary() {
    libraryEL.classList.add("md-only");
    mainEL.style.display = 'flex';
}

// Show library button (for mobile library).
function showLibraryButton() {
    libraryButtonEL.style.display = 'block';
}

// Hide library button (for mobile library).
function hideLibraryButton() {
    libraryButtonEL.style.display = 'none';
}

// Set title for mobile library.
function setLibraryTitle() {
    libraryTitleEL.textContent = `${getUsername()}'s Library`;
}

// Get image count for selected library.
function getImageCount() {
    const library = savedImages[getSelectedAccount()];
    return library ? library.length : 0;
}

// Update library button title to display image count.
function updateLibraryButton() {
    libraryButtonEL.textContent = `View Saved Images (${getImageCount()})`;
}

// Use image count to determine whether 'No Saved Images' background should be visible.
function updateLibraryBackground() {
    const imageCount = getImageCount();
    libraryBackgroundEL.style.display = imageCount > 0 ? 'none' : 'block';
}

// Insert current image into library grid.
function insertCurrentImage() {
    gridEL.insertAdjacentHTML('afterbegin', '<div class="grid-item"><img src="' + currentImageURL + '"></div>');
}

// Loop through array of image urls and insert images into library grid.
function insertLibraryImages() {
    if (getImageCount() === 0) return; 

    const imageURLs = savedImages[getSelectedAccount()];

    for (let url of imageURLs) {
        gridEL.insertAdjacentHTML('afterbegin', '<div class="grid-item"><img src="' + url + '"></div>');
    }
}

// We call this when switching libraries so the title, images, count and background for each library are correct.
function loadSelectedLibrary() {
    setLibraryTitle();
    insertLibraryImages();
    updateLibraryButton();
    updateLibraryBackground();
}

// We call this when we want to show any empty library (e.g. when user has selected 'choose account' or 'add account')
function unloadPreviousLibrary() {
    gridEL.innerHTML = "";
    updateLibraryBackground();
}

// Add current image url to selected account and update library.
function saveImage() {
    if (!currentImageURL) return;

    if (selectMenuEL.value === 'default' || selectMenuEL.value === 'new') {
        $.notifi("No account selected.", { noticeClass:'custom-class failure' })
    } else {

        const imageURLs = savedImages[getSelectedAccount()];

        if (!imageURLs.includes(currentImageURL)) {

            imageURLs.push(currentImageURL);
            insertCurrentImage();
            updateLibraryButton();
            updateLibraryBackground();
            
        } else {
            $.notifi("Image has already been saved to this account.", { noticeClass:'custom-class failure' })
        }
    }
}
