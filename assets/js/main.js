'use strict';
// Botones
let btnIngresar = $("#ingresar");
let btnReservar = $("#reservar");
let btnMenuPrincipal = $("#menuPrincipal");
let btnReservarAsiento = $("#userReservar");
let btnLiberarAsiento = $("userLiberar");
let btnLiberar = $("#liberar");

// Secciones
let bienvenida = $("#bienvenida");
let menu = $("#menu");
let reservarAsiento = $("#reservarAsiento");
let liberarAsiento = $("#liberarAsiento");
// Datos
let nombre = $("#nombre");
let apellido = $("#apellido");
let dni = $("#dni");
let asiento = $("#asiento");
// Titulo
let tituloReservar = $("#tituloReservar");
let tituloLiberar = $("#tituloLiberar");


class Pasajero {
    constructor(nombre, apellido, dni, asiento) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.asiento = asiento;
    }
    mostrar() {
        if (this.nombre != undefined) {
            nombre.val(this.nombre);
            apellido.val(this.apellido);
            dni.val(this.dni);
            asiento.val(this.asiento);
        } else {
            this.limpiar(false);
        }
    }
    limpiar(inputs) {
        nombre.val("");
        apellido.val("");
        dni.val("");
        if (inputs) {
            asiento.val("");
        }
    }
}

class Avion {
    constructor() {
        this.pasajeros = [];
        this.celdas = $('td');
        for (let i = 0; i < this.celdas.length; i++) {
            this.pasajeros[i] = new Pasajero(undefined, undefined, undefined, undefined);
        }
        this.celdas.click((event) => this.seleccionar(event));
        this.asientoSeleccionado = 0;
        this.asientosOcupados = [];
    }

    seleccionar(event) {
        this.asientoSeleccionado = (event.target.textContent);
        asiento.val(this.asientoSeleccionado);
        this.pasajeros[this.asientoSeleccionado].mostrar();
        this.asientosOcupados.push(this.asientoSeleccionado);
        dni.focus();
    }
    reservar() {
        if (dni.val() != `` && nombre.val() != `` && apellido.val() != `` && asiento.val() != ``) {
            this.pasajeros[this.asientoSeleccionado - 1] = new Pasajero(nombre.val(), apellido.val(), dni.val(), this.asientoSeleccionado);
            // this.asientoSeleccionado.addClass("reservado");
            this.pasajeros[0].limpiar(true);
            for (let i in this.celdas) {
                if (this.celdas[i].textContent == this.asientoSeleccionado) {
                    this.celdas[i].classList.add("reservado");
                    break;
                }
            }
        } else {
            alert("Faltan ingresar datos. Por favor, completalos");
            dni.focus();
        }
    }
    liberar() {
        if (this.asientoSeleccionado == 0) {
            alert("Selecciona un asiento");
        } else{
            if (this.pasajeros[this.asientoSeleccionado - 1].nombre != undefined) {
                this.pasajeros[this.asientoSeleccionado - 1] = new Pasajero(undefined, undefined, undefined, undefined);
                this.pasajeros[0].limpiar(true);
            }
            for (let i in this.celdas) {
                if (this.celdas[i].textContent == this.asientoSeleccionado) {
                    this.celdas[i].classList.remove("reservado");
                    break;
                }
            }
        }
    }
}




let avion = new Avion();



btnIngresar.click(function () {
    bienvenida.addClass("no-display");
    menu.removeClass("no-display");
});

btnReservar.click(function () {
    menu.addClass("no-display");
    reservarAsiento.removeClass("no-display");
    dni.removeAttr(`disabled`);
    nombre.removeAttr(`disabled`);
    apellido.removeAttr(`disabled`);
});

btnMenuPrincipal.click(function () {
    if (reservarAsiento.hasClass("no-display") == false) {
        reservarAsiento.addClass("no-display");
        menu.removeClass("no-display");
    }
});

btnReservarAsiento.click(function (e) {
    e.preventDefault();
    avion.reservar();
});

btnLiberar.click(function (e) {
    menu.addClass("no-display");
    reservarAsiento.removeClass("no-display");
    dni.attr(`disabled`, true);
    nombre.attr(`disabled`, true);
    apellido.attr(`disabled`, true);
    btnLiberarAsiento.removeClass("no-display");
    btnReservarAsiento.addClass("no-display");
    e.preventDefault();
    avion.liberar();


});