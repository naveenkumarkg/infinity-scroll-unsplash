let gallery = document.getElementById('gallery');
const loader = document.getElementById('loader_1');
const client_id = 'lbqpylNqIhLb7oYSyggP5rb2sqCCTOA5L5dSGsvrYBQ';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${client_id}&count=30`;
let photos = [];
let ready = false;
let totalImages = 0;
let Loadedimage = 0;

// Single loading
// loader.hidden = false;

async function getPhotos() {
    photos = await fetch(apiUrl).then(items => items.json());
    displayPhotos();
}

function createElements(Element, attributes) {
    for (key in attributes) {
        Element.setAttribute(key, attributes[key])
    }
}

function displayPhotos() {
    Loadedimage = 0;
    totalImages = photos.length;
    photos.forEach((photo) => {
        const anchor = document.createElement('a');
        const img = document.createElement('img');
        createElements(anchor, {
            href: photo.links.html,
            target: '_blank'
        });

        createElements(img, {
            src: photo.urls.regular,
            title: photo.alt_description,
            alt: photo.alt_description

        });
        img.addEventListener('load', imageLoaded);
        anchor.appendChild(img);
        gallery.appendChild(anchor);
       
    });

    //  Image Load functionality

}

window.addEventListener('scroll', function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
         getPhotos();
        console.log('repeat')
    }
});



function imageLoaded() {
    console.log('Image Loaded');
    Loadedimage++;
    // Multiple loading 
    loader.hidden = ready;
    if (Loadedimage === totalImages) {
        ready = true;
        loader.hidden = true;
        
    }
}

getPhotos();