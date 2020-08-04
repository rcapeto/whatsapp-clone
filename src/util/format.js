export default class Format {

   static getCamelcase(id) {
      const div = document.createElement('div');

      div.innerHTML = `<div data-${id}="id"></div>`;
      
      return Object.keys(div.firstChild.dataset)[0];
   }

   static toTime(duration) {
      let seconds = parseInt((duration / 1000) % 60);
      let minutes = parseInt((duration / (1000 * 60)) % 60);
      let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

      if(hours > 0) {
         return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      } else {
         return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
   }

   static timeStampToTime(timestamp) {
      return (timestamp && typeof timestamp.toDate === 'function') 
         ? Format.dateToTime(timestamp.toDate())
         : ''
   }

   static dateToTime(time, locale = 'pt-br') {
      return time.toLocaleTimeString(locale, {
         hour: '2-digit',
         minute: '2-digit'
      });
   }

   static getType(type) {
      let fileType = '';

      switch(type) {
         case 'application/pdf':
            fileType = 'PDF';
            break;
         case 'application/vnd.ms-excel':
         case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            fileType = 'Excel'   
            break;
         case 'application/vnd.ms-powerpoint':
         case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            fileType = 'PowerPoint';
            break;
         case 'application/msword':
         case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            fileType = 'Word'
            break;
         default:
            fileType = type;

      }

      return fileType;
   }
}