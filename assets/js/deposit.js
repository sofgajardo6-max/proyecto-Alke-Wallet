document.getElementById('saldoVisual').innerText = localStorage.getItem('saldo') || 100000;

/* el boton tiene que escuchar el clic para depositar */
document.getElementById('botonDepositar').addEventListener('click', function(event) {
    event.preventDefault();

    let monto = document.getElementById('montoDeposito').value;

    if (monto === "" || monto <= 0) {
        $('#mensajeAlerta').hide().html(`
            <div class="alert alert-danger text-center mx-auto" style="max-width:300px;">
                ¡Ingresa un monto si quieres depositar!
            </div>`).fadeIn(300).delay(1500).fadeOut(500);
        return; 
    }

    let saldoactual = localStorage.getItem('saldo') || 100000; 
    let resultado = Number(saldoactual) + Number(monto);
    localStorage.setItem('saldo', resultado); 

    $('#mensajeAlerta').hide().html( `
        <div class="alert alert-success text-center mx-auto" style="max-width:300px; role="alert">
            ¡Listo! Nuevo saldo: $${resultado}
            ¡Has depositado $${monto} correctamente!
        </div>`).fadeIn(300).delay(1500).fadeOut(300);
    
    document.getElementById('saldoVisual').innerText = resultado;
    
    const nuevoMovimiento = {
        destinatario: "Depósito realizado",
        monto: monto,
        fecha: new Date().toLocaleString(),
        tipo: "entrada"
    };
// json.parse desempaqueta los datos que hay en el local storage //
    let historial = JSON.parse(localStorage.getItem('historial')) || [];
    historial.push(nuevoMovimiento);
    localStorage.setItem('historial', JSON.stringify(historial));
});

document.getElementById('botonmenu').addEventListener('click', function() {
    $('#mensajeNavegacion').hide().html(`
        <div class="alert alert-info text-center mx-auto mt-3" style="max-width:300px; role:"alert">
            Redirigiendo a la página menú...
        </div>
        `).fadeIn(300);
    setTimeout(function() {
        window.location.href = "menu.html";
    }, 2000);
});