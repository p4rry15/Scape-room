const CODIGO_FINAL = "190723";
// La secuencia que debe introducir el jugador
const SECUENCIA_NUMEROS = ['1', '5', '0', '8', '2', '3'];

let pasoActual = 0; // Rastrea el índice del número que esperamos (0 a 5)
let codigoParcial = ""; // Almacena los números correctos ya introducidos

// Referencias a los elementos HTML
const inputElement = document.getElementById('inputCodigo');
const mensajeElement = document.getElementById('mensaje');
const progresoElement = document.getElementById('codigoParcial');
const instruccionElement = document.getElementById('instruccion');
const botonElement = document.querySelector('button');

/**
 * Actualiza la interfaz después de cada intento.
 */
function actualizarInterfaz() {
    // 1. Mostrar el código parcial (con guiones si no hay nada)
    progresoElement.textContent = codigoParcial || "------"; 
    
    // 2. Limpiar la entrada y reenfocar
    inputElement.value = ''; 
    
    if (pasoActual < SECUENCIA_NUMEROS.length) {
        // Todavía estamos esperando un dígito
        instruccionElement.textContent = `Introduce el número de la Pista #${pasoActual + 1}:`;
        inputElement.maxLength = 1; // Aseguramos que solo meta un dígito
        inputElement.placeholder = '_';
    } else {
        // Ya se han introducido todos los números uno por uno
        instruccionElement.textContent = "¡Has reunido todos los números!";
        inputElement.style.display = 'none'; 
        botonElement.style.display = 'none'; 
    }
    
    inputElement.focus();
}

/**
 * Muestra un mensaje temporal de éxito o error.
 */
function mostrarMensaje(texto, tipo) {
    mensajeElement.innerHTML = texto;
    mensajeElement.className = 'mensaje ' + tipo;
    
    // El mensaje desaparecerá después de 3 segundos
    setTimeout(() => {
        mensajeElement.textContent = '';
        mensajeElement.className = 'mensaje';
    }, 3000);
}

/**
 * Función principal para verificar el código introducido.
 */
function verificarCodigo() {
    const entrada = inputElement.value.trim();
    
    // Si la entrada está vacía, no hacemos nada
    if (!entrada) {
        mostrarMensaje('Escribe un número para verificar.', 'error');
        actualizarInterfaz();
        return;
    }

    // --- 1. Verificar si ha intentado meter el código final completo ---
    if (entrada === CODIGO_FINAL) {
        mensajeElement.className = 'mensaje success';
        mensajeElement.innerHTML = `🎉 **¡ENHORABUENA, LO HAS CONSEGUIDO!** El código final es correcto: **${CODIGO_FINAL}**`;
        inputElement.style.display = 'none';
        botonElement.style.display = 'none';
        return; 
    }
    
    // --- 2. Verificar el número paso a paso ---
    if (pasoActual < SECUENCIA_NUMEROS.length) {
        const numeroEsperado = SECUENCIA_NUMEROS[pasoActual];
        
        if (entrada === numeroEsperado) {
            // ¡CORRECTO!
            codigoParcial += entrada;
            pasoActual++;
            mostrarMensaje(`✅ **¡CORRECTO!** Has introducido el número '${entrada}'.`, 'success');
        } else {
            // INCORRECTO
            mostrarMensaje('❌ **INCORRECTO.** Ese no es el número de la pista actual.', 'error');
        }
    } else {
        // Ya se han reunido todos los números
        mostrarMensaje('¡Ya has reunido todos los números! Intenta introducir el código final.', 'success');
    }
    
    // Refrescamos la pantalla
    actualizarInterfaz();
}

// Inicializar la interfaz al cargar la página
actualizarInterfaz();