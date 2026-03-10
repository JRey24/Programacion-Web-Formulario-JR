function inicializarPaginaPrincipal() {
    const formulario = document.getElementById('formularioComidas');
    if (!formulario) {
        return;
    }

    const inputNombre = document.getElementById('nombre');
    const inputApellido = document.getElementById('apellido');
    const inputDireccion = document.getElementById('direccion');
    const inputEdad = document.getElementById('edad');
    const inputTelefono = document.getElementById('telefono');

    function esNombreValido(texto) {
        return /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]+$/.test(texto);
    }

    function esTelefonoValido(texto) {
        return /^[0-9]{10}$/.test(texto);
    }

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();
        const nombreUsuario = inputNombre.value.trim();
        const apellidoUsuario = inputApellido.value.trim();
        const direccionUsuario = inputDireccion.value.trim();
        const edadUsuario = inputEdad.value.trim();
        const telefonoUsuario = inputTelefono.value.trim();

        if (!nombreUsuario || !apellidoUsuario) {
            alert('Nombre y apellido son obligatorios.');
            return;
        }

        if (!esNombreValido(nombreUsuario) || !esNombreValido(apellidoUsuario)) {
            alert('Nombre y apellido solo pueden contener letras y espacios.');
            return;
        }

        if (!direccionUsuario) {
            alert('La dirección es obligatoria.');
            return;
        }

        if (!telefonoUsuario || !esTelefonoValido(telefonoUsuario)) {
            alert('El teléfono debe tener 10 dígitos numéricos.');
            return;
        }

        localStorage.setItem('nombreUsuario', nombreUsuario || 'usuario');
        localStorage.setItem('apellidoUsuario', apellidoUsuario || 'usuario');
        localStorage.setItem('direccionUsuario', direccionUsuario);
        localStorage.setItem('edadUsuario', edadUsuario || 'No registrada');
        localStorage.setItem('telefonoUsuario', telefonoUsuario);
        window.location.href = 'seleccion.html';
    });
}

