let btnIngresar = $("#ingresar");
let bienvenida = $("#bienvenida");
let menu = $("#menu");



btnIngresar.click(function(){
    bienvenida.addClass("no-display"); 
    menu.removeClass("no-display");
});