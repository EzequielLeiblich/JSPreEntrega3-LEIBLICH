/* CLASS CONTRUCTORA */
class Repuesto {
    constructor(id, nombre, marca, precio, categoria, utilidad, imagen){
        
        this.id = id,
        this.nombre = nombre,
        this.marca = marca,
        this.precio = precio,
        this.categoria = categoria,
        this.utilidad = utilidad,
        this.imagen = imagen,
        this.cantidad = 1
    }
    sumarUnidad(){
        this.cantidad = this.cantidad + 1
        return this.cantidad 
    }
    restarUnidad(){
        this.cantidad = this.cantidad - 1
        return this.cantidad 
    }
}

let stock = []

const cargarStock = async ()=>{
    const response = await fetch("repuestos.json")
    const data = await response.json()
    console.log(data)
    for(let repuesto of data){
        let repuestoNuevo = new Repuesto(repuesto.id, repuesto.nombre, repuesto.marca, repuesto.precio, repuesto.categoria, repuesto.utilidad, repuesto.imagen)
        stock.push(repuestoNuevo)
    }
    localStorage.setItem("stock", JSON.stringify(stock))
}


if(localStorage.getItem("stock")){
    for(let repuesto of JSON.parse(localStorage.getItem("stock"))){
        let repuestoNuevo = new Repuesto(repuesto.id, repuesto.nombre, repuesto.marca, repuesto.precio, repuesto.categoria, repuesto.utilidad, repuesto.imagen)
        stock.push(repuestoNuevo)
    }
    console.log(stock)
}else{
    console.log("Seteando stock de repuestos")
    cargarStock()    
}
