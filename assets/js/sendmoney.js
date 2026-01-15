$(document).ready(function() { 

    $('#saldoVisual').text(localStorage.getItem('saldo') || 100000);

    /* el JSON.parse es para traer los datos de contactos que ya estan anotados el ||[] es por si no hay ninguno se quede en blanco y no de error :) */
    let listaContactos = JSON.parse(localStorage.getItem('misContactos')) || [];

    $('#buscadorContactos').on('keyup', function() {

        let valorBusqueda = $(this).val().toLowerCase();

        // BUSCAMOS EN CADA ELEMENTO <li> 
        $('#ListaDeContactos li').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(valorBusqueda) > -1);
            
        });

});

    // json.parse desempaqueta los datos que hay en el local storage por decirlo asi
    function mostrarContactos() {
        
        const $contenedor = $('#ListaDeContactos');
        $contenedor.empty(); // .empty() para limpiar el contenedor antes de agregar nuevos contactos

        listaContactos.forEach(function(contacto, index) {
            // for each es para que por cada persona nueva se ejecute el codigo y se guarde
            // USO .append() PORQUE ES LA FORMA DE JQUERY PARA HACER EL += EN EL HTML
            $contenedor.append(`
                <li class="list-group-item list-group-item-action" 
                    onclick="seleccionarContacto('${contacto.nombre}')" 
                    style="cursor: pointer;">
                    <p>${contacto.alias}</p>
                    <strong>${contacto.nombre}</strong><br>
                    <p>CBU: ${contacto.cbu} | Banco: ${contacto.banco}</p>
                </li>
            `);
        });
    }
    mostrarContactos();

    let contactoSeleccionado = "";
    window.seleccionarContacto = function(nombre) { 
        contactoSeleccionado = nombre;
        $('#nombreDestino').text(nombre);
        const miModal = new bootstrap.Modal(document.getElementById('modalTransferir'));
        miModal.show();
    }

    // USO .click() PORQUE ES LA FORMA DE JQUERY de addEventListener('click')
    $('#confirmarEnvio').click(function() {
        let monto = Number($('#montoTransferir').val());
        let saldoActual = Number(localStorage.getItem('saldo')) || 100000;

        if (monto <= 0 || isNaN(monto)) {
            mostrarErrorTransferencia("Por favor, ingresa un monto válido.");
            return;
        }

        if (monto > saldoActual) {
            mostrarErrorTransferencia("¡Saldo insuficiente!");
            return;
        }

        let nuevoSaldo = saldoActual - monto;
        localStorage.setItem('saldo', nuevoSaldo);

        // historial de movimientos
        const nuevoMovimiento = {
            destinatario: contactoSeleccionado,
            monto: monto,
            fecha: new Date().toLocaleString()
        };

        let historial = JSON.parse(localStorage.getItem('historial')) || [];
        historial.push(nuevoMovimiento);
        localStorage.setItem('historial', JSON.stringify(historial));

        $('#alertaTransferencia').html(`
            <div class="alert alert-success">¡Transferencia exitosa! Redirigiendo al menu...</div>
        `);

        setTimeout(function() {
            window.location.href = "menu.html";
        }, 2000);
    });

    $('#formNuevoContacto').submit(function(event) {
        event.preventDefault();
//validacion para que no se guarden contactos vacios
        const nombre = $('#nombreContacto').val();
        const cbu = $('#cbuContacto').val();
        const alias = $('#aliasContacto').val();
        const banco = $('#bancoContacto').val();

        if(nombre === "" || cbu === "" || alias === "" || banco === "") {
            alert("Completa los datos");
            return;
        }

        const nuevo = { nombre, cbu, alias, banco };
        listaContactos.push(nuevo);
        localStorage.setItem('misContactos', JSON.stringify(listaContactos));

        // json.stringify es para empaquetar el monton de datos de antes (nombre, cbu, etc) en como un tipo zip y que sea mas facil guardar en el local storage
        $('#alertaNueva').html(`
            <div class="alert alert-success mt-2">¡Contacto guardado con éxito!</div>
        `);

        setTimeout(function() {
            location.reload();
        }, 1300);
    });

    // BOTÓN VOLVER AL MENÚ
    $('#botonmenu').click(function() {
        $('#mensajeNavegacion').html(`
            <div class="alert alert-info text-center mx-auto mt-3" style="max-width:300px;">
                Redirigiendo a la página menú...
            </div>`);
        setTimeout(function() {
            window.location.href = "menu.html";
        }, 1200);
    });

    $('#btncancelar').click(function() {
        $('#formNuevoContacto')[0].reset(); 
        $('#errorValidacion').html('');
        // AGREGUÉ ESTA LÍNEA PARA CERRAR EL MODAL USANDO JQUERY OCULTANDO EL ELEMENTO CON LA CLASE DE BOOTSTRAP
        $('#modalNuevoContacto').modal('hide'); 
    });
});

// ESTA FUNCIÓN LA DEJO FUERA PARA QUE SEA FÁCIL DE LLAMAR
function mostrarErrorTransferencia(mensaje) {
    $('#alertaTransferencia').html(`<div class="alert alert-warning">${mensaje}</div>`);
}