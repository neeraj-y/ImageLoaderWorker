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

arr.forEach((src) => {
    let $imageEl = document.createElement("img");
    $imageEl.dataset.src = src;
    document.querySelector("#root").appendChild($imageEl);
    ImageLoaderWorker.postMessage(src);
});

// ============================================================================================== //
// NOTE ===> no need of this extra loop, if we're creating img tags using javascript as above

// loop on all data-src elements
// const $imgElements = document.querySelectorAll("img[data-src]");
// $imgElements.forEach($el => {
//     const imgURL = $el.getAttribute("data-src");

//     // send message to worker
//     ImageLoaderWorker.postMessage(imgURL);
// });
// ============================================================================================== //

ImageLoaderWorker.addEventListener("message", (event) => {
    // Grab the message data from the event
    const { imageURL, imageBlob } = event.data;

    // Get the original element for this image
    const imageElement = document.querySelector(`img[data-src='${imageURL}']`);

    // We can use the `Blob` as an image source! We just need to convert it
    // to an object URL first
    const objectURL = URL.createObjectURL(imageBlob);

    imageElement.onload = () => {
        // Let's remove the original `data-src` attribute to make sure we don't
        // accidentally pass this image to the worker again in the future
        imageElement.removeAttribute("data-src");

        // We'll also revoke the object URL now that it's been used to prevent the
        // browser from maintaining unnecessary references
        URL.revokeObjectURL(objectURL);
    };
    imageElement.setAttribute("src", objectURL);
});