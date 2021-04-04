let patronUsuario = [];
let patronMaquina = [];
let ronda = 0

const $estado = document.querySelector(".estado")



document.querySelector(".inicio").onclick = comenzarJuego

function comenzarJuego() {

    // resetearPatrones()
    manejarRonda()
}

function manejarRonda() {

    const $nuevoCuadro = obtenerCuadroAleatorio();
    actualizarEstado("Turno de la máquina");
    patronMaquina.push($nuevoCuadro);

    const RETRASO_USUARIO = ((patronMaquina.length + 1) * 1000);

    patronMaquina.forEach(function($cuadro, index) {
        const RETRASO_MS = (index + 1) * 1000;
        setTimeout(function() {
            activarCuadro($cuadro);
        }, RETRASO_MS)

    })

    setTimeout = ((function() {
        actualizarEstado("Turno del Jugador")
        desbloquearInputUsuario()
    }), RETRASO_USUARIO)
    




}

function manejarInputUsuario(e) {
    const $cuadro = e.target;
    activarCuadro($cuadro);
    patronUsuario.push($cuadro);

    const $cuadroMaquina = patronMaquina[patronUsuario.length - 1]

    if ($cuadro.id !== $cuadroMaquina.id) {
        perder();
        return;
    } 

    if (patronUsuario.length === secuenciaMaquina.length) {
        bloquearInputUsuario();
        setTimeout(manejarRonda, 1000);
    }

    

}

function obtenerCuadroAleatorio () {
    const $cuadros = document.querySelectorAll(".cuadro");
    const aleatorio = Math.floor(Math.random() * 3);
    return $cuadros[aleatorio];
      
}

function activarCuadro($cuadro) {
    $cuadro.style.opacity = 1;
    setTimeout(function() {
        $cuadro.style.opacity = 0.5;
    }, 500);
  }


function actualizarEstado (txt) {
    $estado.innerText = txt;
}

function desbloquearInputUsuario() {
    document.querySelectorAll(".cuadro").forEach(function ($cuadro) {
        $cuadro.onclick = manejarInputUsuario;
    })
}

function bloquearInputUsuario() {
    document.querySelectorAll(".cuadro").forEach(function ($cuadro) {
        $cuadro.onclick = function () {

        };
    })
}

function perder() {
    bloquearInputUsuario();
    actualizarEstado('Perdiste! Tocá "Empezar" para jugar de nuevo!');
  }