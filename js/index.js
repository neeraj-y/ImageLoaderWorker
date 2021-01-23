const ImageLoaderWorker = new Worker("./../js/worker/image-loader.worker.js");

// creating image tags of format :: `<img data-src="" >`
const arr = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsc3fxFrgPYqwEA1oS6pVfc0mpJVgiTA6iWA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyOfyaHzIg7dqOVc-nx6pA5xASvkJ9iyeGIw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXs91BeBnh_YnINvIRE7VVbnkjd6lBjF261g&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgVDYdBWuLWCxg_RcWaLxRkKz9Z3llNETlVQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-jRv-_KU_kLExROD2inYdbJQVCsnlvqUkyQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFuQnOaqjT-Hh2DfGhQENWamaC4J4fpVAQHw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWT8xTgSWAxGep9G98Ch5dEwXk-mNxMwR1Pg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbGww9CmyBkDBNMBhyc9vIDNqpL5Ka22Hu3w&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOlKSQdEQZsiVHTZ5ueDmOa_RSd3SIxpR5eg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiZ9S5xCX_abO_skY7YptFPdHCTakLwZz3xQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5U9LBOYVjLl7P1Zc3a9QA54MF_-sGxkY6Uw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTozv_4cnJg5XPEsNuNeymLlMzN_xJMcpMiew&usqp=CAU",
];

// we'll be utlising image.decode() API in this example
arr.forEach((src) => ImageLoaderWorker.postMessage(src));

// post fetching images, store in list
let fetchedImages = {};
ImageLoaderWorker.addEventListener("message", (event) => {
    // Grab the message data from the event
    const { imageBlob, imageURL } = event.data;

    // We can use the `Blob` as an image source! We just need to convert it
    // to an object URL first
    const objectURL = URL.createObjectURL(imageBlob);

    // Get the original element for this image
    // let $imgElem = new Image();
    // $imgElem.src = objectURL;

    // push to list
    fetchedImages[imageURL] = objectURL;

    // $imgElem.decode().then(() => {
    //     document.querySelector("#root").appendChild($imgElem);
    //     // We'll also revoke the object URL now that it's been used to prevent the
    //     // browser from maintaining unnecessary references
    //     URL.revokeObjectURL(objectURL);
    // })
    // .catch(() => new Error("Error in decoding image"));

    document.querySelector("#root").removeAttribute("style");
});

// in react, we'll assign image src from here
// Note: we need not append img tag to DOM here
window.getImage = key => fetchedImages[key] ?? key;


/**
 * To use above sample
 */
var el = document.createElement("img");
el.src = getImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsc3fxFrgPYqwEA1oS6pVfc0mpJVgiTA6iWA&usqp=CAU");
document.querySelector("#root").appendChild(el);
