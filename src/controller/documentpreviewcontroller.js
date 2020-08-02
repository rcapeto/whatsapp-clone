const pdfjsLib = require('pdfjs-dist');
const path = require('path');

pdfjsLib.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, '../../dist/pdf.worker.bundle.js');

export default class DocumentPreviewController {
   constructor(file) {
      this._file = file;
   }

   getPreviewData() {
      return new Promise((resolve, reject) => {

         const reader = new FileReader();

         switch(this._file.type) {
            case 'image/png':
            case 'image/jpeg':
            case 'image/jpg':
            case 'image/gif':

               reader.onload = () => {
                  resolve({
                     src: reader.result,
                     info: this._file.name,
                  });
               } 

               reader.onerror = e => {
                  reject(e);
               }

               reader.readAsDataURL(this._file);

               break;
            case 'application/pdf':
               
               reader.onload = () => {
                  
                  pdfjsLib.getDocument(new Uint8Array(reader.result)).promise.then(pdf => {
                     pdf.getPage(1).then(page => {
                        const viewport = page.getViewport({
                           scale: 0.6,
                        });

                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');

                        canvas.setAttribute('width', viewport.width);
                        canvas.setAttribute('heigth', viewport.height);

                        page.render({
                           canvasContext: context,
                           viewport,
                        }).promise.then(() => {
                           const s = (pdf.numPages > 1) ? 's' : ''

                           resolve({
                              src: canvas.toDataURL('image/png'),
                              info: `${pdf.numPages} página${s}`
                           });
                        });
                     });
                  });
               }

               reader.readAsArrayBuffer(this._file);
               break;

            default: 
               reject();
         }
      });
   }
}