$(document).ready(function() { 

    $('#saldoVisual').text(localStorage.getItem('saldo') || 100000);

    /* el JSON.parse es para traer los datos de contactos que ya estan anotados el ||[] es por si no hay ninguno se quede en blanco y no de error :) */
    let listaContactos = JSON.parse(localStorage.getItem('misContactos')) || [];

/*esto hace que si en el localstorage no hay una lista predeterminada se hace una
 AL CREAR UN CONTACTO NUEVO ESTA LISTA SE BORRA, ES SOLO PARA TENER UNA PREDETERMINADA*/

if (listaContactos.length === 0) {
    listaContactos = [
        { nombre: "Juan Pérez", alias: "juanito", cbu: "0000111", banco: "Alke Banco" },
        { nombre: "Beatriz Soto", alias: "Bea", cbu: "0000222", banco: "Estado" },
        { nombre: "Carlos Muñoz", alias: "Carlitos", cbu: "0000333", banco: "Santander" }
    ];
    localStorage.setItem('misContactos', JSON.stringify(listaContactos))
}


    $('#buscadorContactos').on('keyup', function() {

        let valorBusqueda = $(this).val().toLowerCase();

        // BUSCAMOS EN CADA ELEMENTO <li> BASADO EN ALIAS POR CADA PRIMERA LETRA DEL ALIAS Y NO CONFUNDA CON NOMBRES Q CONTIENEN ESA MISMA LETRA
        $('#ListaDeContactos li').filter(function() {
            let alias = $(this).find('p').first().text().toLowerCase();
            $(this).toggle(alias.startsWith(valorBusqueda));
            
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

    //modal para poder enviar el monto
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

        //este if es por si se ingresa a enviar dinero un monto menor a 0 o una letra en vez de un numero
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

        // historial de movimientos con fecha y hora para poder verlo en movimientos
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

if (listaContactos.length > 0 && listaContactos[0].nombre === "Juan Pérez") {
        listaContactos = []; 
    }
    $('#formNuevoContacto').submit(function(event) {
        event.preventDefault();

//validacion para que no se guarden contactos vacios y sea obligatorio llenar todos los cuadraditos
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