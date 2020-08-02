export default class ClassEvent {
   constructor() {
      this._events = {}
   }

   on(eventName, fnc) {
      if(!this._events[eventName]) this._events[eventName] = [];
      this._events[eventName].push(fnc);
   }

   trigger(...args) {
      const arg = args;

      const eventName = args.shift();

      arg.push(new Event(eventName));

      if(this._events[eventName] instanceof Array) {
         this._events[eventName].forEach(fnc => {
            fnc.apply(null, arg);
         });
      }
   }
}