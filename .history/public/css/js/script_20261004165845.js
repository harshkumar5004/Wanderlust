console.log("SCRIPT LOADED");

(() => {
    "use strict";

    const forms = document.querySelectorAll(".needs-validation");

    console.log("Forms found:", forms.length);

    Array.from(forms).forEach((form) => {

        form.addEventListener("submit", (event) => {

            console.log("SUBMIT EVENT");

            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();

                console.log("FORM IS INVALID");
            } else {
                console.log("FORM IS VALID");
            }

            form.classList.add("was-validated");

        }, false);

    });

})();