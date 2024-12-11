
document.addEventListener("DOMContentLoaded", () => 
    {
    //const productosContainer = document.querySelector("#productos-container");
    const productosContainer = document.getElementById("productos-container");
  
    function fetchProductos() 
    {
      fetch("https://dummyjson.com/products?limit=20")
        .then((response) => response.json())
        .then((data) => {
          const productos = data.products;
  
          // Limpia el contenedor de productos
          productosContainer.innerHTML = "";
  
          // Genera las cards de productos
          productos.forEach((product) => 
            {
            const cardDiv = document.createElement("div");
            cardDiv.className = "col-md-4"; // es una clase de bootstrap
  
            cardDiv.innerHTML = `
              <div class="card mt-3">
                <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">${product.description}</p>
                  <p class="card-text fw-bold">Precio: $${product.price}</p>
                  <button class="btn btn-success mt-auto">Agregar</button>
                </div>
              </div>
            `;
  
            // Agregar evento al botón "Agregar"
            const botonAgregar = cardDiv.querySelector("button");
            botonAgregar.addEventListener("click", () => 
              {
              agregarAlCartito(product);
            });
  
            // Añadir la card al contenedor
            productosContainer.appendChild(cardDiv);
          });
        })
        .catch((error) => console.error("Error", error));
    }
  
    // Función para agregar al carrito usando localStorage
    function agregarAlCartito(product) 
    {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      //agregar otro producto o el primero
      cart.push(product);      
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.title} ha sido agregado al carrito!`);
    }
  
    // Carga inicial de productos
    fetchProductos();
  });
  
  /*
  JSON:  "id":1,"title":"Essence Mascara Lash Princess".
  texto: "id":1,"title":"Essence Mascara Lash Princess"
  
  */