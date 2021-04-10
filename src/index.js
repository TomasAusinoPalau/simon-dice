let patronUsuario = [];
let patronMaquina = [];
let ronda = 0





document.querySelector(".inicio").onclick = comenzarJuego;

function comenzarJuego() {
    resetearPatrones()
    manejarRonda()
}
function manejarRonda() {

    const $nuevoCuadro = obtenerCuadroAleatorio();
    actualizarEstado("Turno de la máquina"); 
    patronMaquina.push($nuevoCuadro);

    const RETRASO_USUARIO = ((patronMaquina.length + 1) * 1000);

    patronMaquina.forEach(function($cuadro, index) {
        const RETRASO_MS = (index + 1) * 1000;
        console.log($cuadro)
        setTimeout(function() {
            activarCuadro($cuadro);
        }, RETRASO_MS)

    })

    setTimeout((function() {
        actualizarEstado("Turno del Jugador")
        desbloquearInputUsuario()
    }), RETRASO_USUARIO)
    
    patronUsuario = [];
    ronda++;
    actualizarNumeroRonda(ronda);


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

    if (patronUsuario.length === patronMaquina.length) {
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
    console.log($cuadro)
    desactivarCuadro($cuadro)
}

function desactivarCuadro($cuadro) {
    setTimeout(() => {
        $cuadro.style.opacity = 0.5;
    }, 500); 
}

function actualizarEstado (txt) {
    const $estado = document.querySelector(".turno")
    $estado.innerText = txt;
}

function actualizarNumeroRonda(number) {
    const $ronda = document.querySelector(".numero-ronda")
    $ronda.innerText = number;
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

function resetearPatrones() {
     patronUsuario = [];
     patronMaquina = [];
     ronda = 0
}