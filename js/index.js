const sliderImg = document.querySelectorAll('.slider_img')
const sliderNext = document.querySelector('.next')

let foto = 0
let tam = document.querySelector('.slider_container');

sliderImg[foto].classList.add('isActive');

sliderNext.addEventListener('click', () => {

	foto++

	if (foto >= tam.children.length) {
		foto = 0
	}

	sliderImg.forEach((eachImg, j) => {
		sliderImg[j].classList.remove('isActive')
	})
	sliderImg[foto].classList.add('isActive')

})

function enviarFormulario() {
	let nombre = document.getElementById('nombre');
	let email = document.getElementById('email');
	let mensaje = document.getElementById('mensaje');

	if (nombre.value != "" && email.value != "" && mensaje.value != "") {
		alert("Formulario Enviado");
		nombre.value = "";
		email.value = "";
		mensaje.value = "";
	}

}


//variable que muestra el estado visible del carrito
var carritoVisible = false;

//carga de los elementos de la pagina y continue el script
if(document.readyState=='loading'){
	document.addEventListener('DOMContentLoaded', ready)
}else{
	ready();
}

function ready(){
	//agregar funcionalidad a los bontones de eliminar
	var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
	for(var i=0; i < botonesEliminarItem.length;i++){
		var button = botonesEliminarItem[i];
		button.addEventListener('click', eliminarItemCarrito);
	}

	//agrego funionalidad al boton sumar
	var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
	for(var i=0; i< botonesSumarCantidad.length;i++){
		var button =botonesSumarCantidad[i];
		button.addEventListener('click', sumarCantidad);
	}

	//agrego funionalidad al boton restar
	var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
	for(var i=0; i< botonesRestarCantidad.length;i++){
		var button =botonesRestarCantidad[i];
		button.addEventListener('click', restarCantidad);
	}

	//agrego funcion al boton agregar al carrito
	var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
	for ( var i=0; i < botonesAgregarAlCarrito.length;i++){
		var button = botonesAgregarAlCarrito[i];
		button.addEventListener('click', agregarAlCarritoClicked);
	}

	//agrego el valor al boton total pagar
	document.getElementsByClassName('carrito-precio-total').value=document.getElementsByClassName('precio-item').value;

	//agregra funcion al boton de pagar
	document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked)


}

//se eliminan los item del carrito seleccionado
function eliminarItemCarrito(event){
	var buttonClicked = event.target;
	buttonClicked.parentElement.parentElement.remove();

	//actualizamos el total de carrito una vez que eliminamos un item
	actualizarTotalCarrito();

	//funcion para controlar si hay elementos en el carrito una vez que se elimino
	//si no hay se oculta el carrito
	ocultarCarrito();
}

//Actualiza el total del carrito
function actualizarTotalCarrito(){
	//seleccionamos el contenedor del carrito
	var carritoContenedor = document.getElementsByClassName('carrito')[0];
	var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');	
    var total = 0;

	//recorremos cada elemento del carrito para actualizar el total
	for(var i=0; i< carritoItems.length;i++){
		var item = carritoItems[i];
		var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
		console.log(precioElemento);

		//quitamos el simbolo de euro y la coma
		var precio = parseFloat(precioElemento.innerText.replace('€','').replace(',',''));
		console.log(precio);
		var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
		var cantidad = cantidadItem.value;
		console.log(cantidad);
		total = total + (precio * cantidad);

	}

	total = Math.round(total*100)/100;
	document.getElementsByClassName('carrito-precio-total')[0].innerText = '€' + total.toLocaleString("es") + ',00';

}

function ocultarCarrito(){
	var carritoItems = document.getElementsByClassName('carrito-items')[0];
	if(carritoItems.childElementCount==0){
		var carrito = document.getElementsByClassName('carrito')[0];
		carrito.style.marginRight = '-100%';
		carrito.style.opacity='0';
		carritoVisible= false;

		//ahora maximizo el contenido de los elementos
		var items = document.getElementsByClassName('contenedor-items')[0];
		items.style.width='100%';


	}
}

//aumento en uno la cantidad de elemento seleccionado
function sumarCantidad(event){
	var buttonClicked = event.target;
	var selector = buttonClicked.parentElement;
	var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
	console.log(cantidadActual);
	cantidadActual++;
	selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
	//actualizamos el total
	actualizarTotalCarrito();

}

function restarCantidad(event){
	var buttonClicked = event.target;
	var selector = buttonClicked.parentElement;
	var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
	console.log(cantidadActual);
	cantidadActual--;

	//si la cantidad es menor a 1
	if(cantidadActual>=1){
		selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
	//actualizamos el total
	actualizarTotalCarrito();
	}
}

function agregarAlCarritoClicked(event){
	var button = event.target;
	var item = button.parentElement;
	var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
	console.log(titulo);
	var precio = item.getElementsByClassName('precio-item')[0].innerText;
	var imagenSrc = item.getElementsByClassName('img-item')[0].src;
	console.log(imagenSrc);

	//la siguiente funcion agrega el elemento al carrito enviando los parametros como valores
	agregarItemAlCarrito(titulo, precio, imagenSrc);

	//mostrar el carrito cuando se seleccione un item por primera vez
	hacerVisibleCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc){
	var item = document.createElement('div');
	item.classList.add = 'item';
	var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

	//con esta se controla que el item seleccionado no se encuentre ya en el carrito
	var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
	for(var i=0; i< nombresItemsCarrito.length;i++){
		if(nombresItemsCarrito[i].innerText==titulo){
			alert("El item ya se encuentra en el carrito");
			return;
		}
		
	}

	var itemCarritoContenido = 	`
	   <div class="carrito-item">
          <img src="${imagenSrc}" alt="" class="zapa">
          <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
              <i class="fa-solid fa-minus restar-cantidad"></i>
              <input type="text" value="1" class="carrito-item-cantidad" disabled>
              <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
            <span class="carrito-item-precio">${precio}</span>
          </div>
          <span class="btn-eliminar">
            <i class="fa-solid fa-trash"></i>
          </span>
        </div>
	     `
	item.innerHTML= itemCarritoContenido;
	itemsCarrito.append(item);

	//agregamos funcion al boton eliminar del nuevo item
	item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

	//agregamos la funciona de sumar al nuevo item
	var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
	botonSumarCantidad.addEventListener('click', sumarCantidad);

	//agregamos la funciona de restar al nuevo item
	var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
	botonRestarCantidad.addEventListener('click', restarCantidad);
}

function pagarClicked(event){
	alert("Gracias por su Compra");
	//elimino los elementos del carrito
	var carritoItems = document.getElementsByClassName('carrito-items')[0];
	while(carritoItems.hasChildNodes()){
		carritoItems.removeChild(carritoItems.firstChild);
	}
	actualizarTotalCarrito();

	//funcion que oculta el carrito
	ocultarCarrito();
}

function hacerVisibleCarrito(){
	carritoVisible = true;
	var carrito = document.getElementsByClassName('carrito')[0];
	carrito.style.marginRight = '0';
	carrito.style.opacity = '1';

	var items = document.getElementsByClassName('contenedor-items')[0];
	items.style.width = '60%';
}