function inicializarPaginaSeleccion() {
    const formularioPedido = document.getElementById('formularioPedido');
    if (!formularioPedido) {
        return;
    }

    const mensajeFrecuencia = document.getElementById('mensajeFrecuencia');
    const resultado = document.getElementById('resultadoSeleccion');
    const estadoFrecuencia = document.getElementById('estadoFrecuencia');
    const btnVolver = document.getElementById('btnVolver');
    const detallePedido = document.getElementById('detallePedido');

    const pizzaJamonQueso = document.getElementById('pizzaJamonQueso');
    const pizzaNapolitana = document.getElementById('pizzaNapolitana');
    const pizzaMuzzarella = document.getElementById('pizzaMuzzarella');
    const pizzaHawaiana = document.getElementById('pizzaHawaiana');
    const pizzaPepperoni = document.getElementById('pizzaPepperoni');
    const pizzaVegetariana = document.getElementById('pizzaVegetariana');
    const pizzaCuatroQuesos = document.getElementById('pizzaCuatroQuesos');
    const pizzaPolloChampinones = document.getElementById('pizzaPolloChampinones');
    const pizzaMexicana = document.getElementById('pizzaMexicana');
    const pizzaCriolla = document.getElementById('pizzaCriolla');
    const cantidadJamonQueso = document.getElementById('cantidadJamonQueso');
    const cantidadNapolitana = document.getElementById('cantidadNapolitana');
    const cantidadMuzzarella = document.getElementById('cantidadMuzzarella');
    const cantidadHawaiana = document.getElementById('cantidadHawaiana');
    const cantidadPepperoni = document.getElementById('cantidadPepperoni');
    const cantidadVegetariana = document.getElementById('cantidadVegetariana');
    const cantidadCuatroQuesos = document.getElementById('cantidadCuatroQuesos');
    const cantidadPolloChampinones = document.getElementById('cantidadPolloChampinones');
    const cantidadMexicana = document.getElementById('cantidadMexicana');
    const cantidadCriolla = document.getElementById('cantidadCriolla');

    const nombreUsuario = localStorage.getItem('nombreUsuario') || 'usuario';
    const apellidoUsuario = localStorage.getItem('apellidoUsuario') || 'usuario';
    const direccionUsuario = localStorage.getItem('direccionUsuario') || 'No registrada';
    const edadUsuario = localStorage.getItem('edadUsuario') || 'No registrada';
    const telefonoUsuario = localStorage.getItem('telefonoUsuario') || 'No registrado';

    function escaparHtml(texto) {
        return texto
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    mensajeFrecuencia.innerHTML = `Señor/Señora <span class="nombre-apellido">${escaparHtml(nombreUsuario)} ${escaparHtml(apellidoUsuario)}</span>, seleccione sus pizzas con calma. Si necesita ayuda, marque una pizza y escriba su cantidad.`;

    const opcionesPizza = [
        { check: pizzaJamonQueso, cantidad: cantidadJamonQueso, nombre: 'Jamón y queso' },
        { check: pizzaNapolitana, cantidad: cantidadNapolitana, nombre: 'Napolitana' },
        { check: pizzaMuzzarella, cantidad: cantidadMuzzarella, nombre: 'Muzzarella' },
        { check: pizzaHawaiana, cantidad: cantidadHawaiana, nombre: 'Hawaiana' },
        { check: pizzaPepperoni, cantidad: cantidadPepperoni, nombre: 'Pepperoni' },
        { check: pizzaVegetariana, cantidad: cantidadVegetariana, nombre: 'Vegetariana' },
        { check: pizzaCuatroQuesos, cantidad: cantidadCuatroQuesos, nombre: 'Cuatro quesos' },
        { check: pizzaPolloChampinones, cantidad: cantidadPolloChampinones, nombre: 'Pollo y champiñones' },
        { check: pizzaMexicana, cantidad: cantidadMexicana, nombre: 'Mexicana' },
        { check: pizzaCriolla, cantidad: cantidadCriolla, nombre: 'Criolla' },
    ];

    opcionesPizza.forEach((opcion) => {
        opcion.check.addEventListener('change', () => {
            if (!opcion.check.checked) {
                opcion.cantidad.value = '';
            } else if (!opcion.cantidad.value) {
                opcion.cantidad.value = '1';
            }
        });
    });

    formularioPedido.addEventListener('submit', (event) => {
        event.preventDefault();

        const seleccionadas = opcionesPizza.filter((opcion) => opcion.check.checked);

        if (seleccionadas.length === 0) {
            alert('Debe seleccionar al menos una pizza.');
            return;
        }

        const pedidoValido = [];

        for (const opcion of seleccionadas) {
            const cantidadNumero = Number(opcion.cantidad.value);

            if (!Number.isInteger(cantidadNumero) || cantidadNumero <= 0) {
                alert(`Escriba una cantidad válida para ${opcion.nombre}.`);
                opcion.cantidad.focus();
                return;
            }

            pedidoValido.push(`${opcion.nombre}: ${cantidadNumero}`);
        }

        resultado.innerHTML = '';

        const datosCliente = [
            `Cliente: ${nombreUsuario} ${apellidoUsuario}`,
            `Dirección: ${direccionUsuario}`,
            `Edad: ${edadUsuario}`,
            `Teléfono: ${telefonoUsuario}`,
        ];

        datosCliente.forEach((linea) => {
            const item = document.createElement('li');
            item.textContent = linea;
            resultado.appendChild(item);
        });

        pedidoValido.forEach((linea) => {
            const item = document.createElement('li');
            item.textContent = linea;
            resultado.appendChild(item);
        });

        const detalle = detallePedido.value.trim();
        const itemDetalle = document.createElement('li');
        itemDetalle.textContent = `Detalles: ${detalle || 'Sin detalles adicionales.'}`;
        resultado.appendChild(itemDetalle);

        estadoFrecuencia.textContent = '✅ Pedido registrado correctamente. Puede volver o editar su pedido.';
    });

    btnVolver.addEventListener('click', (event) => {
        const confirmarSalida = confirm(
            '⚠️ Si sales ahora, se borrará todo el progreso y los datos almacenados.\nTendrás que volver a ingresarlos desde cero.\n\n¿Deseas continuar?'
        );

        if (!confirmarSalida) {
            event.preventDefault();
            return;
        }

        localStorage.removeItem('nombreUsuario');
        localStorage.removeItem('apellidoUsuario');
        localStorage.removeItem('direccionUsuario');
        localStorage.removeItem('edadUsuario');
        localStorage.removeItem('telefonoUsuario');
    });
}

inicializarPaginaPrincipal();
inicializarPaginaSeleccion();
