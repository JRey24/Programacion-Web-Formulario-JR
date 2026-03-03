function inicializarPaginaPrincipal() {
    const formulario = document.getElementById('formularioComidas');
    if (!formulario) {
        return;
    }

    const comidas = [];
    const limiteComidas = 5;

    const inputComida = document.getElementById('comida');
    const inputNombre = document.getElementById('nombre');
    const botonAgregar = document.getElementById('agregarComida');
    const contador = document.getElementById('contadorComidas');

    function actualizarContador() {
        contador.textContent = `Comidas guardadas: ${comidas.length}/${limiteComidas}`;
    }

    botonAgregar.addEventListener('click', () => {
        const nuevaComida = inputComida.value.trim();

        if (!nuevaComida) {
            alert('Escribe una comida antes de agregar.');
            return;
        }

        if (comidas.length >= limiteComidas) {
            alert('Ya guardaste 5 comidas.');
            return;
        }

        comidas.push(nuevaComida);
        inputComida.value = '';
        inputComida.focus();

        actualizarContador();
    });

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();
        const nombreUsuario = inputNombre.value.trim();

        if (comidas.length < limiteComidas) {
            alert('Debes guardar exactamente 5 comidas antes de enviar.');
            return;
        }

        localStorage.setItem('comidasGuardadas', JSON.stringify(comidas));
        localStorage.setItem('nombreUsuario', nombreUsuario || 'usuario');
        window.location.href = 'seleccion.html';
    });
}

function inicializarPaginaSeleccion() {
    const contenedor = document.getElementById('contenedorSelectores');
    if (!contenedor) {
        return;
    }

    const mensajeFrecuencia = document.getElementById('mensajeFrecuencia');
    const resultado = document.getElementById('resultadoSeleccion');
    const estadoFrecuencia = document.getElementById('estadoFrecuencia');
    const bloquePuntuacion = document.getElementById('bloquePuntuacion');
    const tituloPuntuacion = document.getElementById('tituloPuntuacion');
    const opcionesPuntuacion = document.getElementById('opcionesPuntuacion');
    const resultadoPuntuacion = document.getElementById('resultadoPuntuacion');
    const btnVolver = document.getElementById('btnVolver');

    const comidasGuardadas = JSON.parse(localStorage.getItem('comidasGuardadas') || '[]');
    const nombreUsuario = localStorage.getItem('nombreUsuario') || 'usuario';

    mensajeFrecuencia.textContent = `Bueno, ${nombreUsuario} ahora vas a definir con qué frecuencia consumes los alimentos que ingresaste previamente.`;

    if (!Array.isArray(comidasGuardadas) || comidasGuardadas.length < 5) {
        contenedor.innerHTML = '<p>No hay 5 comidas guardadas. Primero regresa al formulario principal.</p>';
        estadoFrecuencia.textContent = 'Primero agrega las comidas en la página principal.';
    } else {
        const selectoresFrecuencia = [];
        const opcionesFrecuencia = [
            '1 vez por semana',
            '2 veces por semana',
            '3 o más veces por semana',
            '1 vez por mes',
            '2 veces por mes',
            '3 o más veces por mes',
        ];

        const pesosFrecuencia = {
            '1 vez por mes': 1,
            '2 veces por mes': 2,
            '3 o más veces por mes': 3,
            '1 vez por semana': 4,
            '2 veces por semana': 5,
            '3 o más veces por semana': 6,
        };

        function construirPuntuacion(comidaMasFrecuente) {
            bloquePuntuacion.classList.remove('oculto');
            tituloPuntuacion.textContent = `Puntúa esta comida: ${comidaMasFrecuente}`;
            opcionesPuntuacion.innerHTML = '';
            resultadoPuntuacion.textContent = '';

            for (let i = 1; i <= 5; i++) {
                const boton = document.createElement('button');
                boton.type = 'button';
                boton.className = `btn-puntuacion nivel-${i}`;
                boton.textContent = `${i} ${'🍔'.repeat(i)}`;

                boton.addEventListener('click', () => {
                    const botones = document.querySelectorAll('.btn-puntuacion');
                    botones.forEach((item) => item.classList.remove('activo'));
                    boton.classList.add('activo');
                    resultadoPuntuacion.textContent = `Calificaste "${comidaMasFrecuente}" con ${i}/5.`;
                });

                opcionesPuntuacion.appendChild(boton);
            }
        }

        function ocultarPuntuacion(mensaje) {
            bloquePuntuacion.classList.add('oculto');
            opcionesPuntuacion.innerHTML = '';
            resultadoPuntuacion.textContent = '';
            estadoFrecuencia.textContent = mensaje || '';
        }

        function obtenerIndiceMasFrecuente() {
            const puntajes = selectoresFrecuencia.map((selector) => pesosFrecuencia[selector.value] || 0);
            const mayor = Math.max(...puntajes);
            const indicesMaximos = puntajes
                .map((valor, index) => ({ valor, index }))
                .filter((item) => item.valor === mayor)
                .map((item) => item.index);

            if (indicesMaximos.length !== 1) {
                return null;
            }

            return indicesMaximos[0];
        }

        for (let i = 0; i < 5; i++) {
            const etiqueta = document.createElement('label');
            etiqueta.setAttribute('for', `selectorFrecuencia${i + 1}`);
            etiqueta.textContent = `${comidasGuardadas[i]}:`;

            const selectorFrecuencia = document.createElement('select');
            selectorFrecuencia.id = `selectorFrecuencia${i + 1}`;
            selectorFrecuencia.name = `selectorFrecuencia${i + 1}`;

            opcionesFrecuencia.forEach((frecuencia) => {
                const opcion = document.createElement('option');
                opcion.value = frecuencia;
                opcion.textContent = frecuencia;
                selectorFrecuencia.appendChild(opcion);
            });

            contenedor.appendChild(etiqueta);
            contenedor.appendChild(selectorFrecuencia);
            contenedor.appendChild(document.createElement('br'));
            contenedor.appendChild(document.createElement('br'));

            selectoresFrecuencia.push(selectorFrecuencia);
        }

        function actualizarResumen() {
            const indiceMasFrecuente = obtenerIndiceMasFrecuente();

            resultado.innerHTML = '';
            selectoresFrecuencia.forEach((selector, index) => {
                const item = document.createElement('li');
                const esMasFrecuente = indiceMasFrecuente === index;
                item.textContent = esMasFrecuente
                    ? `${comidasGuardadas[index]}: ${selector.value} ⭐`
                    : `${comidasGuardadas[index]}: ${selector.value}`;
                resultado.appendChild(item);
            });

            if (indiceMasFrecuente === null) {
                ocultarPuntuacion('Hay empate en frecuencia, ajusta para habilitar la puntuación.');
                return;
            }

            estadoFrecuencia.textContent = '⭐ indica la comida que vas a calificar.';
            construirPuntuacion(comidasGuardadas[indiceMasFrecuente]);
        }

        selectoresFrecuencia.forEach((selector) => {
            selector.addEventListener('change', actualizarResumen);
        });

        actualizarResumen();
    }

    btnVolver.addEventListener('click', (event) => {
        const confirmarSalida = confirm(
            '⚠️ Si sales ahora, se borrará todo el progreso y los datos almacenados.\nTendrás que volver a ingresarlos desde cero.\n\n¿Deseas continuar?'
        );

        if (!confirmarSalida) {
            event.preventDefault();
            return;
        }

        localStorage.removeItem('comidasGuardadas');
        localStorage.removeItem('nombreUsuario');
    });
}

inicializarPaginaPrincipal();
inicializarPaginaSeleccion();
