class Format {
   static getCamelcase(id) {
      const div = document.createElement('div');

      div.innerHTML = `<div data-${id}="id"></div>`;
      
      return Object.keys(div.firstChild.dataset)[0];
   }
}