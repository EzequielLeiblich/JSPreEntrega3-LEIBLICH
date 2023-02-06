 // -- 1 - Ingresar nuevo repuesto

 function agregarRepuesto(){
    alert("Ingrese los datos correspondientes al nuevo repuesto")
    let nombreIngresado = prompt("Ingese el nombre del repuesto")
    let marcaIngrasada = prompt("Ingrese la marca del repuesto")
    let precioIngresado = parseInt(prompt("Ingrese el precio del repuesto"))
    let suIva = precioIngresado * 0.21
    let suPrecioVenta = precioIngresado + suIva
    let categoriaIngresada = prompt("Ingrese su categoria correspondiente")
    let utilidadIngresada = prompt("Ingrese para que vehiculos se usa")
    const repuestoNuevo = new Repuesto(catalogo.length+1, nombreIngresado, marcaIngrasada, precioIngresado, suIva, suPrecioVenta, categoriaIngresada, utilidadIngresada)

    console.log(repuestoNuevo)
    catalogo.push(repuestoNuevo)
    //guardar en localstorage
    localStorage.setItem("catalogo", JSON.stringify(catalogo))
    repuestoNuevo.mostrarInfoRepuesto()
}

// -- 2 - Ver catalogo

function verCatalogo(array){
    console.log("Nuestro catalogo actual es:")
    array.forEach((repuesto)=>{
        
        repuesto.mostrarInfoRepuesto()
        
    })
}

// -- 3 - Eliminar repuesto

function eliminarRepuesto(array){
    alert("A partir del catalogo ingrese el id que desea eliminar")
    for(let elem of array){
        console.log(`${elem.id} - ${elem.nombre} de la marca ${elem.marca}`)
    }
    let idEliminar = parseInt(prompt("Ingrese el id a eliminar"))
    let arrayID = array.map((repuesto) => repuesto.id)
    console.log(arrayID)
    let indice = arrayID.indexOf(idEliminar)
    array.splice(indice, 1)
    verCatalogo(array)
}

// -- 4 - Buscar repuestos por nombre

function buscarPorNombre(array){
    let nombreBuscado = prompt("Ingrese el nombre del repuesto que desea buscar")
    let nombreEncontrado = array.find(
        (repuesto)=> repuesto.nombre.toLowerCase() == nombreBuscado.toLowerCase()
        )
    if(nombreEncontrado == undefined){
        console.log(`El repuesto ${nombreBuscado} no está en nuestro catalogo`)
    }
    else{
        console.log(nombreEncontrado)
    }
}

// -- 5 - Filtrar repuestos por categoria

function buscarPorCategoria(arr){
    let categoriaBuscado = prompt("Ingrese la categoria que está buscando")
    let busqueda = arr.filter((repuesto)=> repuesto.categoria.toLowerCase() == categoriaBuscado.toLowerCase())
    if(busqueda.length == 0){
        console.log(`No hay coincidencias para la categoria ${autorBuscado}`)
    }else{
        verCatalogo(busqueda)
    }

}

// -- 6 - Catalogo en orden alfabetico

function ordenPorNombre(){
    catalogo.sort((a,b)=>{
    if (a.nombre > b.nombre) {
        return 1;
    }
    if (a.nombre < b.nombre) {
        return -1;
    }
    return 0;
    })   
    console.log(catalogo)
}



let salirMenu = false
do{
    let opcionIngresada = parseInt(prompt(`Ingrese la opción deseada
        1 - Ingresar nuevo repuesto
        2 - Ver catalogo
        3 - Eliminar repuesto
        4 - Buscar repuestos por nombre 
        5 - Filtrar repuestos por categoria
        6 - Catalogo en orden alfabetico
        0 - Salir del menu`))

    switch(opcionIngresada){
        case 1:
            
            agregarRepuesto()

        break
        case 2:

            verCatalogo(catalogo)

        break
        case 3:
            
            eliminarRepuesto(catalogo)

        break
        case 4:
            
            buscarPorNombre(catalogo)

        break
        case 5:            
            
            buscarPorCategoria(catalogo)

        break
        case 6:
            
            ordenPorNombre()

        break
        case 0:
            alert("Gracias por utilizar nuestra app")
            salirMenu = true
        break
        default:
            alert("Ingrese una opción correcta")
        break
    }
}while(!salirMenu)