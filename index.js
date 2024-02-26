const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
    }

    async #getId() {
        if (this.products.length === 0) return 1;
        return this.products.length + 1;
    }
    #findCode(code) {
        let find = this.products.find(elem => elem.code === code)
        if (find === undefined) return false;
        else return true;
    }
    async #salveProduct() {
        try {
            const json = JSON.stringify(this.products, null, '\t')
            await fs.promises.writeFile(this.path, json)
        } catch (error) {
            console.error(error)
        }
    }

    async getProducts() {
        try {
            const json = await fs.promises.readFile(this.path, 'utf-8')
            if (json === "") return 'la lista esta vacia!!';
            this.products = JSON.parse(json);
            return this.products
        } catch (error) {
            console.error(error)
        }
    }

    async addProduct(producto) {
        this.getProducts();

        if (this.#findCode(code)) return 'el codigo del producto ya se encuentra cargado!'
        let id = this.#getId();
        const product = { id: id, ...producto };
        this.products.push(product);

        this.#salveProduct();
        return 'se cargo el producto'
    }
    getProductById(id) {
        this.getProducts();

        let product;
        product = this.products.find(elem => parseInt(elem.id) === parseInt(id))
        if (product === undefined) return 'Not Found'
        return product
    }

    async updateProduct(id, campoActualizar, cambio) {
        await this.getProducts();
        let find = this.products.find(elem => elem.id === id)
        if (find === -1) return "no hay producto a actualizar"

        const producto = this.products[indice]
        Object.defineProperty(producto, campoActualizar, {
            value: cambio,
            writable: true,
            configurable: true,
            enumerable: true,
        })

        //producto[campoActualizar] = cambio
        this.products[indice] = producto;
        await this.#salveProduct() 
        return ("Producto actualizado:", producto)
    }
    
    async deleteProduct(){
        await this.getProducts();
        
        let find = this.products.find(elem => elem.id === id)
        if (find === -1) return "no hay producto a eliminar"
        const aux = this.products.map(elem => elem.id !== id)
        this.products = aux;
        return aux
        /* const index = this.products.indexOf(elem => elem.id === id)
        const aux = this.products.splice(id, 1) */
    }
}



let pm = new ProductManager();
console.log("Array de productos: ", pm.getProducts());
console.log(pm.addProduct("pc", "computadora escritorio", 125000, "-", "T125", 6));
console.log(pm.addProduct("Notebook", "Notebook hp ommen 15 ", 1250000, "-", "N109", 4));
console.log(pm.addProduct("Notebook", "Notebook hp ommen 15 ", 1250000, "-", "N109", 4));
console.log(pm.addProduct("tablet", "tablet lenovo N10", 85000, "-", "N10-1", 9));
console.log("Array de productos: ", pm.getProducts());
console.log("producto a encontrar: ", pm.getProductById(10))
console.log("producto a encontrar: ", pm.getProductById(2))