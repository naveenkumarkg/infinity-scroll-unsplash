let gallery = document.getElementById('gallery');
const loader = document.getElementById('loader_1');
const client_id = 'I6O4m0PAwnH4uMLa3Yy9rnqLi2EMCwoY0bhc4bCBzRc';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${client_id}&count=30`;
let photos = [];
let ready = false;

let totalImages = 0
let loadedimage = 0;



async function getPhotos() {
    try {
        // const listImages = await fetch(apiUrl);
        // photos = await listImages.json();
        photos = await fetch(apiUrl).then((images) => { return images.json() });
        console.log('Photos : ', photos);
        displayPhotos()

    } catch (e) {
        console.log("Error :", e);
    }
}

function createAttribute(element, attributes) {
    console.log(element)
    console.log(attributes)

    for (key in attributes) {
        // a.setAttribute('href',photo.links.html);
        element.setAttribute(key, attributes[key])
    }

}

function displayPhotos() {
    totalImages = photos.length;
    loadedimage = 0;
    photos.forEach((photo) => {
        console.log('Photo : ', photo)

        const a = document.createElement('a')
        const img = document.createElement('img');


        createAttribute(a, {
            href: photo.links.html,
            target: '_blank'
        })

        createAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        img.addEventListener('load', imageLoaded);

        a.appendChild(img);
        gallery.appendChild(a);
    })
}

function imageLoaded() {

    loadedimage++;
    loader.hidden = ready;
    if (loadedimage == totalImages) {
        ready = true;
        loader.hidden = ready;
    }
}



window.addEventListener('scroll', function () {
    console.log('Scroll: ', Math.floor(window.scrollY));
    let scrollY = Math.floor(window.scrollY)

    // console.log('Inner Height: ', window.innerHeight)
    // console.log('Offset Height [Total Height]: ', document.body.offsetHeight);

    // console.log('Y + InnerHeight', window.scrollY + window.innerHeight);
    // console.log('offsetHeight', document.body.offsetHeight - 1000);
    if (window.innerHeight + scrollY >= document.body.offsetHeight - 1000 && ready) {

        getPhotos();
        ready = false;

    }
})




getPhotos();