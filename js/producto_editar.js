console.log(location.search)
var id=location.search.substr(4)  
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        nombre:"",
        imagen:"",
        descripcion:"",
        precio:0,
        id_producto:"",
        url:'https://pablodelapuente.pythonanywhere.com/productos/'+id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.nombre = data.nombre;
                    this.imagen=data.imagen
                    this.descripcion=data.descripcion
                    this.precio=data.precio  
                    this.id_producto=data.id_producto               
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let producto = {
                nombre:this.nombre,
                precio: this.precio,
                descripcion: this.descripcion,
                imagen: this.imagen,
                id_producto:this.id_producto,
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Producto modificado")
                    window.location.href = "productos.html";    
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
