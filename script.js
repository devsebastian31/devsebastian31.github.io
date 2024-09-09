document.addEventListener('DOMContentLoaded', function () {
    // Espera a que el DOM esté completamente cargado antes de ejecutar el código
    const form = document.getElementById('contactForm');
    // Obtiene el formulario con el id 'contactForm' para poder trabajar con él

    form.addEventListener('submit', function (event) {
        // Agrega un "escuchador" para el evento de enviar el formulario
        event.preventDefault();
        // Previene que el formulario realice el comportamiento predeterminado de recargar la página

        const formData = new FormData(form);
        // Crea un objeto FormData con los datos ingresados en el formulario

        const formObject = {};
        // Crea un objeto vacío para almacenar los datos del formulario de forma más sencilla

        formData.forEach(function (value, key) {
            formObject[key] = value;
        });
        // Llena el objeto formObject con los datos del formulario (nombre, email, mensaje, etc.)

        fetch(form.action, {
            // Envía una solicitud HTTP al destino definido en el atributo 'action' del formulario
            method: 'POST',
            // Define el método HTTP como POST (para enviar datos al servidor)
            headers: {
                'Accept': 'application/json'
                // Indica que el servidor debe devolver una respuesta en formato JSON
            },
            body: JSON.stringify(formObject)
            // Convierte el objeto con los datos del formulario a formato JSON y lo envía en el cuerpo de la solicitud
        })
        .then(response => response.json())
        // Convierte la respuesta del servidor a formato JSON cuando se reciba

        .then(data => {
            // Maneja la respuesta una vez convertida a JSON
            if (data.ok) {
                // Si la respuesta indica que la operación fue exitosa
                document.getElementById('result-container').innerHTML = '<p>Mensaje enviado con éxito.</p>';
                // Muestra un mensaje de éxito en un contenedor con el id 'result-container'
                
                alert('Nos pondremos en contacto contigo pronto.');
                // Muestra una alerta informando que el mensaje fue enviado exitosamente
            } else {
                // Si la operación no fue exitosa
                document.getElementById('result-container').innerHTML = '<p>Error al enviar el mensaje. Inténtelo nuevamente más tarde.</p>';
                // Muestra un mensaje de error en el mismo contenedor
            }
        })
        .catch(error => {
            // Si ocurre un error durante la solicitud
            console.error('Error:', error);
            // Muestra el error en la consola para depuración
            document.getElementById('result-container').innerHTML = '<p>Error al enviar el mensaje. Inténtelo nuevamente más tarde.</p>';
            // Muestra un mensaje de error en el contenedor en caso de fallo en la solicitud
        });
    });
});
