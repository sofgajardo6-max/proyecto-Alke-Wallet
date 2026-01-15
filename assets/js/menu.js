    document.getElementById('saldoVisual').innerText = localStorage.getItem('saldo') || 100000;
    document.getElementById('btnDeposit').addEventListener('click', function() {
        console.log("si hubo clic");
    
        document.getElementById('mensajeNavegacion').innerHTML = `
            <div class="alert alert-info" role="alert">
                Redirigiendo a la página de depósito...
            </div>
        `;
        setTimeout(function() {
            window.location.href = "deposit.html";
        }, 1000);

    });
      document.getElementById('btnEnviar').addEventListener('click', function() {
            console.log("si hubo clic");
            document.getElementById('mensajeNavegacion').innerHTML = `
                <div class="alert alert-info" role="alert">
                    Redirigiendo a la página de enviar dinero...
                </div>
            `;
            setTimeout(function() {
                window.location.href = "sendmoney.html";
            }, 1000);
        });
        document.getElementById('btnMovimientos').addEventListener('click', function(event) {
            console.log("si hubo clic");
            document.getElementById('mensajeNavegacion').innerHTML = `
                <div class="alert alert-info" role="alert">
                    Redirigiendo a la página de Últimos movimientos...
                </div>
            `;  
            setTimeout(function() {
                window.location.href = "transactions.html";
            }, 1000);
        });