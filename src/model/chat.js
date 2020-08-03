import Model from "./model";
import Firebase from "../util/firebase";

export default class Chat extends Model{
   constructor() {
      super();
   }

   get users() { return this._data.users }
   set users(value) { this._data.users = value }

   get timestamp() { return this._data.timestamp }
   set timestamp(value) { this._data.timestamp = value }

   static getRef() {
      return Firebase.db().collection('chats');
   }

   static createIfNotExists(meEmail, contactEmail) {
      return new Promise((resolve, reject) => {
         Chat.find(meEmail, contactEmail).then(chats => {
            if(chats.empty) {
               Chat.create(meEmail, contactEmail).then(chat => {
                  resolve(chat);
               });
            } else {
               chats.forEach(chat => {
                  resolve(chat);
               });
            }
         }).catch(err => reject(err));
      });
   }

   static create(meEmail, contactEmail) {
      return new Promise((resolve, reject) => {
         const users = {};

         users[btoa(meEmail)] = true;
         users[btoa(contactEmail)] = true;

         Chat.getRef().add({
            users,
            timestamp: new Date(),

         }).then(doc => {
            Chat.getRef().doc(doc.id).get().then(chat => {
               resolve(chat);
            });

         }).catch(err => reject(err));
      });
   }

   static find(meEmail, contactEmail) {
      return Chat.getRef()
         .where(btoa(meEmail), '==', true)
         .where(btoa(contactEmail), '==', true)
         .get();
   }
}