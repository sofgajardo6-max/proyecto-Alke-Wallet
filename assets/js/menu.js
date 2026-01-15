document.getElementById('saldoVisual').innerText = localStorage.getItem('saldo') || 100000;
    /* esto es para llamar el saldo actual, si no se ha hecho nada se establece un saldo de 100000 */

    /* esto es para llamar el boton y comprobar que funciona a traves del console */
    document.getElementById('btnDeposit').addEventListener('click', function() {
        console.log("si hubo clic");
    /* alertas con su tiempo respectivo */
        // Cambiado a jQuery para efecto fadeIn
        $('#mensajeNavegacion').hide().html(`
            <div class="alert alert-info" role="alert">
                Redirigiendo a la página de depósito...
            </div>
        `).fadeIn(250);

        setTimeout(function() {
            window.location.href = "deposit.html";
        }, 1200);

    });

      document.getElementById('btnEnviar').addEventListener('click', function() {
            console.log("si hubo clic");
            // Cambiado a jQuery para efecto fadeIn
            $('#mensajeNavegacion').hide().html(`
                <div class="alert alert-info" role="alert">
                    Redirigiendo a la página de enviar dinero...
                </div>
            `).fadeIn(250);

            setTimeout(function() {
                window.location.href = "sendmoney.html";
            }, 1200);
        });

        document.getElementById('btnMovimientos').addEventListener('click', function(event) {
            console.log("si hubo clic");
            // Cambiado a jQuery para efecto fadeIn
            $('#mensajeNavegacion').hide().html(`
                <div class="alert alert-info" role="alert">
                    Redirigiendo a la página de Últimos movimientos...
                </div>
            `).fadeIn(250);
            
            setTimeout(function() {
                window.location.href = "transactions.html";
            }, 1200);
        });