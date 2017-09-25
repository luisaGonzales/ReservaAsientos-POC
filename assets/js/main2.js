'use strict'
var _asientos = [];
var pasajeros = [];

var celdas = document.getElementsByTagName('td');
for (var i = 0; i < celdas.length; i++) {
    celdas[i].addEventListener('click',redirect,false);
    _asientos.push(celdas[i].textContent);
  }
function redirect(event){
    document.getElementById("mostrar").innerHTML= (event.target.textContent);
    var buscarAsiento = document.getElementById("mostrar").textContent;
      for(var i = 0; i < pasajeros.length; i++){
        if(pasajeros[i].asiento == buscarAsiento){
          document.getElementById("userNombre").value = pasajeros[i].nombre;
          document.getElementById("userApellido").value = pasajeros[i].apellido;
          document.getElementById("userDNI").value = pasajeros[i].dni;
        }
      }
      limpiarBuscar();
}

function Pasajero(nombre,apellido,dni, asiento){
  this.nombre = nombre;
  this.apellido = apellido;
  this.dni = dni;
  this.asiento = asiento;
}
function reservar (){
  var nombre = document.getElementById("userNombre").value;
  var apellido = document.getElementById("userApellido").value;
  var dni = document.getElementById("userDNI").value;
  var asiento = document.getElementById("mostrar").textContent;
  var imprimir = document.getElementById("imprimir");
  var comprobar = buscarAsiento();
  if(comprobar == true){
    alert("El asiento ya está ocupado");
  }
  else if((nombre == "") && (apellido == "") && (dni == "")){
    alert("El registro está vacío, intentalo nuevamente");
    }
  else if ((nombre == "") || (apellido == "") || (dni == "")){
    alert("Faltan ingresar datos");
    }
  else if(asiento == ""){
    alert("Falta seleccionar el número de asiento a ser ocupado");
  }
  else {
      pasajeros.push(new Pasajero(nombre, apellido,dni,asiento));
      imprimir.innerHTML = "<strong>Asiento Registrado</strong> </br>Nombre: " + nombre + "</br>Apellido: " + apellido + "</br>DNI: " + dni + "</br>Asiento:" + asiento;
      limpiar();
    }
  var x = _asientos.indexOf(asiento);
  celdas[x].style.backgroundColor = "#73C6B6";
}

function cancelar (){
  var asiento = document.getElementById("mostrar").textContent;
  var res;
  var n = _asientos.indexOf(asiento);
  celdas[n].style.backgroundColor = "white";
  for(var i = 0; i < pasajeros.length; i++){
    if(asiento == pasajeros[i].asiento){
      pasajeros.splice(i,1);
      alert("Asiento liberado");

      limpiar();

    }
  }

    console.log(pasajeros);
}


function listar (){
  var listado = document.getElementById("listado");
  var lista = "<h4>Listado de asientos ocupados</h4>";
  if(datos == []){
    alert("Todos los asientos están vacíos")
  } else {
    for (var i = 0; i < pasajeros.length; i++){
      var datos = pasajeros[i];
      var sNombre = datos.nombre ;
      var sApellido = datos.apellido;
      var sDni = datos.dni;
      var sAsiento = datos.asiento;
      lista += "<div><strong> Asiento: " + sAsiento + "</strong> <br/>Nombre:" + sNombre + "</br>Apellido: " + sApellido + "</br> DNI: " + sDni + "</div> </br>";
      listado.innerHTML = lista;
    }
  }
}

function buscarPorDni (){
  var dniBuscado = document.getElementById("buscarDNI").value;
  var dniEncontrado = document.getElementById("dniEncontrado");
  var res = "";
  for(var i = 0; i < pasajeros.length; i++){
    if(dniBuscado == pasajeros[i].dni){
      res = "<strong>DNI: </strong>" + dniBuscado + "<br/> Nombre: " + pasajeros[i].nombre + "<br/>Apellido: " + pasajeros[i].apellido + "<br/>Asiento: " + pasajeros[i].asiento;
      break;
    } else {
      res = "<strong>DNI: </strong>" + dniBuscado + "<br/> DNI no registrado";
    }
  }
  dniEncontrado.innerHTML = res;

}
function buscarAsiento (){
  var asiento = document.getElementById("mostrar").textContent;
  var res;
  for(var i = 0; i < pasajeros.length; i++){
    if(asiento == pasajeros[i].asiento){
      res = true;
    }
    else{
      res = false;
    }
  }
  return res;
}

function limpiar(){
  var inputs = document.getElementsByTagName("input");
  var espacioAsiento = document.getElementById("mostrar");
  for(var i = 0; i < inputs.length; i++){
    inputs[i].value = "";
  }
  espacioAsiento.innerHTML = "";
}
function limpiarLista(){
  var listado = document.getElementById("listado");
  listado.innerHTML = "";
}
function limpiarBuscar(){
  var espacio = document.getElementById("dniEncontrado");
  var input = document.getElementById("buscarDNI");
  espacio.innerHTML = "";
  input.value = "";

}
function limpiarReservar(){
  var espacio = document.getElementById("imprimir");
  espacio.innerHTML = "";
  limpiar();
}
