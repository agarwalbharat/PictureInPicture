let video = document.getElementById('video');
let pip = document.getElementById('pip');

pip.addEventListener('click', async function (event) {
    pip.disabled = true;
    try {
        if (video !== document.pictureInPictureElement)
            await video.requestPictureInPicture();
        else
            await document.exitPictureInPicture();

    } catch (error) {
        console.log(error);
    } finally {
        pip.disabled = false;
    }
});
video.addEventListener('enterpictureinpicture', function (event) {
    console.log('Entered PiP');
    pipWindow = event.pictureInPictureWindow;
});
video.addEventListener('leavepictureinpicture', function (event) {
    console.log("left PIP");
    
    pip.disabled = false;
});
if ('pictureInPictureEnabled' in document) {
    showPipButton();
    video.addEventListener('loadedmetadata', showPipButton);
    video.addEventListener('emptied', showPipButton);
} else {
    pip.hidden = true;
}

function showPipButton() {
    pip.disabled = (video.readyState === 0) || !document.pictureInPictureEnabled ||video.disablePictureInPicture;
}