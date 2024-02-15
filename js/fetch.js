// ------------------------------------------
//  FETCH
// ------------------------------------------

// Fetch and display random image from picsum.
function fetchImage() {
    fetch('https://picsum.photos/400/300')
    .then (checkStatus)
    .then (response => response.url)
    .then (imgURL => displayImage(imgURL))
    
    .catch (error => {
        console.log('There was an error fetching image:', error)
        $.notifi("There was an error fetching image.", { noticeClass:'custom-class failure' });
    });
}

// Check if request was successful.
function checkStatus(response) {
    return response.ok ? Promise.resolve(response) : Promise.reject(new Error(response.statusText));
}

// Display the fetched image and store image URL.
function displayImage(imgURL) {
    currentImageURL = imgURL;
    imageEL.src = imgURL;
}

// Clear stored image URL and fetch new image.
function nextImage() {
    currentImageURL = null;
    fetchImage();
}
