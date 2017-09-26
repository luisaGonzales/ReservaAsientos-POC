'use strict';

// Opciones

let opReservar = $("#opReservar");
let opLiberar = $("#opLiberar");
let opBuscar = $("#opBuscar");
let opListar = $("#opListar");

class App {
    constructor(){

    }
    iniciar(){
        $("#opReservar").click(()=> this.reservar());
        $("#opLiberar").click(()=> t)

    }
}

$(document).ready(() => {
    
        let app = new App();
        app.iniciar();
    })