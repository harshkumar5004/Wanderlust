console.log("SCRIPT.JS LOADED");

(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {

      console.log("FORM SUBMIT EVENT");

      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();

        console.log("FORM IS INVALID");
      }

      form.classList.add('was-validated');
    }, false);
  });
})();