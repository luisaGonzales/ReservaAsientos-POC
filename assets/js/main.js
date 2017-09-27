'use strict';

class Pasajero {
    constructor(nombre, apellido, dni, asiento) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.asiento = asiento;
    }
}

class Avion {
    constructor() {
        this.navegacion = ["bienvenida", "menu", "reservarAsiento", "busqueda", "imprimirLista"];
        this._asientos = [];
        this.pasajeros = [];
        this.asiento = $("#userAsiento");
        this.celdas = document.getElementsByTagName('td');
        for (let i = 0; i < this.celdas.length; i++) {
            this.celdas[i].onclick = () => (this.redirect(event));
            this._asientos.push(this.celdas[i].textContent);
        }
    }
    redirect(event) {
        let asiento = $("#userAsiento").val(event.target.textContent);
        console.log(asiento);
        for (let i = 0; i < this.pasajeros.length; i++) {
            if (this.pasajeros[i].asiento == $("#userAsiento").val()) {
                $("#userNombre").val(this.pasajeros[i].nombre);
                $("#userApellido").val(this.pasajeros[i].apellido);
                $("#userDNI").val(this.pasajeros[i].dni);
                $("#userDNI").attr("disabled", "disabled");
                $("#userNombre").attr("disabled", "disabled");
                $("#userApellido").attr("disabled", "disabled");
            } else {
                this.limpiarDatos();
                if ($(`#btnReservar`).hasClass("no-display") == false) {
                    $("#userDNI").removeAttr("disabled");
                    $("#userNombre").removeAttr("disabled");
                    $("#userApellido").removeAttr("disabled");
                }
            }
        }
        this.limpiarBuscar();
    }
    reservar() {
        let asiento = $("#userAsiento").val();

        if (this.buscarAsiento() == true) {
            swal({
                title: "Error",
                text: "El asiento ya está ocupado",
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
        } else if (($("#userNombre").val() == "") && ($("#userApellido").val() == "") && ($("#userDNI").val() == "")) {
            swal({
                title: "Error",
                text: "El registro está vacío, intentalo nuevamente",
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
        } else if (($("#userNombre").val() == "") || ($("#userApellido").val() == "") || ($("#userDNI").val() == "")) {
            swal({
                title: "Error",
                text: "Faltan ingresar datos",
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
        } else if (asiento == "") {
            swal({
                title: "Error",
                text: "Falta seleccionar el número de asiento a ser ocupado",
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
        } else {
            this.pasajeros.push(new Pasajero($("#userNombre").val(), $("#userApellido").val(), $("#userDNI").val(), asiento));
            let imprimir = `Nombre: ${ $("#userNombre").val()} Apellido:  ${$("#userApellido").val()} DNI: ${ $("#userDNI").val()} Asiento: ${asiento}`;
            swal({
                title: 'Asiento Registrado',
                text: imprimir,
                type: 'success',
                confirmButtonText: 'Aceptar'
            });
            this.limpiar();
            let x = this._asientos.indexOf(asiento);
            this.celdas[x].classList.add("reservado");
        }

    }
    cancelar() {
        let n = this._asientos.indexOf(this.asiento.val());
        this.celdas[n].classList.remove("reservadogit ");
        for (let i = 0; i < this.pasajeros.length; i++) {
            if (this.asiento.val() == this.pasajeros[i].asiento) {
                this.pasajeros.splice(i, 1);
                swal({
                    title: "Operación Exitosa",
                    text: "Asiento Liberado",
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                });
            }
        }
        this.limpiar();
    }
    listar() {
        let listado = $("#listado");
        let lista = "<h4 class='text4'>Lista de asientos ocupados</h4>";
        if (this.pasajeros.length == 0) {
            swal({
                title: "Búsqueda",
                text: "Todos los asientos están vacíos",
                type: 'info',
                confirmButtonText: 'Aceptar'
            });
        } else {
            console.log(this.pasajeros);
            this.pasajeros.sort((a, b)=>{return (parseInt(a.asiento) - parseInt(b.asiento));});
            console.log(this.pasajeros);
            for (let i = 0; i < this.pasajeros.length; i++) {
                let datos = this.pasajeros[i];
                let sNombre = datos.nombre;
                let sApellido = datos.apellido;
                let sDni = datos.dni;
                let sAsiento = datos.asiento;
                lista += `<div class='text-center lista'><strong> Asiento: ${sAsiento} </strong> <br/>Nombre: ${sNombre} </br>Apellido: ${sApellido} </br> DNI: ${sDni} </div> </br>`;
                listado.html(lista);
            }
        }
    }
    buscarPorDni() {
        let dniBuscado = $("#buscarDNI").val();
        let dniEncontrado = $("#dniEncontrado");
        let res = "";
        for (let i = 0; i < this.pasajeros.length; i++) {
            if (dniBuscado == this.pasajeros[i].dni) {
                res = "DNI: " + dniBuscado + "\n Nombre: " + this.pasajeros[i].nombre + " Apellido: " + this.pasajeros[i].apellido + " Asiento: " + this.pasajeros[i].asiento;
                break;
                
            } else {
                swal({
                    title: "Error",
                    text: "DNI no registrado",
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                });
                $("#buscarDNI").val() = "";
            }
        }
        swal({
            title: "DNI encontrado",
            text: res,
            type: 'info',
            confirmButtonText: 'Aceptar'
        });
        $("#buscarDNI").val() = "";

    }
    buscarAsiento() {
        let asiento = this.asiento.val();
        let res;
        for (let i = 0; i < this.pasajeros.length; i++) {
            if (asiento == this.pasajeros[i].asiento) {
                res = true;
            } else {
                res = false;
            }
        }
        return res;
    }
    limpiarDatos() {
        $("#userDNI").val("");
        $("#userNombre").val("");
        $("#userApellido").val("");
    }
    limpiar() {
        let inputs = $("input");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }
        this.asiento.html = "";
    }
    limpiarBuscar() {
        let espacio = $("#dniEncontrado");
        let input = $("#buscarDNI");
        espacio.html("");
        input.val("");
    }
    iniciar() {
        $("#ingresar").click(() => {
            $(`#${this.navegacion[0]}`).addClass("no-display");
            $(`#${this.navegacion[1]}`).removeClass("no-display");
        });
        // Opciones
        $("#opReservar").click(() => {
            $(`#${this.navegacion[1]}`).addClass("no-display");
            $(`#${this.navegacion[2]}`).removeClass("no-display");
            $(`#btnReservar`).removeClass("no-display");
            $(`#btnCancelar`).addClass("no-display");
            $("#userDNI").removeAttr("disabled");
            $("#userNombre").removeAttr("disabled");
            $("#userApellido").removeAttr("disabled");
        });
        $("#opLiberar").click(() => {
            $(`#${this.navegacion[1]}`).addClass("no-display");
            $(`#${this.navegacion[2]}`).removeClass("no-display");
            $(`#btnReservar`).addClass("no-display");
            $(`#btnCancelar`).removeClass("no-display");
            $("#userDNI").attr("disabled", "disabled");
            $("#userNombre").attr("disabled", "disabled");
            $("#userApellido").attr("disabled", "disabled");
        });
        $("#opBuscar").click(() => {
            $(`#${this.navegacion[1]}`).addClass("no-display");
            $(`#${this.navegacion[3]}`).removeClass("no-display");
        });
        $("#opListar").click(() => {
            this.limpiar();
            $(`#${this.navegacion[1]}`).addClass("no-display");
            $(`#${this.navegacion[4]}`).removeClass("no-display");
            this.listar();
        });
        // Navegacion
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
        // Funcionalidades
        $("#btnBuscarDNI").click(() => this.buscarPorDni());
        $("#btnReservar").click(() => this.reservar());
        $("#btnCancelar").click(() => this.cancelar());
    }
}

let avion = new Avion;

$(document).ready(() => {
    avion.iniciar();
});