
let gallery = document.getElementById('gallery');
const client_id = 'lbqpylNqIhLb7oYSyggP5rb2sqCCTOA5L5dSGsvrYBQ';
const apiUrl = `https://api.unsplash.com/photos/?client_id=${client_id}`;
let photos = [];

async function getImages() {
    try {
        // const response = await fetch(apiUrl);
        // photos = await response.json();
        photos = await fetch(apiUrl).then(items => { return items.json() });
        console.log("Photos: ", photos);

        displayPhotos();
    } catch (e) {
        console.log("Error:", e);
    }
}

// Function to create <a>, <img> tag dynamically 
function createTags(element, attributes) {

    for (key in attributes)
        element.setAttribute(key, attributes[key])
}

function displayPhotos() {

    photos.forEach((item) => {
        console.log("Item:", item)
        const anchor = document.createElement('a');
        console.log(anchor);
        // Belowe we create the <a> &<img> tag to inject inside the .gallery container

        createTags(anchor, {
            href: item.links.html,
            target: '_blank'
        })
        const img = document.createElement('img');
        createTags(img, {
            src: item.urls.regular,
            title: item.alt_description,
            alt: item.alt_description
        })
        anchor.appendChild(img)
        gallery.appendChild(anchor)
    })
    console.log(anchor)
    // anchor.setAttribute('href','https://unsplash.com/photos/X1GZqv-F7Tw')
    // anchor.setAttribute('target','_blank');



    // img.setAttribute('src','https://images.unsplash.com/photo-1665686377065-08ba896d16fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')
    // img.setAttribute('title','Dog photo near a cave');
    // img.setAttribute('alt','Dog photo near a cave')
    // console.log(anchor)
    // console.log(img)
}
getImages();

// displayPhotos();



