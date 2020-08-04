export default class Base64 {
   static getMimetype(urlBase64) {
      const regex = /^data:(.+);base64,(.*)$/;
      const result = urlBase64.match(regex);
      return result[1];
   }

   static toFile(urlBase64) {
      const mimeType = Base64.getMimetype(urlBase64);
      const extension = mimeType.split('/')[1];
      const filename = `file${Date.now()}.${extension}`;

      return fetch(urlBase64).then(response => {
         return response.arrayBuffer();

      }).then(buffer => {
         return new File([buffer], filename, { type: mimeType});
      })
   }
}