import Firebase from '../util/firebase';
import Model from './model';

export default class User extends Model{
   constructor(id) {
      super();

      if(id) this.getById(id);
   }

   static getRef() {
      return Firebase.db().collection('users');
   }

   static findByEmail(email) {
      return User.getRef().doc(email);
   }

   static getContactsRef(id) {
      return User.findByEmail(id).collection('contacts')
   }

   getById(id) {
      return new Promise((resolve, reject) => {
         User.findByEmail(id).onSnapshot(doc => {
            this.fromJSON(doc.data());

            resolve(doc);   
         })
      });
   }

   save() {
      return User.findByEmail(this.email).set(this.toJSON());
   }

   addContact(contact) {
      return User.findByEmail(this.email).collection('contacts')
         .doc(btoa(contact.email))
         .set(contact.toJSON());
   }

   getContacts(filter = '') {
      return new Promise((resolve, reject) => {
         User.getContactsRef(this.email).where('name', '>=', filter).onSnapshot(docs => {
            const contacts = [];
            
            docs.forEach(doc => {
               const data = doc.data();

               data.id = doc.id;

               contacts.push(data);
            });
            this.trigger('contactschange', docs);

            resolve(contacts);
         });
      });
   }

   get name() {
      return this._data.name;
   }
   set name(value) {
      this._data.name = value;
   }
   get email() {
      return this._data.email;
   }
   set email(value) {
      this._data.email = value;
   }
   get photo() {
      return this._data.photo;
   }
   set photo(value) {
      this._data.photo = value;
   }
   get chatId() {
      return this._data.chatId;
   }
   set chatId(value) {
      this._data.chatId = value;
   }
}