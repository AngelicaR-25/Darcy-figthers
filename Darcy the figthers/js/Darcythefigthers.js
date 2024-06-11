// Elementos del DOM
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonesAtaque = {
    llamarada: document.getElementById('boton-llamarada'),
    tormenta: document.getElementById('boton-tormenta'),
    terremoto: document.getElementById('boton-terremoto')
};
const botonReiniciar = document.getElementById('boton-reiniciar');
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const inputsMascotas = {
    SpiderCat: document.getElementById('Spider-cat'),
    FatCat: document.getElementById('Fat-cat'),
    TysonCat: document.getElementById('Tyson-cat')
};
const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');
const sectionMensajes = document.getElementById('resultado');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');

let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

class Mascota {
    constructor(nombre, foto, vida) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
    }
}

const mascotas = {
    SpiderCat: new Mascota('Spider-cat', 'fondo/spider_man_spider_cat_png_by_metropolis_hero1125_de8mwmx-fullview.png', 3),
    FatCat: new Mascota('Fat-cat', './fondo/99-997825_fat-cat-png-fat-cats.png', 3),
    TysonCat: new Mascota('Tyson-cat', 'fondo/13e5f6d3cd401e19a9ecf36a64726364--kungfu-ninja-cats-removebg-preview.png', 3)
};

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none';
    sectionReiniciar.style.display = 'none';

    spanVidasJugador.innerHTML = vidasJugador;
    spanVidasEnemigo.innerHTML = vidasEnemigo;

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    for (const tipo in botonesAtaque) {
        botonesAtaque[tipo].addEventListener('click', () => seleccionarAtaque(tipo.toUpperCase()));
    }
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none';
    sectionSeleccionarAtaque.style.display = 'flex';

    for (const key in inputsMascotas) {
        if (inputsMascotas[key].checked) {
            spanMascotaJugador.innerHTML = mascotas[key].nombre;
            seleccionarMascotaEnemigo();
            return;
        }
    }
    alert('Selecciona una mascota');
    sectionSeleccionarMascota.style.display = 'block';
    sectionSeleccionarAtaque.style.display = 'none';
}

function seleccionarMascotaEnemigo() {
    const keys = Object.keys(mascotas);
    const mascotaAleatoria = keys[aleatorio(0, keys.length - 1)];
    spanMascotaEnemigo.innerHTML = mascotas[mascotaAleatoria].nombre;
}

function seleccionarAtaque(tipo) {
    ataqueJugador = tipo;
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    const ataques = ['LLAMARADA', 'TORMENTA', 'TERREMOTO'];
    ataqueEnemigo = ataques[aleatorio(0, ataques.length - 1)];
    combate();
}

function combate() {
    const resultados = {
        LLAMARADA: { TERREMOTO: 'Ganaste, pero no te confíes.', TORMENTA: 'Soy invencible, acabas de perder.' },
        TORMENTA: { LLAMARADA: 'Oye, déjame un poco, ¿no?', TERREMOTO: 'Soy invencible, acabas de perder.' },
        TERREMOTO: { TORMENTA: 'Ganaste otra vez, pero no es el final.', LLAMARADA: 'Soy invencible, acabas de perder.' }
    };

    if (ataqueEnemigo === ataqueJugador) {
        crearMensaje("Nada que hacer, acabamos de empatar.");
    } else {
        const resultado = resultados[ataqueJugador][ataqueEnemigo];
        if (resultado.includes('Ganaste')) {
            vidasEnemigo--;
            spanVidasEnemigo.innerHTML = vidasEnemigo;
        } else {
            vidasJugador--;
            spanVidasJugador.innerHTML = vidasJugador;
        }
        crearMensaje(resultado);
    }

    revisarVidas();
}

function revisarVidas() {
    if (vidasEnemigo === 0) {
        crearMensajeFinal("No lo puedo creer, eres el ganador");
    } else if (vidasJugador === 0) {
        crearMensajeFinal('No puedes contra la máquina, perdiste');
    }
}

function crearMensaje(resultado) {
    const nuevoAtaqueDelJugador = document.createElement('p');
    const nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal;
    for (const tipo in botonesAtaque) {
        botonesAtaque[tipo].disabled = true;
    }
    sectionReiniciar.style.display = 'block';
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego);
