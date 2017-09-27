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
                $("#userDNI").removeAttr("disabled");
                $("#userNombre").removeAttr("disabled");
                $("#userApellido").removeAttr("disabled");
                $("#userDNI").val("");
                $("#userNombre").val("");
                $("#userApellido").val("");
                // this.limpiar();
            }
        }
        this.limpiarBuscar();
    }
    reservar() {
        let asiento = $("#userAsiento").val();
        let imprimir = $("#imprimir");

        if (this.buscarAsiento() == true) {
            alert("El asiento ya está ocupado");
        } else if (($("#userNombre").val() == "") && ($("#userApellido").val() == "") && ($("#userDNI").val() == "")) {
            alert("El registro está vacío, intentalo nuevamente");
        } else if (($("#userNombre").val() == "") || ($("#userApellido").val() == "") || ($("#userDNI").val() == "")) {
            alert("Faltan ingresar datos");
        } else if (asiento == "") {
            alert("Falta seleccionar el número de asiento a ser ocupado");
        } else {
            this.pasajeros.push(new Pasajero($("#userNombre").val(), $("#userApellido").val(), $("#userDNI").val(), asiento));
            imprimir.html = `<strong>Asiento Registrado</strong> </br>Nombre: ${ $("#userNombre").val()} </br>Apellido:  ${$("#userApellido").val()} </br>DNI: ${ $("#dni").val()} </br>Asiento: ${asiento}`;
            this.limpiar();
            let x = this._asientos.indexOf(asiento);
            console.log(x);
            this.celdas[x].style.backgroundColor = "#73C6B6";
        }
        
    }
    cancelar() {

        let n = this._asientos.indexOf(this.asiento.val());
        this.celdas[n].style.backgroundColor = "white";
        for (let i = 0; i < this.pasajeros.length; i++) {
            if (this.asiento.val() == this.pasajeros[i].asiento) {
                this.pasajeros.splice(i, 1);
                alert("Asiento liberado");
            }
        }
        this.limpiar();
    }
    listar() {
        let listado = $("#listado");
        let lista = "<h4>Listado de asientos ocupados</h4>";
        if (datos == []) {
            alert("Todos los asientos están vacíos")
        } else {
            for (let i = 0; i < this.pasajeros.length; i++) {
                let datos = this.pasajeros[i];
                let sNombre = datos.nombre;
                let sApellido = datos.apellido;
                let sDni = datos.dni;
                let sAsiento = datos.asiento;
                lista += `<div><strong> Asiento: ${sAsiento} </strong> <br/>Nombre: ${sNombre} </br>Apellido: ${sApellido} </br> DNI: ${sDni} </div> </br>`;
                listado.html(lista);
            }
        }
    }
    buscarPorDni() {
        let dniBuscado = document.getElementById("buscarDNI").value;
        let dniEncontrado = document.getElementById("dniEncontrado");
        let res = "";
        for (let i = 0; i < this.pasajeros.length; i++) {
            if (dniBuscado == this.pasajeros[i].dni) {
                res = "<strong>DNI: </strong>" + dniBuscado + "<br/> Nombre: " + this.pasajeros[i].nombre + "<br/>Apellido: " + this.pasajeros[i].apellido + "<br/>Asiento: " + this.pasajeros[i].asiento;
                break;
            } else {
                res = "<strong>DNI: </strong>" + dniBuscado + "<br/> DNI no registrado";
            }
        }
        dniEncontrado.innerHTML = res;
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
    limpiar() {
        let inputs = $("input");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }
        this.asiento.html = "";
    }
    limpiarLista() {
        let listado = $("#listado");
        listado.html = "";
    }
    limpiarBuscar() {
        let espacio = $("#dniEncontrado");
        let input = $("#buscarDNI");
        espacio.html("");
        input.val("");
    }
    limpiarReservar() {
        let espacio = $("#imprimir");
        espacio.html("");
        this.limpiar();
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
            $(`#${this.navegacion[1]}`).addClass("no-display");
            $(`#${this.navegacion[4]}`).removeClass("no-display");
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
        // $("#btnLimpiarReservar").click(() => this.limpiarReservar());
        $("#btnListar").click(() => this.listar());
        // $("#btnLimpiarLista").click(()=> this.limpiarLista());
    }
}

let avion = new Avion;

$(document).ready(() => {
    avion.iniciar();


});