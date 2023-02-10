
//CAPTURAS NODOS DOM

    let repuestos = document.getElementById("repuestos")
    let guardarRepuestoBtn = document.getElementById("guardarRepuestoBtn")
    let buscador = document.getElementById("buscador")
    let coincidencia = document.getElementById("coincidencia")
    let selectOrden = document.getElementById("selectOrden")
    let botonCarrito = document.getElementById("botonCarrito")
    let modalBodyCarrito = document.getElementById ("modal-bodyCarrito")
    let formAgregarRepuesto = document.getElementById("formAgregarRepuesto")
    let precioTotal = document.getElementById("precioTotal")
    let fecha = document.getElementById("fecha")
    let loaderTexto = document.getElementById("loaderTexto")
    let loader = document.getElementById("loader")
    let reloj = document.getElementById("reloj")
    let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")

/* Fecha */

    const DateTime = luxon.DateTime
    const fechaHoy = DateTime.now()
    let fechaMostrar = fechaHoy.toLocaleString(DateTime.DATE_FULL)
    fecha.innerHTML = `${fechaMostrar}`

/* Hora */

    setInterval(()=>{
        let horaActual = DateTime.now().toLocaleString(DateTime.TIME_24_WITH_SECONDS)
        reloj.innerHTML = `${horaActual}`
    },1000)

/* Reload */

    setTimeout(()=>{
        loaderTexto.innerHTML = ""
        loader.remove()
        mostrarCatalogo(stock)
    }, 3000)

/* FUNCTIONS */
    
    /* MOSTRAR STOCK */

        function mostrarCatalogo(array){
            repuestos.innerHTML = ""
            for(let repuesto of array){
                let nuevoRepuesto = document.createElement("div")
                nuevoRepuesto.classList.add("col-12", "col-md-6" , "col-lg-4" , "my-3")
                nuevoRepuesto.innerHTML = `
                <div id="${repuesto.id}" class="card" style="width: 18rem;">
                    <img class="card-im-top img-fluid" src="../assets/${repuesto.imagen}" height="250" width="250" alt="${repuesto.nombre} de marca ${repuesto.marca}">
                    <div class="card-body">
                        <h3 class="card-title">${repuesto.nombre}</h3>
                        <p>Marca: ${repuesto.marca}</p>
                        <p class="${repuesto.precio <= 1000 && "ofertaRepuesto"}">Precio: ${repuesto.precio}</p>
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

    /* AGREGAR AL CARRITO */

        function agregarAlCarrito(repuesto){
            let repuestoAgregado = productosEnCarrito.find((elem)=> elem.id == repuesto.id)
        
            if(repuestoAgregado == undefined){
                console.log(`El repuesto ${repuesto.nombre} de ${repuesto.marca} ha sido agregado. Vale ${repuesto.precio}. Su categoria es ${repuesto.categoria} y se utiliza en ${repuesto.utilidad}`)
                productosEnCarrito.push(repuesto)
                console.log(productosEnCarrito)
                localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
                Swal.fire({
                    title: "Ha agregado un producto :D",
                    text: `El repuesto ${repuesto.nombre} de ${repuesto.marca} ha sido agregado`,
                    icon: "info",
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: "green",
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
                })
            }
        }

    /* CARGAR REPUESTO */

        function cargarRepuesto(array){
        
            let inputNombre = document.getElementById("nombreInput")
            let inputMarca = document.getElementById("marcaInput")
            let inputPrecio = document.getElementById("precioInput")
            let inputCategoria = document.getElementById("categoriaInput")
            let inputUtilidad = document.getElementById("utilidadInput")
        
        /* creamos nuevo objeto */ 
            const repuestoNuevo = new Repuesto(array.length+1, inputNombre.value, inputMarca.value, inputPrecio.value, inputCategoria.value, inputUtilidad.value, "desconocido.png")
            console.log(repuestoNuevo)
        /* sumarlo a stock */
            array.push(repuestoNuevo)
            console.log(array)
        /* guardar en localStorage */
            localStorage.setItem("stock", JSON.stringify(array))
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

    /* BUSCADOR DE REPUESTOS */

        function buscarInfo(buscado, array){
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

    /* ORDENAR CATALOGO */

        function ordenarMenorMayor(array){
            const menorMayor = [].concat(array)
            menorMayor.sort((a,b) => a.precio - b.precio)
            mostrarCatalogo(menorMayor)
        }
        function ordenarMayorMenor(arr){
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

    /* AGREGAR AL MODAL CARRITO */

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
                document.getElementById(`botonEliminar${productoEnCarrito.id}`).addEventListener("click", ()=>{
                    let cardProducto = document.getElementById(`productoCarrito${productoEnCarrito.id}`)
                    cardProducto.remove()
                    let productoEliminar = array.find((repuesto)=>repuesto.id == productoEnCarrito.id)
                    console.log(productoEliminar)
                    let posicion = array.indexOf(productoEliminar)
                    console.log(posicion)
                    array.splice(posicion,1)
                    console.log(array)
                    localStorage.setItem("carrito", JSON.stringify(array))
                    calcularTotal(array)
                })
            
            })

            calcularTotal(array)
        }
        
        function calcularTotal(array){
            let total = array.reduce((acc, productoCarrito)=> acc + productoCarrito.precio ,0)
            console.log("Con reduce " +total)
            total == 0 ? precioTotal.innerHTML = `No hay productos en el carrito` :
            precioTotal.innerHTML = `El total del carrito es <strong>${total}</strong>`
        }

        function finalizarCompra(){
            Swal.fire({
                title: 'Está seguro de realizar la compra',
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Sí, seguro',
                cancelButtonText: 'No, no quiero',
                confirmButtonColor: 'green',
                cancelButtonColor: 'red',
            }).then((result)=>{
                if(result.isConfirmed){
                    Swal.fire({
                        title: 'Compra realizada',
                        icon: 'success',
                        confirmButtonColor: 'green',
                        text: `Muchas gracias por su compra ha adquirido nuestros productos. `,
                        })
                        //resetear carrito
                        productosEnCarrito = []
                        //removemos storage
                        localStorage.removeItem("carrito")
                }else{
                    Swal.fire({
                        title: 'Compra no realizada',
                        icon: 'info',
                        text: `La compra no ha sido realizada! Atención sus productos siguen en el carrito :D`,
                        confirmButtonColor: 'green',
                        timer:3500
                    })
                }
            })
        }

    //EVENTOS:

    guardarRepuestoBtn.addEventListener("click", ()=>{
        cargarRepuesto(stock)
    })
    
    
    /* buscador.addEventListener("input", ()=>{
        buscarInfo(buscador.value.toLowerCase(), stock)
    })  */
    
    selectOrden.addEventListener("change", ()=>{
        console.log(selectOrden.value)
        if(selectOrden.value == 1){
            ordenarMayorMenor(stock)
        }else if(selectOrden.value == 2){
            ordenarMenorMayor(stock)
        }else if(selectOrden.value == 3){
            ordenarAlfabeticamenteNombre(stock)
        }else{
            mostrarCatalogo(stock)
        }
    })
    botonCarrito.addEventListener("click", ()=>{
        cargarProductosCarrito(productosEnCarrito)
    })

    botonFinalizarCompra.addEventListener("click", ()=>{
        finalizarCompra()})
