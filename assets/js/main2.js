'use strict';

// Datos 

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
        this._asientos = [];
        this.pasajeros = [];
        this.celdas = document.getElementsByTagName('td');
        for (let i = 0; i < this.celdas.length; i++) {
            this.celdas[i].onclick = () => (this.redirect(event));
            this._asientos.push(this.celdas[i].textContent);
        }
    }
    redirect(event) {
        document.getElementById("mostrar").innerHTML = (event.target.textContent);
        let buscarAsiento = document.getElementById("mostrar").textContent;
        console.log(this.pasajeros);
        for (let i = 0; i < this.pasajeros.length; i++) {
            if (this.pasajeros[i].asiento == buscarAsiento) {
                document.getElementById("userNombre").value = this.pasajeros[i].nombre;
                document.getElementById("userApellido").value = this.pasajeros[i].apellido;
                document.getElementById("userDNI").value = this.pasajeros[i].dni;
            }
        }
        this.limpiarBuscar();
    }
    reservar() {
        let nombre = document.getElementById("userNombre").value;
        let apellido = document.getElementById("userApellido").value;
        let dni = document.getElementById("userDNI").value;
        let asiento = document.getElementById("mostrar").textContent;
        let imprimir = document.getElementById("imprimir");
        let comprobar = this.buscarAsiento();
        if (comprobar == true) {
            alert("El asiento ya está ocupado");
        } else if ((nombre == "") && (apellido == "") && (dni == "")) {
            alert("El registro está vacío, intentalo nuevamente");
        } else if ((nombre == "") || (apellido == "") || (dni == "")) {
            alert("Faltan ingresar datos");
        } else if (asiento == "") {
            alert("Falta seleccionar el número de asiento a ser ocupado");
        } else {
            this.pasajeros.push(new Pasajero(nombre, apellido, dni, asiento));
            imprimir.innerHTML = "<strong>Asiento Registrado</strong> </br>Nombre: " + nombre + "</br>Apellido: " + apellido + "</br>DNI: " + dni + "</br>Asiento:" + asiento;
            this.limpiar();
        }
        let x = this._asientos.indexOf(asiento);
        this.celdas[x].style.backgroundColor = "#73C6B6";
    }
    cancelar() {
        let asiento = document.getElementById("mostrar").textContent;
        let res;
        let n = this._asientos.indexOf(asiento);
        this.celdas[n].style.backgroundColor = "white";
        for (let i = 0; i < this.pasajeros.length; i++) {
            if (asiento == this.pasajeros[i].asiento) {
                this.pasajeros.splice(i, 1);
                alert("Asiento liberado");
                this.limpiar();
            }
        }
    }
    listar() {
        let listado = document.getElementById("listado");
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
                lista += "<div><strong> Asiento: " + sAsiento + "</strong> <br/>Nombre:" + sNombre + "</br>Apellido: " + sApellido + "</br> DNI: " + sDni + "</div> </br>";
                listado.innerHTML = lista;
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
        let asiento = document.getElementById("mostrar").textContent;
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
        let inputs = document.getElementsByTagName("input");
        let espacioAsiento = document.getElementById("mostrar");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }
        espacioAsiento.innerHTML = "";
    }
    limpiarLista() {
        let listado = document.getElementById("listado");
        listado.innerHTML = "";
    }
    limpiarBuscar() {
        let espacio = document.getElementById("dniEncontrado");
        let input = document.getElementById("buscarDNI");
        espacio.innerHTML = "";
        input.value = "";
    }
    limpiarReservar() {
        let espacio = document.getElementById("imprimir");
        espacio.innerHTML = "";
        this.limpiar();
    }
    iniciar() {
        $("#btnBuscarDNI").click(() => this.buscarPorDni());
        $("#btnReservar").click(() => this.reservar());
        $("#btnCancelar").click(() => this.cancelar());
        $("#btnLimpiarReservar").click(() => this.limpiarReservar());
        $("#btnListar").click(() => this.listar());
        $("#btnLimpiarLista").click(()=> this.limpiarLista());
    }
}

// let avion = new Avion;

$(document).ready(() => {
    
        let avion = new Avion();
        avion.iniciar();
    })
