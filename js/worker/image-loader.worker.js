// the `message` event is fired in a web worker any time `worker.postMessage(<data>)` is called
// `event.data` represents the data being passed into a worker via `worker.postMessage(<data>)`

// listen for event
self.addEventListener("message", async (event) => {
    // read data passed in event
    const imageURL = event.data;

    // use fetch to async load image over http
    const response = await fetch(imageURL);

    // unlike response.json() for json data, we'll use response.blob() for binary
    const imageBlob = await response.blob();

    // send the image data to the UI thread
    self.postMessage({
        imageURL,
        imageBlob
    });
})