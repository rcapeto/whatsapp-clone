export default class CameraController {
   constructor(video) {
      this._videoEl = video;

      navigator.mediaDevices.getUserMedia({
         video: true

      }).then(stream => {
         this._stream = stream;

         this._videoEl.srcObject = stream;

         this._videoEl.play();
      });
   }

   stop() {
      this._stream.getTracks().forEach(track => {
         track.stop();
      });
   }

   takePicture(mimeType = 'image/png') {
      const canvas = document.createElement('canvas');

      canvas.setAttribute('width', this._videoEl.videoWidth);
      canvas.setAttribute('height', this._videoEl.videoHeight);
      
      const context = canvas.getContext('2d');

      context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height);

      return canvas.toDataURL(mimeType);
   }
}