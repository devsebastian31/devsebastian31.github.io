const text = "DESARROLLADOR WEB FULL-STACK"; // Define la cadena de texto que se va a escribir.
let index = 0; // Inicializa el índice que se utilizará para recorrer el texto, empezando desde el primer carácter.
let speed = 100; // Establece la velocidad de escritura (en milisegundos) entre cada carácter que se muestra.

function typeWriter() {
    if (index < text.length) { // Verifica si el índice actual es menor que la longitud del texto (es decir, si quedan más caracteres por escribir).
        document.getElementById("typing-text").textContent += text.charAt(index); 
        // Añade el carácter actual del texto (en la posición `index`) al elemento HTML con el id "typing-text".
        index++; // Incrementa el índice para que en la próxima llamada se escriba el siguiente carácter.
        setTimeout(typeWriter, speed); // Usa setTimeout para llamar de nuevo a la función `typeWriter` después de un intervalo definido por `speed` (en este caso, 100ms).
    }
}

window.onload = function() {
    setTimeout(typeWriter, 500); // Al cargar la página, espera 500ms antes de comenzar a llamar a la función `typeWriter` para iniciar la animación de escritura.
};


// Espera a que el documento HTML se cargue completamente antes de ejecutar el código JavaScript
document.addEventListener('DOMContentLoaded', function () {

    // Obtiene el formulario con el ID 'contactForm'
    const form = document.getElementById('contactForm');

    // Agrega un event listener al formulario que escucha cuando se envía (submit)
    form.addEventListener('submit', function (event) {

        // Previene el comportamiento predeterminado del formulario, que es recargar la página al enviar
        event.preventDefault();

        // Crea un objeto FormData para recopilar datos del formulario
        const formData = new FormData(form);

        // Crea un objeto vacío donde se almacenarán los datos del formulario
        const formObject = {};

        // Itera sobre los pares clave-valor de formData y los agrega a formObject
        formData.forEach(function (value, key) {
            formObject[key] = value;
        });

        // Obtiene el contenedor donde se mostrarán los mensajes de resultado
        const resultContainer = document.getElementById('result-container');

        // Limpia cualquier mensaje previo que pueda haber en el contenedor de resultados
        resultContainer.innerHTML = '';

        // Envía una solicitud HTTP POST al servidor utilizando la URL especificada en el atributo 'action' del formulario
        fetch(form.action, {
            method: 'POST',  // Método de la solicitud HTTP
            headers: {
                'Accept': 'application/json',  // Especifica que se acepta una respuesta en formato JSON
                'Content-Type': 'application/json'  // Indica que los datos enviados son JSON
            },
            body: JSON.stringify(formObject)  // Convierte el objeto formObject a una cadena JSON y lo envía en el cuerpo de la solicitud
        })
        // Maneja la respuesta de la solicitud
        .then(response => {
            // Si la respuesta no es exitosa, lanza un error
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor");
            }
            // Convierte la respuesta a formato JSON y la devuelve
            return response.json();
        })
        // Maneja los datos recibidos de la respuesta
        .then(data => {
            // Si la respuesta tiene un campo 'ok' que es verdadero, muestra un mensaje de éxito
            if (data.ok) {
                resultContainer.innerHTML = '<p class="success-message">Mensaje enviado con éxito. ¡Gracias por contactarnos!</p>';
            } else {
                // Si la respuesta no es exitosa, muestra un mensaje de error
                resultContainer.innerHTML = '<p class="error-message">Error al enviar el mensaje. Inténtelo nuevamente más tarde.</p>';
            }
        })
        // Captura errores que ocurren durante el envío o manejo de la solicitud
        .catch(error => {
            // Imprime el error en la consola para depuración
            console.error('Error en la solicitud:', error);
            // Muestra un mensaje de error al usuario
            resultContainer.innerHTML = '<p class="error-message">Error al enviar el mensaje. Inténtelo nuevamente más tarde.</p>';
        });
    });
});



