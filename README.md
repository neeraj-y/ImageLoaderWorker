# ImageLoaderWorker
Web worker to load images in parallel

For pre-loading image resources, we'll create a separate thread (aka Web Worker, which will execute in parallel to our main thread) that will fetch image over http.
Note: In normal scenario, when we create image using javascript, we bind to `onload` event, which is fired once image is loaded completely.

e.g. 
`let image = new Image();
image.src = "myverylargedummyimage.jpg";
image.onload = () => document.querySelector("#your-intended-parent-div").appendChild(image);`

When this <img> tag is inserted ton DOM, a browser paint event is triggered which is synchronous in nature and causes main thread to block.
If the image is a large image, this can cause janking effect on UI.

Note:: Using Promise API to asynchrnously fetching image will also result in same effect, as eventually we just delegate inserting image into DOM to a callback.

To overcome the baove side-effects, we'll utilise image.decode() API which is supported by all major desktop and mobile browsers.
The syntax for image.decode() API is similar to Promise API i.e. we can use .then/.catch().

e.g.
`let image = new Image();
image.src = "myverylargedummyimage.jpg";
image.decode()
  .then(() => document.querySelector("#your-intended-parent-div").appendChild(image))
  .catch(() => console.error("encountered error while decoding image"))`
