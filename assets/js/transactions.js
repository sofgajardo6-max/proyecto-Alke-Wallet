$(document).ready(function() {
    $('#saldoVisual').text(localStorage.getItem('saldo') || 100000);

    // LLAMAR MOVIMIENTOS
    let movimientos = JSON.parse(localStorage.getItem('historial')) || [];

    // FUNCIÓN PARA MOSTRAR MOVIMIENTOS (CON FILTRO)
    function mostrarUltimosMovimientos(filtro = "todos") {
        const $contenedor = $('#listaTransacciones');
        $contenedor.empty(); 

        if (movimientos.length === 0) {
            $contenedor.html(`<li class="list-group-item text-center">No hay movimientos registrados.</li>`);
            return;
        }

        // REVERTIR LA COPIA PARA VER LOS ÚLTIMOS PRIMERO
        [...movimientos].reverse().forEach(function(mov) {
            
            // DETERMINAMOS SI ES DEPÓSITO O TRANSFERENCIA PARA EL FILTRO
            // SE USA EL "DESTINATARIO" PARA SABER EL TIPO
            let esDeposito = mov.destinatario === "Depósito realizado";
            let tipoMov = esDeposito ? "deposito" : "transferencia";

            // SI EL FILTRO COINCIDE (O ES "TODOS"), DIBUJAMOS
            if (filtro === "todos" || tipoMov === filtro) {
                let colorClase = esDeposito ? "text-success" : "text-danger";
                let signo = esDeposito ? "+$" : "-$";

                $contenedor.append(`
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>${mov.destinatario}</strong>
                            <br>
                            <p class="text-muted">${mov.fecha}</p>
                        </div>
                        <span class="${colorClase} fw-bold">${signo}${mov.monto}</span>
                    </li>
                `);
            }
        });
    }

    $('#filtroTipo').change(function() {
        const seleccionado = $(this).val(); //  VALOR DEL SELECT
        mostrarUltimosMovimientos(seleccionado); // LLAMAR A LA FUNCIÓN
    });

    //BOTÓN VOLVER AL MENÚ PERO EN JQUERY
    $('#botonmenu').click(function() {
        $('#mensajeNavegacion').html(`
            <div class="alert alert-info text-center mx-auto mt-3" style="max-width:300px;">
                Redirigiendo a la página menú...
            </div>`);
        setTimeout(function() {
            window.location.href = "menu.html";
        }, 900);
    });

    // SE MUESTRA TODO
    mostrarUltimosMovimientos();
});