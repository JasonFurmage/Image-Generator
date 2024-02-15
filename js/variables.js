// The key will be an email address and the value will be an array of image urls.
const savedImages = {};

// Stores most recently fetched image url.
let currentImageURL;


// ------------------------------------------
//  CONTENT ELEMENTS
// ------------------------------------------

const contentEL = document.getElementById('content');
const contentWrapperEL = document.getElementById('content-wrapper');

// ------------------------------------------
//  MAIN ELEMENTS
// ------------------------------------------

const mainEL = document.getElementById('main');

// ------------------------------------------
//  LIBRARY ELEMENTS
// ------------------------------------------

const libraryEL = document.getElementById('library');
const libraryBackgroundEL = document.getElementById('library-background');
const libraryButtonEL = document.getElementById('library-button');
const libraryTitleEL = document.getElementById('library-title');
const gridEL = document.getElementById('grid');

// ------------------------------------------
//  ACCOUNTS ELEMENTS
// ------------------------------------------

const accountsWrapperEL = document.getElementById('accounts-wrapper');
const selectMenuEL = document.getElementById('select-menu');
const accountsNewEL = document.getElementById('accounts-new');
const textFieldEL = document.getElementById('text-field');

// ------------------------------------------
//  IMAGE ELEMENTS
// ------------------------------------------

const imageWrapperEL = document.getElementById('image-wrapper');
const imageEL = document.getElementById('image');
