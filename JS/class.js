// MAIN

class Repuesto {
    constructor(id, imagen, nombre, marca, precio, iva, precioVenta, categoria, utilidad){
        
        this.id = id,
        this.imagen = imagen,
        this.nombre = nombre,
        this.marca = marca,
        this.precio = precio,
        this.iva = precio * 0.21,
        this.precioVenta = precio + iva,
        this.categoria = categoria,
        this.utilidad = utilidad

    }
    
    mostrarInfoRepuesto(){
        console.log(`Producto número ${this.id} es ${this.nombre}, la marca es ${this.marca} y su precio es $${this.precio}, su iva es $${this.iva}, su precio de venta es $${this.precioVenta}, pertenece a la categoria ${this.categoria} y se puede usar para ${this.utilidad}`)
    }
}

//Instanciación de objetos

const repuesto1 = new Repuesto (1, "bombaagua1.jpg", "Bomba de agua", "SKF", 7500, 7500*0.21, 7500+(7500*0.21), "Motor", "Peugeot y Citroen")
const repuesto2 = new Repuesto (2, "bujia1.jpg","Bujia", "Bosch", 970, 970*0.21, 790+(970.021), "Motor", "Peugeot y Citroen")
const repuesto3 = new Repuesto (3, "bateria1.jpg","Bateria 75*12", "Willard", 26000, 26000*0.21, 26000+(26000*0.21), "Electricidad", "Todos")
const repuesto4 = new Repuesto (4, "lampara1.jpg","Lámpara H7", "Philips", 1200, 1200*0.21, 1200+(1200*0.21), "Electricidad", "Todos")
const repuesto5 = new Repuesto (5, "shampoo1.jpg","Shampoo", "Meguiars", 5300, 5300*0.21, 5300+(5300*0.21), "Limpieza", "Todos")
const repuesto6 = new Repuesto (6, "aceite1.jpg","Aceite sintetico", "ACDelco", 7800, 7800*0.21, 7800+(7800*0.21), "Motor", "Chevrolet")


let catalogo = []

if(localStorage.getItem("catalogo")){
    catalogo = JSON.parse(localStorage.getItem("catalogo"))
}else{
    console.log("Seteando stock de repuestos")
    catalogo.push(repuesto1,repuesto2,repuesto3,repuesto4,repuesto5,repuesto6)
    localStorage.setItem("catalogo", JSON.stringify(catalogo))
}