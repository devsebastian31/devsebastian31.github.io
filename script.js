document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();  // Previene el comportamiento predeterminado de enviar el formulario

        const formData = new FormData(form);
        const formObject = {};
        formData.forEach(function (value, key) {
            formObject[key] = value;
        });

        // Resetea el contenedor de resultados antes de enviar
        const resultContainer = document.getElementById('result-container');
        resultContainer.innerHTML = '';  // Limpiar mensajes previos

        fetch(form.action, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor");
            }
            return response.json();
        })
        .then(data => {
            if (data.ok) {
                resultContainer.innerHTML = '<p class="success-message">Mensaje enviado con éxito. ¡Gracias por contactarnos!</p>';
            } else {
                resultContainer.innerHTML = '<p class="error-message">Error al enviar el mensaje. Inténtelo nuevamente más tarde.</p>';
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            resultContainer.innerHTML = '<p class="error-message">Error al enviar el mensaje. Inténtelo nuevamente más tarde.</p>';
        });
    });
});



