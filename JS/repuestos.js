
//CAPTURAS NODOS DOM

    let repuestos = document.getElementById("repuestos")
    let guardarRepuestoBtn = document.getElementById("guardarRepuestoBtn")
    /* let verCatalogoBtn = document.getElementById("verCatalogo")
    let ocultarCatalogoBtn = document.getElementById("ocultarCatalogo") */
    let buscador = document.getElementById("buscador")
    let coincidencia = document.getElementById("coincidencia")
    let selectOrden = document.getElementById("selectOrden")
    let botonCarrito = document.getElementById("botonCarrito")
    let modalBodyCarrito = document.getElementById ("modal-bodyCarrito")
    let formAgregarRepuesto = document.getElementById("formAgregarRepuesto")
    let precioTotal = document.getElementById("precioTotal")
    
// Fecha

    const DateTime = luxon.DateTime

    const fechaHoy = DateTime.now()
    let fecha = document.getElementById("fecha")
    let fechaMostrar = fechaHoy.toLocaleString(DateTime.DATE_FULL)
    fecha.innerHTML = `${fechaMostrar}`
    
// FUNCTIONS PROYECTO
    
    function mostrarCatalogo(array){
        repuestos.innerHTML = ""
        for(let repuesto of array){

            let nuevoRepuesto = document.createElement("div")
            nuevoRepuesto.classList.add("col-12", "col-md-6" , "col-lg-4" , "my-3")
            nuevoRepuesto.innerHTML = `
            <div id="${repuesto.id}" class="card" style="width: 18rem;">
                <img src="../assets/bombaagua1.jpg" height="250" width="250" alt="${repuesto.nombre} marca ${repuesto.marca}">
                <div class="card-body">
                    <h3 class="card-title">${repuesto.nombre}</h3>
                    <p>Marca: ${repuesto.marca}</p>
                    <p class="">Precio: $${repuesto.precio}</p>
                    <p>Iva: $${repuesto.precio*0.21}</p>
                    <p>Venta: $${(repuesto.precio*0.21)+repuesto.precio}</p>
                    <p>Categoria: ${repuesto.categoria}</p>
                    <p>Utilidad: ${repuesto.utilidad}</p>
                    <button id="agregarBtn${repuesto.id}" class="btn btn-outline-success">Agregar al carrito</button>
                </div>
            </div>`
            repuestos.appendChild(nuevoRepuesto)

            let btnAgregar = document.getElementById(`agregarBtn${repuesto.id}`)
            btnAgregar.addEventListener("click", ()=>{
                agregarAlCarrito(repuesto)
            })
        }
    }

    let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []

    function agregarAlCarrito(repuesto){
        let repuestoAgregado = productosEnCarrito.find((elem)=> elem.id == repuesto.id)
    
        if(repuestoAgregado == undefined){
            //nivel lógica del array
            console.log(`El repuesto ${repuesto.nombre} de ${repuesto.marca} ha sido agregado. Vale ${repuesto.precio}`)
            productosEnCarrito.push(repuesto)
            console.log(productosEnCarrito)
            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
            // cargarProductosCarrito(productosEnCarrito)
            //sweet alert
            Swal.fire({
                title: "Ha agregado un producto :D",
                text: `El repuesto ${repuesto.nombre} de ${repuesto.marca} ha sido agregado`,
                icon: "info",
                confirmButtonText: 'Entendido',
                confirmButtonColor: "green",
                //duración en mili segundos del alert
                timer: 3000,
                imageUrl: `assets/${nombre.imagen}`,
                imageHeight: 200
            })

        }else{
            console.log(`El repuesto ${repuestoAgregado.nombre} ya existe en el carrito`)
            Swal.fire({
                title: `Producto ya existente`,
                text: `EL repuesto ${repuestoAgregado.nombre} de ${repuestoAgregado.marca} ya existe en el carrito`,
                icon: "info",
                timer: 2000,
                // confirmButton: false
            })
        }
    }

    function cargarRepuesto(array){
    
        let inputNombre = document.getElementById("nombreInput")
        let inputMarca = document.getElementById("marcaInput")
        let inputPrecio = document.getElementById("precioInput")
        /* let inputIva = document.getElementById("ivaInput")
        let inputPrecioVenta = document.getElementById("precioVentaInput") */
        let inputCategoria = document.getElementById("categoriaInput")
        let inputUtilidad = document.getElementById("utilidadInput")
    
        //creamos nuevo objeto 
        const repuestoNuevo = new Repuesto(array.length+1, inputNombre.value, inputMarca.value, inputPrecio.value, [inputPrecio*0.21].value, [(inputPrecio*0.21)+inputPrecio].value, inputCategoria.value, inputUtilidad.value,  "desconocido.png")
        console.log(repuestoNuevo)
        //sumarlo a catalogo
        array.push(repuestoNuevo)
        console.log(array)
        //guardar en localStorage
        localStorage.setItem("catalogo", JSON.stringify(array))
        mostrarCatalogo(array)
    
        formAgregarRepuesto.reset()
        Toastify({
            text: `Usted ha agregado el repuesto ${repuestoNuevo.nombre} al stock`,
            gravity: "top",
            position: "right",
            style:{
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                color: "black"
            },
            duration: 8000
        }).showToast()
    }
    
    function buscarInfo(buscado, array){
        //método filter
        //si quiero que la búsqueda sea por coincidencia estricta ej:
        // (repuesto) => repuesto.marca.toLowerCase() == buscado.toLowerCase() || repuesto.nombre.toLowerCase() == buscado.toLowerCase()
        let busquedaArray = array.filter(
            (repuesto) => repuesto.marca.toLowerCase().includes(buscado.toLowerCase()) || repuesto.nombre.toLowerCase().includes(buscado.toLowerCase())
        ) 
        busquedaArray.length == 0 ? 
        (coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`, 
        mostrarCatalogo(busquedaArray)) 
        : 
        (coincidencia.innerHTML = "", 
        mostrarCatalogo(busquedaArray))
    }
    
    //ordenar:
    function ordenarMenorMayor(array){
        //copiamos array original // concat
        const menorMayor = [].concat(array)
        //ordena de menor a mayor
        menorMayor.sort((a,b) => a.precio - b.precio)
        mostrarCatalogo(menorMayor)
    }
    function ordenarMayorMenor(arr){
        //ordenar de mayor a menor
        const mayorMenor = [].concat(arr)
        mayorMenor.sort((param1, param2)=>{
            return param2.precio - param1.precio
        })
        mostrarCatalogo(mayorMenor)
    }
    function ordenarAlfabeticamenteNombre(array){
        const ordenadoAlfabeticamente = [].concat(array)
        ordenadoAlfabeticamente.sort((a,b) => {
            if(a.nombre > b.nombre) {
                return 1
            }
            if (a.nombre < b.nombre) {
                return -1
            }
            // a must be equal to b
            return 0;
        })
        mostrarCatalogo(ordenadoAlfabeticamente)
    }
    
    //agregar al modal carrito
    function cargarProductosCarrito(array){
        modalBodyCarrito.innerHTML = ""
        array.forEach((productoEnCarrito) => {
    
            modalBodyCarrito.innerHTML += `
            <div class="card border-primary mb-3" id ="productoCarrito${productoEnCarrito.id}" style="max-width: 540px;">
                    <img class="card-img-top" height="300px" src="assets/${productoEnCarrito.imagen}" alt="">
                    <div class="card-body">
                        <h4 class="card-title">${productoEnCarrito.nombre}</h4>
                    
                        <p class="card-text">$${productoEnCarrito.precio}</p> 
                        <button class= "btn btn-danger" id="botonEliminar"><i class="fas fa-trash-alt"></i></button>
                    </div>    
            </div>`
        })

        array.forEach((productoEnCarrito)=> {
            //primero debemos capturar
            document.getElementById(`botonEliminar${productoEnCarrito.id}`).addEventListener("click", ()=>{
                //elimnar del DOM
                let cardProducto = document.getElementById(`productoCarrito${productoEnCarrito.id}`)
                cardProducto.remove()
                //eliminar del array de compras
                
                //hago un find para buscar en el array el objeto a eliminar
                let productoEliminar = array.find((repuesto)=>repuesto.id == productoEnCarrito.id)
                console.log(productoEliminar)
                //indexOf para saber el indice en el array
                let posicion = array.indexOf(productoEliminar)
                console.log(posicion)
                array.splice(posicion,1)
                console.log(array)
                //eliminar el storage
                localStorage.setItem("carrito", JSON.stringify(array))
                //recalcular el total
                calcularTotal(array)
            })
    
        })

        calcularTotal(array)
    }
    function calcularTotal(array){
        let total = array.reduce((acc, productoCarrito)=> acc + productoCarrito.precio ,0)
        console.log("Con reduce " +total)
    
        // console.log("Con reduce " +total)

        // let acumulador = 0
        // for(let libro of array){
        //     acumulador = acumulador + libro.precio
        // }
        // console.log("Con for of " + acumulador)
        //condicion ? true : false
    
        total == 0 ? precioTotal.innerHTML = `No hay productos en el carrito` :
        precioTotal.innerHTML = `El total del carrito es <strong>${total}</strong>`
    }
    //EVENTOS:
    
    guardarRepuestoBtn.addEventListener("click", ()=>{
        cargarRepuesto(catalogo)
    })
    
    
    
    buscador.addEventListener("input", ()=>{
        buscarInfo(buscador.value.toLowerCase(), catalogo)
    }) 
    
    selectOrden.addEventListener("change", ()=>{
        console.log(selectOrden.value)
        if(selectOrden.value == 1){
            ordenarMayorMenor(catalogo)
        }else if(selectOrden.value == 2){
            ordenarMenorMayor(catalogo)
        }else if(selectOrden.value == 3){
            ordenarAlfabeticamenteNombre(catalogo)
        }else{
            mostrarCatalogo(catalogo)
        }
    })
    botonCarrito.addEventListener("click", ()=>{
        cargarProductosCarrito(productosEnCarrito)
    })
    //código:
    mostrarCatalogo(catalogo)
    