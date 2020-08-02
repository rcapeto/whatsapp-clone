import ClassEvent from "../util/classEvent";

import ClassEvent from '../util/classEvent';

export default class MicrophoneController extends ClassEvent{
   constructor() {
      super();
      
      navigator.mediaDevices.getUserMedia({
         audio: true,
      }).then(stream => {
         this._stream = stream;

         let audio = new Audio();

         audio.srcObject = this._stream;

         audio.play();

         this.trigger('play', audio);
      }); 
   }

   stop() {
      this._stream.getTracks().forEach(track => {
         track.stop();
      });
   }
}