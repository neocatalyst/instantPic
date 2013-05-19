navigator.getUserMedia ||
  (navigator.getUserMedia = navigator.mozGetUserMedia ||
  navigator.webkitGetUserMedia || navigator.msGetUserMedia);
 
if (navigator.getUserMedia) {
    navigator.getUserMedia({
      video: true
    }, onSuccess, onError);
} else {
    alert('getUserMedia is not supported in this browser.');
}
 
function onSuccess(stream) {
    var video = document.getElementById('webcam');
    var videoSource;
 
    if (window.webkitURL) {
      videoSource = window.URL.createObjectURL(stream);
    } else {
      videoSource = stream;
    }
 
    video.autoplay = true;
    video.src = videoSource;



function takePhoto() {
    var photo = document.getElementById('photo'),
        context = photo.getContext('2d');
 
    photo.width = video.clientWidth;
    photo.height = video.clientHeight;
 
    context.drawImage(video, 0, 0, photo.width, photo.height);
}

var photoButton = document.getElementById('takePhoto');
photoButton.addEventListener('click', takePhoto, false);

var saveButton = document.getElementById('savePhoto');
saveButton.addEventListener('click', savePhoto, false);

function savePhoto(){
	var canvas  = document.getElementById("photo")
	var dataurl = canvas.toDataURL(); // data:image/png;base64,iVBO...
            $.ajax({
        url: 'http://localhost:8000/save',
        type: 'POST',
        data: {
          image: dataurl
        },
        
      }).success( function() {
        alert('photo saved');
      }).error( function(error) {
      });
}






}


 
function onError() {
    alert('There has been a problem retrieving the streams - did you allow access?');
}


