const firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');
require('firebase/storage');

export default class Firebase {
   constructor() {
      this._firebaseConfig = {
         apiKey: "AIzaSyDCRYf6GIhe11f5CbvCzPqlwJ9TWD2FU7Q",
         authDomain: "whatsapp-project-f8011.firebaseapp.com",
         databaseURL: "https://whatsapp-project-f8011.firebaseio.com",
         projectId: "whatsapp-project-f8011",
         storageBucket: "whatsapp-project-f8011.appspot.com",
         messagingSenderId: "878357743201",
         appId: "1:878357743201:web:5a110de77b2107a197cc20"
      }

      this.init();
   }

   init() {
      if(firebase.apps.length == 0) firebase.initializeApp(this._firebaseConfig);
   }

   static db() {
      return firebase.firestore();
   }

   static hd() {
      return firebase.storage();
   }

   initAuth() {
      return new Promise((resolve, reject) => {
         let provider = new firebase.auth.GoogleAuthProvider();

         firebase.auth().signInWithPopup(provider)
            .then(result => {
               let token = result.credential.accessToken;
               let user = result.user;

               resolve({
                  token,
                  user
               });

            })
            .catch(err => reject(err));
      });
   }
}