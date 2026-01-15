$(document).ready(function() {
    $(loginform).submit(function(e) {
    e.preventDefault();
    const email = $(`#email`).val();
    const password = $(`#contra`).val();
    
    const emailCorrecto = "estudiante@gmail.com";
    const passwordCorrecto = "12345";
    
    if (email === emailCorrecto && password === passwordCorrecto) {
        $(`#mensajeAlerta`).html(`
            <div class="alert alert-success" role="alert">
                ¡Inicio de sesión exitoso! redirigiendo al menú...
            </div>
        `);
        setTimeout(function() {
            window.location.href = "menu.html";
        }, 1000);

    } else { 
        $(`#mensajeAlerta`).html(`
            <div class="alert alert-danger" role="alert">
                Error: correo electrónico o contraseña incorrectos.
            </div>
        `);
    }
});
});