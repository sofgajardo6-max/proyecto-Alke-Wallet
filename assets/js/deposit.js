document.getElementById('saldoVisual').innerText = localStorage.getItem('saldo') || 100000;

/* el boton tiene que escuchar el clic para depositar */
document.getElementById('botonDepositar').addEventListener('click', function(event) {
    event.preventDefault();

    let monto = document.getElementById('montoDeposito').value;

    if (monto === "" || monto <= 0) {
        document.getElementById('mensajeAlerta').innerHTML = `
            <div class="alert alert-danger text-center mx-auto" style="max-width:300px;">
                ¡Ingresa un monto si quieres depositar!
            </div>`;
            setTimeout(function() {
                document.getElementById('mensajeAlerta').innerHTML = ``;
            }, 1200);
        return; 
    }

    let saldoactual = localStorage.getItem('saldo') || 100000; 
    let resultado = Number(saldoactual) + Number(monto);
    localStorage.setItem('saldo', resultado); 

    document.getElementById('mensajeAlerta').innerHTML = `
        <div class="alert alert-success text-center mx-auto" style="max-width:300px;">
            ¡Listo! Nuevo saldo: $${resultado}
            ¡Has depositado $${monto} correctamente!
        </div>`;
    
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
    document.getElementById('mensajeNavegacion').innerHTML = `
        <div class="alert alert-info text-center mx-auto" style="max-width:300px;">
            Redirigiendo a la página menú...
        </div>`;
    setTimeout(function() {
        window.location.href = "menu.html";
    }, 2000);
});