// DOM Elements
const videoGrid = document.querySelector(".video-grid")
const myVideo = document.createElement('video');

// Get Permissions
getPermissions = async () => {
    try {
        await navigator.mediaDevices.getUserMedia({ video: true })
            .then(() => this.videoAvailable = true)
            .catch(() => this.videoAvailable = false)

        await navigator.mediaDevices.getUserMedia({ audio: true })
            .then(() => this.audioAvailable = false)
            .catch(() => this.audioAvailable = false)

        // await navigator.mediaDevices.getDisplayMedia()
        //     .then(() => this.screenAvailable = true)
        //     .catch(() => this.screenAvailable = false)

        if (this.videoAvailable || this.audioAvailable) {
            navigator.mediaDevices.getUserMedia({ video: this.videoAvailable, audio: this.audioAvailable })
                .then((stream) => {
                    window.localStream = stream
                    // this.localVideoref.current.srcObject = stream
                    addVideoStream(myVideo, stream)
                })
                .then((stream) => { })
                .catch((e) => console.log(e))
        }
    } catch (e) { console.log(e) }
}
getPermissions()
function addVideoStream(video, stream) {

    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    video.playsinline = true
    videoGrid.append(video);
}

function stopVideo() {
    const html = `
        <button onclick="playVideo()">Play</button>
        `
    document.querySelector("#btn").innerHTML = html;
}
function playVideo() {

    if (this.videoAvailable || this.audioAvailable) {
        navigator.mediaDevices.getUserMedia({ video: this.videoAvailable, audio: this.audioAvailable })
            .then((stream) => {
                window.localStream = stream
                // this.localVideoref.current.srcObject = stream
                addVideoStream(myVideo, stream)
            })
            .then((stream) => { })
            .catch((e) => console.log(e))
    }

}
