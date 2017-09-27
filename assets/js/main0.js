'use strict';

class Avion {
    constructor() {
        this.navegacion = ["bienvenida", "menu", "reservarAsiento", "busqueda", "imprimir"];
    }
    iniciar() {
        $("#ingresar").click(() => {
            $(`#${this.navegacion[0]}`).addClass("no-display");
            $(`#${this.navegacion[1]}`).removeClass("no-display");
        });
        $("#opReservar").click(() => {
            $(`#${this.navegacion[1]}`).addClass("no-display");
            $(`#${this.navegacion[2]}`).removeClass("no-display");
            $(`#btnReservar`).removeClass("no-display");
            $(`#btnCancelar`).addClass("no-display");
            $("#dni").removeAttr("disabled");
            $("#nombre").removeAttr("disabled");
            $("#apellido").removeAttr("disabled");
        });
        $("#opLiberar").click(() => {
            $(`#${this.navegacion[1]}`).addClass("no-display");
            $(`#${this.navegacion[2]}`).removeClass("no-display");

            $(`#btnReservar`).addClass("no-display");
            $(`#btnCancelar`).removeClass("no-display");
            $("#dni").attr("disabled", "disabled");
            $("#nombre").attr("disabled", "disabled");
            $("#apellido").attr("disabled", "disabled");
        });
        $("#btnVolver").click(() => {
            $(`#${this.navegacion[2]}`).addClass("no-display");
            $(`#${this.navegacion[1]}`).removeClass("no-display");
        });
        $("#btnVolverBuscar").click(() => {
            $(`#${this.navegacion[3]}`).addClass("no-display");
            $(`#${this.navegacion[1]}`).removeClass("no-display");
        });
        $("#btnVolverListar").click(() => {
            $(`#${this.navegacion[4]}`).addClass("no-display");
            $(`#${this.navegacion[1]}`).removeClass("no-display");
        });

        $("#opBuscar").click(()=>{
            $(`#${this.navegacion[1]}`).addClass("no-display");
            $(`#${this.navegacion[3]}`).removeClass("no-display");
        });
        $("#opListar").click(()=>{
            $(`#${this.navegacion[1]}`).addClass("no-display");
            $(`#${this.navegacion[4]}`).removeClass("no-display");
        });
       
    }
}

let avion = new Avion;

$(document).ready(() => {
    avion.iniciar();
});