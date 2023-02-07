// MAIN

class Repuesto {
    constructor(id, nombre, marca, precio, categoria, utilidad, imagen){
        
        this.id = id,
        this.nombre = nombre,
        this.marca = marca,
        this.precio = precio,
        this.categoria = categoria,
        this.utilidad = utilidad,
        this.imagen = imagen

    }
    
    mostrarInfoRepuesto(){
        console.log(`Producto es ${this.nombre}, la marca es ${this.marca} y su precio es $${this.precio}, pertenece a la categoria ${this.categoria} y se puede usar para ${this.utilidad}`)
    }
}

//Instanciación de objetos

const repuesto1 = new Repuesto (1, "Bomba de agua", "SKF", 7500, "Motor", "Peugeot y Citroen", "bombaagua1.jpg")
const repuesto2 = new Repuesto (2,"Bujia", "Bosch", 970, "Motor", "Peugeot y Citroen", "bujia1.jpg")
const repuesto3 = new Repuesto (3,"Bateria 75*12", "Willard", 26000, "Electricidad", "Todos", "bateria1.jpg")
const repuesto4 = new Repuesto (4,"Lámpara H7", "Philips", 1200, "Electricidad", "Todos", "lampara1.jpg")
const repuesto5 = new Repuesto (5,"Shampoo", "Meguiars", 5300, "Limpieza", "Todos", "shampoo1.jpg")
const repuesto6 = new Repuesto (6,"Aceite sintetico", "ACDelco", 7800, "Motor", "Chevrolet", "aceite1.jpg")


let catalogo = []

if(localStorage.getItem("catalogo")){
    catalogo = JSON.parse(localStorage.getItem("catalogo"))
}else{
    console.log("Seteando stock de repuestos")
    catalogo.push(repuesto1,repuesto2,repuesto3,repuesto4,repuesto5,repuesto6)
    localStorage.setItem("catalogo", JSON.stringify(catalogo))
}